interface Env {
  // Network configuration
  DFX_NETWORK: 'local' | 'ic';
  
  // Canister IDs
  POLLRUSH_CANISTER_ID: string;
  PPS_TOKEN_CANISTER_ID: string;
  
  // API configuration
  API_TIMEOUT: number;
  API_RETRY_COUNT: number;
  
  // Feature flags
  ENABLE_ANALYTICS: boolean;
  ENABLE_ERROR_REPORTING: boolean;
  
  // UI configuration
  DEFAULT_POLLS_PER_PAGE: number;
  MAX_POLL_OPTIONS: number;
  MIN_POLL_OPTIONS: number;
  MAX_POLL_TITLE_LENGTH: number;
  MAX_POLL_DESCRIPTION_LENGTH: number;
  MAX_POLL_OPTION_LENGTH: number;
}

const env: Env = {
  // Network configuration
  DFX_NETWORK: (import.meta.env.VITE_DFX_NETWORK as 'local' | 'ic') || 'local',
  
  // Canister IDs
  POLLRUSH_CANISTER_ID: import.meta.env.VITE_POLLRUSH_CANISTER_ID || 'rrkah-fqaaa-aaaaa-aaaaq-cai',
  PPS_TOKEN_CANISTER_ID: import.meta.env.VITE_PPS_TOKEN_CANISTER_ID || 'ryjl3-tyaaa-aaaaa-aaaba-cai',
  
  // API configuration
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
  API_RETRY_COUNT: parseInt(import.meta.env.VITE_API_RETRY_COUNT || '3', 10),
  
  // Feature flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_ERROR_REPORTING: import.meta.env.VITE_ENABLE_ERROR_REPORTING === 'true',
  
  // UI configuration
  DEFAULT_POLLS_PER_PAGE: parseInt(import.meta.env.VITE_DEFAULT_POLLS_PER_PAGE || '10', 10),
  MAX_POLL_OPTIONS: parseInt(import.meta.env.VITE_MAX_POLL_OPTIONS || '10', 10),
  MIN_POLL_OPTIONS: parseInt(import.meta.env.VITE_MIN_POLL_OPTIONS || '2', 10),
  MAX_POLL_TITLE_LENGTH: parseInt(import.meta.env.VITE_MAX_POLL_TITLE_LENGTH || '100', 10),
  MAX_POLL_DESCRIPTION_LENGTH: parseInt(import.meta.env.VITE_MAX_POLL_DESCRIPTION_LENGTH || '500', 10),
  MAX_POLL_OPTION_LENGTH: parseInt(import.meta.env.VITE_MAX_POLL_OPTION_LENGTH || '100', 10),
};

export default env; 