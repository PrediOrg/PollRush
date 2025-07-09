/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DFX_NETWORK: 'local' | 'ic';
  readonly VITE_POLLRUSH_CANISTER_ID: string;
  readonly VITE_PPS_TOKEN_CANISTER_ID: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_API_RETRY_COUNT: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_ERROR_REPORTING: string;
  readonly VITE_DEFAULT_POLLS_PER_PAGE: string;
  readonly VITE_MAX_POLL_OPTIONS: string;
  readonly VITE_MIN_POLL_OPTIONS: string;
  readonly VITE_MAX_POLL_TITLE_LENGTH: string;
  readonly VITE_MAX_POLL_DESCRIPTION_LENGTH: string;
  readonly VITE_MAX_POLL_OPTION_LENGTH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 