import { IRegisterResponse } from "@/app/core/application/dto/auth";
import { HttpClient } from "../utils/httpClient";

export class RegisterService {
    private clientHttp: HttpClient;

    constructor() {
        this.clientHttp = new HttpClient();
    }

    async register(req: FormData): Promise<IRegisterResponse>{
        const formData = true;
        return await this.clientHttp.post<IRegisterResponse, FormData>(
            "users",
            req,
            formData
        )
    }
}
  