export const APP_NAME = 'PollRush';
export const APP_DESCRIPTION = 'Decentralized Voting System on ICP';

export const ROUTES = {
  HOME: '/',
  CREATE_POLL: '/create',
  MY_POLLS: '/my-polls',
  MY_ATTENDANCE: '/my-attendance',
  POLL_DETAIL: '/poll/:id',
} as const;

export const POLL_STATUS = {
  ACTIVE: 'active',
  ENDED: 'ended',
} as const;

export const SORT_OPTIONS = {
  NEWEST: 'newest',
  POPULAR: 'popular',
  ENDING_SOON: 'ending_soon',
} as const;

export const TOKEN_SYMBOL = 'PPs';
export const TOKEN_DECIMALS = 8;

export const DATE_FORMAT = {
  FULL: 'YYYY-MM-DD HH:mm:ss',
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm:ss',
} as const;

export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet to continue',
  INVALID_POLL_ID: 'Invalid poll ID',
  POLL_NOT_FOUND: 'Poll not found',
  VOTE_FAILED: 'Failed to submit vote',
  CREATE_POLL_FAILED: 'Failed to create poll',
  FETCH_POLLS_FAILED: 'Failed to fetch polls',
  FETCH_USER_FAILED: 'Failed to fetch user data',
  INSUFFICIENT_BALANCE: 'Insufficient balance',
  NETWORK_ERROR: 'Network error occurred',
  UNKNOWN_ERROR: 'An unknown error occurred',
} as const;

export const SUCCESS_MESSAGES = {
  VOTE_SUBMITTED: 'Vote submitted successfully',
  POLL_CREATED: 'Poll created successfully',
  LINK_COPIED: 'Link copied to clipboard',
  WALLET_CONNECTED: 'Wallet connected successfully',
  WALLET_DISCONNECTED: 'Wallet disconnected successfully',
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  MIN_OPTIONS: 'At least 2 options are required',
  MAX_OPTIONS: 'Maximum 10 options allowed',
  MIN_TITLE_LENGTH: 'Title must be at least 3 characters',
  MAX_TITLE_LENGTH: 'Title must not exceed 100 characters',
  MIN_DESCRIPTION_LENGTH: 'Description must be at least 10 characters',
  MAX_DESCRIPTION_LENGTH: 'Description must not exceed 500 characters',
  MIN_OPTION_LENGTH: 'Option must be at least 2 characters',
  MAX_OPTION_LENGTH: 'Option must not exceed 100 characters',
  FUTURE_DEADLINE: 'Deadline must be in the future',
  VALID_AMOUNT: 'Please enter a valid amount',
  POSITIVE_AMOUNT: 'Amount must be positive',
} as const;

export const ANIMATION = {
  DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
    EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
    EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export const BREAKPOINTS = {
  XS: 0,
  SM: 600,
  MD: 960,
  LG: 1280,
  XL: 1920,
} as const;

export const Z_INDEX = {
  DRAWER: 1200,
  MODAL: 1300,
  SNACKBAR: 1400,
  TOOLTIP: 1500,
} as const; 