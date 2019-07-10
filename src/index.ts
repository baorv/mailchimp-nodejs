import axios, {AxiosInstance, Method} from "axios";

class Mailchimp {
  public static REGEX: RegExp = /.+-.+/;
  protected apiKey: string;
  protected baseUrl: string;
  protected client: AxiosInstance;

  public constructor(apiKey: string) {
    if (!Mailchimp.REGEX.test(apiKey)) {
      throw new Error("Missing or invalid API key");
    }
    this.apiKey = apiKey;
    this.baseUrl = `https://${apiKey.split("-")[1]}.api.mailchimp.com/3.0`;
    const authHeader = Buffer.from("randomstring:" + apiKey).toString("base64");
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Accept: "application/json",
        authorization: `Basic ${authHeader}`,
      },
      timeout: 30000
    });
  };

  public request = async (method: Method, path: string, params: any = {}, data: any = {}) => {
    return this.client.request({method, params, url: path, data});
  };
}

export default Mailchimp;
