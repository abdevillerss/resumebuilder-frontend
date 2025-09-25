// import axios from 'axios';

// const api = axios.create({
//     // By not setting a baseURL, we ensure the 'proxy' in package.json is used
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // This is the most important part. It acts as a "gatekeeper" for every request.
// api.interceptors.request.use(
//     (config) => {
//         // It gets the user's info from localStorage.
//         const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        
//         // If the user info and token exist, it adds the token to the request header.
//         if (userInfo && userInfo.token) {
//             config.headers['Authorization'] = `Bearer ${userInfo.token}`;
//         }
        
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export default api;
import axios from 'axios';

const api = axios.create({
    // Set the base URL from your environment variable
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// This interceptor part is perfect, no changes needed here.
api.interceptors.request.use(
    (config) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (userInfo && userInfo.token) {
            config.headers['Authorization'] = `Bearer ${userInfo.token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;