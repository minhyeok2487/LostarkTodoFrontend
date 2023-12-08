// const API_BASE_URL = "https://api.loatodo.com";
const API_BASE_URL = "http://localhost:8080";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    // 로컬 스토리지에서 ACCESS TOKEN 가져오기
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };

    if (request) {
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 403) {
            window.location.href = "/login";
            throw response.json();
        } else {
            throw response.json();
        }
    }).catch((error) => {
        return error.then((errorMessage) => {
            throw errorMessage;
        });
    });
}

export function logout() {
    call("/auth/logout", "GET", null).then((response) => { });
    localStorage.setItem("ACCESS_TOKEN", null);
    window.location.href = "/login";
}

export function signup(userDTO) {
    return call("/member/signup", "POST", userDTO);
}

export function socialLogin(provider) {
    const frontendUrl = window.location.protocol + "//" + window.location.host;
    window.location.href = API_BASE_URL + "/auth/authorize/" + provider + "?redirect_url=" + frontendUrl;
}