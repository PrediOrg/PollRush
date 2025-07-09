/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_II_URL: string;
  readonly VITE_PPS_TOKEN_CANISTER_ID: string;
  readonly VITE_POLLRUSH_CANISTER_ID: string;
  readonly DFX_NETWORK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 