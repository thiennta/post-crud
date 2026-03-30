import axios from 'axios'

const axiosApi = axios.create({
  baseURL: 'https://rejaudwpxcvpynggbayl.supabase.co/rest/v1',
  headers: {
    'apikey': 'sb_publishable_1nIVXB0osuVdzF-Lk6HqIA_d2BM2Xqj',
    'Content-Type': 'application/json'
  }
});

export default axiosApi;