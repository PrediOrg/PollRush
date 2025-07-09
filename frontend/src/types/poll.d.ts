export interface PollReward {
  amount: number;
  count: number;
  token_type: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: number;
  title: string;
  description: string;
  options: PollOption[];
  creator: string;
  creatorName?: string;
  creatorAvatar?: string;
  deadline: number;
  rewards: PollReward[];
  voters: Record<string, boolean>;
  created_at: number;
  updated_at: number;
  totalVotes: number;
  votes: number[];
  createdAt?: Date;
  category?: string;
  tags?: string[];
  isAnonymous?: boolean;
  requireAuthentication?: boolean;
  allowMultipleVotes?: boolean;
}

export interface PollVote {
  pollId: number;
  optionId: number;
  voter: string;
  timestamp: number;
}

export interface User {
  principal: string;
  balance: number;
  created_polls: number[];
  participated_polls: number[];
}

export interface ApiResponse<T> {
  success: boolean;
  error?: string;
  data: T;
} 