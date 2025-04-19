/**
 * API Testing Utility
 * This file provides functions to test API connectivity
 */

import { DIRECT_API_URL, getApiUrl } from './api';

/**
 * Test API connectivity and log results
 */
export const testApiConnectivity = async () => {
  console.log('======= API CONNECTIVITY TEST =======');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('API_URL:', process.env.REACT_APP_API_URL);
  console.log('DIRECT_API_URL:', process.env.REACT_APP_DIRECT_API_URL);
  
  const endpoints = [
    { name: 'Default products URL', url: getApiUrl('products') },
    { name: 'Direct products URL', url: `${process.env.REACT_APP_DIRECT_API_URL || 'https://agrofix-backend-ll61.onrender.com/api'}/products` },
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Testing ${endpoint.name}: ${endpoint.url}`);
      const response = await fetch(endpoint.url);
      const contentType = response.headers.get('content-type');
      
      console.log(`Status: ${response.status}`);
      console.log(`Content-Type: ${contentType}`);
      
      if (contentType?.includes('application/json')) {
        const data = await response.json();
        console.log('Response is valid JSON:', Array.isArray(data) ? `Array with ${data.length} items` : typeof data);
      } else if (contentType?.includes('text/html')) {
        console.error('ERROR: Received HTML instead of JSON');
        const text = await response.text();
        console.log('First 100 chars:', text.substring(0, 100) + '...');
      } else {
        const text = await response.text();
        console.log('Response:', text.substring(0, 100) + (text.length > 100 ? '...' : ''));
      }
    } catch (error) {
      console.error(`Error testing ${endpoint.name}:`, error.message);
    }
    
    console.log('-----------------------------------');
  }
  
  console.log('====== END API CONNECTIVITY TEST ======');
};

export default testApiConnectivity; 