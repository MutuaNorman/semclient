import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

axios.defaults.baseURL = 'https://api.sempolisher.com' || 'http://localhost:8000/';

// Request interceptor to attach the JWT token to each request
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and other actions
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const response = await axios.post('auth/jwt/refresh/', {
          refresh: localStorage.getItem('refresh'),
        });

        // Update the local storage with the new access token
        localStorage.setItem('access', response.data.access);

        // Retry the original request with the new token
        return axios(originalRequest);
      } catch (refreshError) {
        // Check if the error is due to a failed token refresh
        if (refreshError.response && refreshError.response.status === 401) {
          console.error('Token refresh failed:', refreshError);
          // Clear the stored tokens and redirect to login
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          // Redirect to the login page
          router.push({ name: 'login' });
        } else {
          // Handle other errors if needed
          console.error('Other error during token refresh:', refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

