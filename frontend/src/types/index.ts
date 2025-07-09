export interface Poll {
  id: string;
  title: string;
  description: string;
  endTime?: number; // Unix timestamp in seconds
  options: PollOption[];
  votes: number[];
  creator: string;
  createdAt: number;
  status: 'active' | 'ended';
  rewards?: {
    tokenType: string;
    amount: number;
    count: number;
  };
  totalVotes?: number;
  uniqueVoters?: number;
  averageTimeSpent?: number;
  countries?: string[];
  category?: string;
  tags?: string[];
  isAnonymous?: boolean;
  requireAuthentication?: boolean;
  allowMultipleVotes?: boolean;
  deadline?: number;
  isMultipleChoice?: boolean;
  maxVotes?: number;
  isPrivate?: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage?: number;
}

export interface PollReward {
  id: string;
  amount: number;
  token: string;
  description?: string;
  reward_amount?: number;
  reward_count?: number;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
  bio?: string;
  createdAt: Date;
  principal: string;
  balance?: number;
  created_polls?: number[];
  participated_polls?: number[];
  username?: string;
  polls: string[]; // Array of poll IDs
  votes: string[]; // Array of vote IDs
}

export interface Comment {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  likes: number;
  dislikes: number;
  replies: Comment[];
  isEdited?: boolean;
  isDeleted?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon?: string;
  parentId?: string;
}

export interface Tag {
  id: string;
  name: string;
  categoryId: string;
  usageCount: number;
}

export interface Stats {
  totalPolls: number;
  totalVotes: number;
  totalUsers: number;
  activePolls: number;
  completedPolls: number;
  averageVotesPerPoll: number;
  mostPopularCategory: string;
  mostActiveUser: {
    id: string;
    name: string;
    polls: number;
  };
}

export interface PollStats {
  totalPolls: number;
  totalVotes: number;
  totalUsers: number;
  activePolls: number;
  completedPolls: number;
  averageVotesPerPoll: number;
  mostPopularCategory: string;
  mostActiveUser: {
    id: string;
    name: string;
    polls: number;
  };
  total_rewards_distributed?: number;
}

export interface CreatePollInput {
  title: string;
  description: string;
  options: string[];
  deadline: number;
  rewards?: PollReward;
}

export interface VoteInput {
  poll_id: number;
  option_index: number;
}

export interface PollFilter {
  status?: 'active' | 'ended';
  sort_by?: 'newest' | 'popular' | 'ending_soon';
  search?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface WalletState {
  isConnected: boolean;
  principal: string | null;
  balance: number;
}

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    error: string;
    success: string;
    warning: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      small: string;
      medium: string;
      large: string;
    };
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  borderRadius: string;
  transition: string;
} 