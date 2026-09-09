import axios from 'axios';
//axios é importante para a conexão com o back-end

//estabelece a URL em que a api pegará os dados
const api = axios.create({
  baseURL: 'http://10.0.2.2:3000'
});

export default api;