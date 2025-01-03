import axios from "axios";
import qs from "qs";

const instance = axios.create({
    timeout: 60000,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    }
});

instance.interceptors.response.use(
    response => {
        const { status } = response;
        if (status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => Promise.reject(error)
);

export const post = (url: string, params: object): Promise<response> => {
    return new Promise((resolve, reject) => {
        instance
            .post(url, qs.stringify(params))
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};
