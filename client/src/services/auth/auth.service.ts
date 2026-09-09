import { api } from "@/lib/api";
import { loginDTO, signupDTO } from "./validation";

export class AuthService {
  static async login(data: loginDTO) {
    const request = await api.post("/auth/signin", data);
    if (request.status !== 200) {
      console.log(request?.data);
    }

    return request.data;
  }

  static async me() {
    const request = await api.get("/auth/me");
    if (request.status !== 200) {
      console.log(request?.data?.error);
    }

    return request.data;
  }

  static async signup(data: signupDTO) {
    const request = await api.post("/auth/signup  ", data);
    if (request.status !== 200) {
      console.log(request?.data);
    }

    return request.data;
  }
}
