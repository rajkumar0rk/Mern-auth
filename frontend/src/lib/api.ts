import API from "@/config/apiClient";

const apiCall = async <T>(fn: () => Promise<{ data: T }>) => {
  const res = await fn();
  return res.data;
};

export const register = <T, D>(data: T) =>
  apiCall<D>(() => API.post("/auth/register", data));

export const login = <T, D>(data: T) =>
  apiCall<D>(() => API.post("/auth/login", data));

export const logout = <D>() => apiCall<D>(() => API.get("/auth/logout"));

export const verifyEmail = <D>(verificationCode: string) =>
  apiCall<D>(() => API.get(`/auth/email/verify/${verificationCode}`));

export const sendPasswordResetEmail = <D>(email: string) =>
  apiCall<D>(() => API.post("/auth/password/forgot", { email }));

export const resetPassword = <D>({
  verificationCode,
  password,
}: {
  verificationCode: string;
  password: string;
}) =>
  apiCall<D>(() =>
    API.post("/auth/password/reset", { verificationCode, password }),
  );

export const getUser = <D>() => apiCall<D>(() => API.get("/user"));

export const getSessions = <D>() => apiCall<D>(() => API.get("/sessions"));

export const deleteSession = <D>(id: string) =>
  apiCall<D>(() => API.delete(`/sessions/${id}`));
