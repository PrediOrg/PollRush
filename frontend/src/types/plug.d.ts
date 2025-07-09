interface Plug {
  requestConnect: () => Promise<boolean>;
  getPrincipal: () => Promise<Principal>;
  getAccountId: () => Promise<string>;
  createAgent: () => Promise<HttpAgent>;
  disconnect: () => Promise<void>;
}

interface Window {
  ic?: {
    plug?: Plug;
  };
} 