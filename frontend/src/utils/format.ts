export const formatTokenAmount = (amount: number, symbol: string): string => {
  return `${amount.toLocaleString()} ${symbol}`;
};

export const formatDate = (date: Date | number): string => {
  return new Date(date).toLocaleDateString();
};

export const formatDateTime = (date: Date | number): string => {
  return new Date(date).toLocaleString();
}; 