/**
 * Format a timestamp to a localized date string
 */
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};

/**
 * Calculate the percentage of votes for an option
 */
export const calculateVotePercentage = (votes: number, total: number): number => {
  if (total === 0) return 0;
  return (votes / total) * 100;
};

/**
 * Format a number to a percentage string with 1 decimal place
 */
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

/**
 * Check if a poll has ended
 */
export const isPollEnded = (deadline: number): boolean => {
  return Date.now() > deadline;
};

/**
 * Get time remaining until poll deadline
 */
export const getTimeRemaining = (deadline: number): string => {
  const now = Date.now();
  const diff = deadline - now;

  if (diff <= 0) return 'Ended';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}d ${hours}h remaining`;
  if (hours > 0) return `${hours}h ${minutes}m remaining`;
  return `${minutes}m remaining`;
};

/**
 * Truncate a string to a specified length
 */
export const truncateString = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
};

/**
 * Generate a shareable poll URL
 */
export const getPollShareUrl = (pollId: number): string => {
  return `${window.location.origin}/poll/${pollId}`;
};

/**
 * Format token amount with symbol
 */
export const formatTokenAmount = (amount: number | null, symbol: string): string => {
  if (amount === null) return '0 ' + symbol;
  return `${amount.toLocaleString()} ${symbol}`;
};

/**
 * Check if a user has voted in a poll
 */
export const hasUserVoted = (
  voters: { [key: string]: number },
  principal: string | null
): boolean => {
  if (!principal) return false;
  return principal in voters;
};

/**
 * Get user's voted option index
 */
export const getUserVotedOption = (
  voters: { [key: string]: number },
  principal: string | null
): number | null => {
  if (!principal) return null;
  return voters[principal] ?? null;
};

export const formatTimeRemaining = (seconds: number): string => {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const remainingSeconds = seconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
};

export function formatNumber(value: number): string {
  return value.toLocaleString();
}

export function formatPrincipal(principal: string): string {
  if (!principal) return '';
  return `${principal.slice(0, 5)}...${principal.slice(-5)}`;
} 