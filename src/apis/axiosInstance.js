import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://localhost:8080",
    baseURL: "https://api.loatodo.com",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if (accessToken && accessToken !== null) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 403) {
            alert("로그인 후 이용해주세요!");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
