import { post } from "../service/http";

export default (params: object): Promise<response> => post("/api", params);