/**
 * API utility for making fetch calls with the correct base URL
 */

// Determine the API base URLs from environment variables
const API_URL = process.env.REACT_APP_API_URL || '/api';
const DIRECT_API_URL = process.env.REACT_APP_DIRECT_API_URL || 'https://agrofix-backend-ll61.onrender.com/api';

/**
 * Get the appropriate API URL based on path and options
 * @param {string} path - API endpoint path
 * @param {Object} options - Request options
 * @returns {string} - Complete API URL
 */
export const getApiUrl = (path, options = {}) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Use direct API URL if specified in options or if using credentials
  if (options.useDirect || options.credentials === 'include') {
    return `${DIRECT_API_URL}/${cleanPath}`;
  }
  
  return `${API_URL}/${cleanPath}`;
};

/**
 * Make an API request with standardized options
 * @param {string} path - API endpoint path
 * @param {Object} options - Fetch options
 * @returns {Promise} - Fetch promise
 */
export const apiRequest = async (path, options = {}) => {
  const url = getApiUrl(path, options);
  
  // Set default headers if not provided
  if (!options.headers) {
    options.headers = {
      'Content-Type': 'application/json',
    };
  }
  
  try {
    console.log(`Making API request to: ${url}`);
    const response = await fetch(url, options);
    
    // Handle non-OK responses
    if (!response.ok) {
      let errorData;
      
      try {
        errorData = await response.json();
      } catch (e) {
        // If response is not JSON, use text
        errorData = { message: await response.text() };
      }
      
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
    
    // Check if response is empty
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
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
  
  post: (path, data, options = {}) => apiRequest(path, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
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