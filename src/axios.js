import axios from 'axios';

const instance = axios.create();
instance.defaults.baseURL = 'https://api.themoviedb.org/3';

export default instance;
