import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },

  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },

  verifyToken: async (token: string) => {
    const response = await api.get('/auth/verify', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export const filesAPI = {
  uploadFile: async (file: File) => {
    // First, get upload URL from our API
    const response = await api.post('/files/upload', {
      filename: file.name,
      contentType: file.type,
      fileSize: file.size
    });
    
    const { uploadUrl, fileId } = response.data;
    
    // Upload file directly to S3
    await axios.put(uploadUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
    
    return { fileId, filename: file.name };
  },

  getFiles: async () => {
    const response = await api.get('/files/list');
    return response.data.files;
  },

  downloadFile: async (fileId: number) => {
    const response = await api.get(`/files/download?fileId=${fileId}`);
    return response.data;
  },

  deleteFile: async (fileId: number) => {
    const response = await api.delete(`/files/delete?fileId=${fileId}`);
    return response.data;
  }
};

export default api;

