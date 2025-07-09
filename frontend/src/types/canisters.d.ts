declare module '*/pollrush_backend.did' {
  export const idlFactory: any;
  export const pollRushIdlFactory: any;
}

declare module '*/pps_token.did' {
  export const idlFactory: any;
}

declare module '../canisters/poll_rush' {
  export const pollRushIdlFactory: any;
}

interface Token {
  symbol: string;
  address: string;
  balance: bigint;
} 