import { create } from "apisauce";
import cache from "../utility/cache";

const apiClient = create({
  baseURL: "https://9b0f-2402-3a80-85b-acb1-81b3-dd71-619-f2e1.ngrok.io/api",
});

// to implement cache, we will overwrite "get" method of apiClient and then export apiClient
const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig); // this will use get function stored above

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default apiClient;
