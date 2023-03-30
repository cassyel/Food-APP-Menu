import axios from 'axios';

axios.defaults.validateStatus = () => true;


export const api = axios.create({
  baseURL: `${process.env.API_BASE}`
});
