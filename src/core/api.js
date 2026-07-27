// Centralized API client for the frontend

const BASE_URL = '/api/v1';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Only set Content-Type to JSON if it's not a FormData object (for file uploads) 
  // and not URLSearchParams (for OAuth2 login)
  if (!(options.body instanceof FormData) && !(options.body instanceof URLSearchParams) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Attempt to extract detail error message
    let errorMsg = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMsg = errorData.detail || errorMsg;
    } catch (e) {
      errorMsg = response.statusText;
    }
    
    // Auto-logout on 401
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    throw new Error(errorMsg);
  }

  // Handle empty responses (like 204 No Content or endpoints returning empty string)
  const text = await response.text();
  if (!text) {
    return null;
  }
  
  try {
    return JSON.parse(text);
  } catch (e) {
    return text; // Return as text if not JSON
  }
}

export const api = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),
  post: (endpoint, body, options = {}) => {
    const isSpecial = body instanceof FormData || body instanceof URLSearchParams;
    return request(endpoint, { 
      method: 'POST', 
      body: isSpecial ? body : JSON.stringify(body),
      ...options
    });
  },
  patch: (endpoint, body, options = {}) => request(endpoint, { 
    method: 'PATCH', 
    body: JSON.stringify(body),
    ...options
  }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const clearAuthToken = () => {
  localStorage.removeItem('token');
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};
