/**
 * API utility for making fetch calls with the correct base URL
 */

// Determine the API base URLs from environment variables
const API_URL = process.env.REACT_APP_API_URL || '/api';
export const DIRECT_API_URL = process.env.REACT_APP_DIRECT_API_URL || 'https://agrofix-backend-ll61.onrender.com/api';

// CORS proxy for production when direct API access fails due to CORS
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

// In production, always use the direct API URL to avoid routing issues
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Get the appropriate API URL based on path and options
 * @param {string} path - API endpoint path
 * @param {Object} options - Request options
 * @returns {string} - Complete API URL
 */
export const getApiUrl = (path, options = {}) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // In production, always use the direct API URL
  // Also use direct API URL if specified in options or if using credentials
  // For DELETE requests, always use direct URL to avoid routing issues
  if (isProduction || options.useDirect || options.credentials === 'include' || options.method === 'DELETE') {
    console.log(`Using direct API URL: ${DIRECT_API_URL}/${cleanPath}`);
    return `${DIRECT_API_URL}/${cleanPath}`;
  }
  
  console.log(`Using proxy API URL: ${API_URL}/${cleanPath}`);
  return `${API_URL}/${cleanPath}`;
};

/**
 * Check if an object is FormData
 * @param {any} obj - The object to check
 * @returns {boolean} - Whether the object is FormData
 */
const isFormData = (obj) => {
  return obj && typeof obj === 'object' && obj.constructor && obj.constructor.name === 'FormData';
};

/**
 * Make an API request with standardized options
 * @param {string} path - API endpoint path
 * @param {Object} options - Fetch options
 * @returns {Promise} - Fetch promise
 */
export const apiRequest = async (path, options = {}) => {
  let url = getApiUrl(path, options);
  
  // Set default headers if not provided
  if (!options.headers) {
    options.headers = {
      'Content-Type': 'application/json',
    };
  }
  
  // Handle FormData correctly by not setting Content-Type header
  // (browser will set it automatically with boundary)
  if (isFormData(options.body)) {
    delete options.headers['Content-Type'];
  }
  
  try {
    console.log(`Making API request to: ${url} with method: ${options.method || 'GET'}`);
    let response;
    let corsError = false;
    
    try {
      // First try the direct request
      response = await fetch(url, options);
    } catch (error) {
      // If there's a CORS error in production, try using a CORS proxy
      if (isProduction && error.message && (
        error.message.includes('CORS') || 
        error.message.includes('Failed to fetch')
      )) {
        corsError = true;
        console.warn('CORS error detected, retrying with CORS proxy...');
        
        // Use a CORS proxy for the API URL
        const proxyUrl = `${CORS_PROXY}${url}`;
        console.log(`Trying with CORS proxy: ${proxyUrl}`);
        
        // Add required headers for CORS proxy
        const proxyOptions = {
          ...options,
          headers: {
            ...options.headers,
            'X-Requested-With': 'XMLHttpRequest'
          }
        };
        
        response = await fetch(proxyUrl, proxyOptions);
      } else {
        // If it's not a CORS error or not in production, rethrow
        throw error;
      }
    }
    
    // Check if the response is HTML (which suggests a routing issue)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html') && !corsError) {
      console.error('Received HTML response instead of JSON. This indicates a routing issue.');
      
      // For DELETE requests or if we're already using the direct URL, return success if status is 2xx
      if ((options.method === 'DELETE' || options.useDirect) && response.status >= 200 && response.status < 300) {
        console.log('Delete request appears successful despite HTML response. Assuming success.');
        return { success: true, status: response.status };
      }
      
      // Try again with the direct API URL if we weren't already using it
      if (!isProduction && !options.useDirect) {
        console.log('Retrying with direct API URL...');
        return apiRequest(path, { ...options, useDirect: true });
      }
      
      throw new Error('API returned HTML instead of JSON. Please check API configuration.');
    }
    
    // Handle non-OK responses
    if (!response.ok) {
      let errorData;
      
      try {
        errorData = await response.json();
      } catch (e) {
        // If response is not JSON, use text
        try {
          errorData = { message: await response.text() };
        } catch (textError) {
          // If we can't even get text, use status
          errorData = { message: `Server returned status ${response.status}` };
        }
      }
      
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
    
    // For DELETE requests with no content, return success object
    if (options.method === 'DELETE' && response.status === 204) {
      return { success: true };
    }
    
    // Check if response is empty or text/plain
    if (!contentType) {
      return { success: true, status: response.status };
    } else if (contentType.includes('application/json')) {
      try {
        const data = await response.json();
        
        // For endpoints that should return collections (like /products), ensure we have an array
        if (path === 'products' && !Array.isArray(data)) {
          console.warn('Products endpoint did not return an array:', data);
          // If data has a products property that is an array, return that
          if (data && Array.isArray(data.products)) {
            return data.products;
          }
          // Otherwise return empty array to avoid errors
          return [];
        }
        
        return data;
      } catch (e) {
        console.error('Error parsing JSON response:', e);
        return { success: true, status: response.status };
      }
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('API request failed:', error);
    
    // For specific endpoints, return safe fallbacks on error
    if (path === 'products') {
      console.warn('Returning empty products array due to API error');
      return [];
    }
    
    throw error;
  }
};

/**
 * Convenience methods for common HTTP methods
 */
export const api = {
  get: (path, options = {}) => apiRequest(path, { ...options, method: 'GET' }),
  
  post: (path, data, options = {}) => {
    // Handle FormData correctly
    if (isFormData(data)) {
      return apiRequest(path, {
        ...options,
        method: 'POST',
        body: data
      });
    }
    
    return apiRequest(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  put: (path, data, options = {}) => apiRequest(path, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  patch: (path, data, options = {}) => apiRequest(path, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  
  delete: (path, options = {}) => apiRequest(path, {
    ...options,
    method: 'DELETE',
  }),
};

export default api; 