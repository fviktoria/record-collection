type RequestOptions = RequestInit & { params?: Record<string, any> };

const createDiscogsClient = () => {
  const baseURL: string = "https://api.discogs.com";
  const token: string | undefined = process.env.DISCOGS_TOKEN;
  const userAgent: string | undefined = process.env.DISCOGS_USER_AGENT;

  const fetchWithHeaders = async <T>(
    url: string,
    options: RequestOptions
  ): Promise<T> => {
    if (token) {
      options.headers = {
        ...(options.headers as HeadersInit),
        Authorization: `Discogs token=${token}`,
      };
    }
    if (userAgent) {
      options.headers = {
        ...(options.headers as HeadersInit),
        "User-Agent": userAgent,
      };
    }
    const response = await fetch(url, options);
    return response.json() as Promise<T>;
  };

  const request = async <T>(
    method: string,
    url: string,
    data: any,
    options: RequestOptions = {}
  ): Promise<T> => {
    const fetchOptions: RequestInit = { method, ...options };

    if (data) {
      fetchOptions.body = JSON.stringify(data);
      fetchOptions.headers = {
        ...(fetchOptions.headers as HeadersInit),
        "Content-Type": "application/json",
      };
    }

    // Handle params
    const { params, ...otherOptions } = options;
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      url += `?${queryString}`;
    }

    return fetchWithHeaders<T>(`${baseURL}${url}`, fetchOptions);
  };

  const get = <T>(url: string, options?: RequestOptions): Promise<T> =>
    request<T>("GET", url, null, options);
  const post = <T>(
    url: string,
    data: any,
    options?: RequestOptions
  ): Promise<T> => request<T>("POST", url, data, options);
  const put = <T>(
    url: string,
    data: any,
    options?: RequestOptions
  ): Promise<T> => request<T>("PUT", url, data, options);
  const del = <T>(url: string, options?: RequestOptions): Promise<T> =>
    request<T>("DELETE", url, null, options);

  return {
    get,
    post,
    put,
    delete: del,
  };
};

export const discogsClient = createDiscogsClient();
