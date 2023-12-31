import { call } from "./api";

/*로그아웃*/
export const logout = async () => {
    try {
        const response = await call("/v3/auth/logout", "GET", null);
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("username");
        window.location.href = "/";
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
