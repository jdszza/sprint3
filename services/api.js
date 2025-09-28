import axios from "axios";
import { Platform } from "react-native";

// Backend: Spring Boot -> porta 8081
const BASE_WEB = "http://localhost:8081";
const BASE_ANDROID = "http://10.0.2.2:8081";
const BASE_IOS = "http://localhost:8081";

const baseURL = Platform.select({
  web: BASE_WEB,
  android: BASE_ANDROID,
  ios: BASE_IOS,
  default: BASE_WEB
});

// API principal do Spring Boot
export const api = axios.create({
  baseURL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json"
  }
});

// Interceptors para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Erro na API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    // O token será adicionado pelo Context quando necessário
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;