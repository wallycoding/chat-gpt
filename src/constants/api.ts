const pathnames = {
  get chats() {
    return api.createApiPath("chats");
  },
  get clear() {
    return api.createApiPath("clear");
  },
  get messages() {
    return api.createApiPath("chat", "messages");
  },
  get createMessage() {
    return api.createApiPath("chat", "message", "create");
  },
};

const api = {
  baseURL: process.env.LOCAL_URL,
  createApiPath(...pathnames: string[]) {
    return `${this.baseURL}/api/${pathnames.join("/")}`;
  },
  pathnames,
};

export default api;
