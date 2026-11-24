import axios from 'axios';

// 10.0.2.2 é o localhost da máquina visto pelo emulador Android.
// No simulador iOS use http://127.0.0.1:3002/api.
const api = axios.create({
  baseURL: 'http://10.0.2.2:3002/api',
  timeout: 12000,
});

export default api;
