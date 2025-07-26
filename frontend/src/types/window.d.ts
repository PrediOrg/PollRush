// 扩展 Window 接口以支持 Plug 钱包
declare global {
  interface Window {
    ic?: {
      plug?: {
        requestConnect: () => Promise<boolean>;
        getPrincipal: () => Promise<any>;
        getAccountId: () => Promise<string>;
        createAgent: () => Promise<any>;
        disconnect: () => void;
        isConnected: () => Promise<boolean>;
      };
    };
  }
}

export {};