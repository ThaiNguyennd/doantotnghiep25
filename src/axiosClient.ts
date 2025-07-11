import axios from 'axios';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const axiosClient = axios.create({
  baseURL: 'http://localhost:3001', // 👈 sửa thành API của bạn
  withCredentials: true,            // nếu refresh token lưu bằng cookie
});

axiosClient.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  err => Promise.reject(err)
);

axiosClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              resolve(axiosClient(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.post(
          'http://localhost:3001/auth/refresh',
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem('access_token', newAccessToken);
        processQueue(null, newAccessToken);
        isRefreshing = false;

        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        return axiosClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        window.location.href = '/login'; // hoặc navigation.navigate nếu React Native
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
