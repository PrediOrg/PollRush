import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../declarations/pollrush/pollrush.did';
import { idlFactory as tokenIdlFactory } from '../declarations/pps_token/pps_token.did';
import { Poll, User, PollStats, ApiResponse } from '../types';
import env from '../config/env';

const agent = new HttpAgent({
  host: env.DFX_NETWORK === 'ic' ? 'https://ic0.app' : 'http://localhost:8000',
});

const pollrushCanister = Actor.createActor(idlFactory, {
  agent,
  canisterId: env.POLLRUSH_CANISTER_ID,
});

const tokenCanister = Actor.createActor(tokenIdlFactory, {
  agent,
  canisterId: env.PPS_TOKEN_CANISTER_ID,
});

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    const error = await response.json();
    return {
      success: false,
      error: error.message || 'An error occurred',
    };
  }

  const data = await response.json();
  return {
    success: true,
    data,
  };
};

export const getPolls = async (): Promise<ApiResponse<Poll[]>> => {
  try {
    const response = await pollrushCanister.getPolls();
    return { success: true, data: response as Poll[] };
  } catch (error) {
    console.error('Failed to fetch polls:', error);
    return { success: false, error: 'Failed to fetch polls' };
  }
};

export const getPoll = async (id: number): Promise<ApiResponse<Poll>> => {
  const response = await fetch(`${API_BASE_URL}/polls/${id}`);
  return handleResponse<Poll>(response);
};

export const createPoll = async (poll: Partial<Poll>): Promise<ApiResponse<Poll>> => {
  const response = await fetch(`${API_BASE_URL}/polls`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(poll),
  });
  return handleResponse<Poll>(response);
};

export const updatePoll = async (id: number, updates: Partial<Poll>): Promise<ApiResponse<Poll>> => {
  const response = await fetch(`${API_BASE_URL}/polls/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  return handleResponse<Poll>(response);
};

export const deletePoll = async (id: number): Promise<ApiResponse<void>> => {
  const response = await fetch(`${API_BASE_URL}/polls/${id}`, {
    method: 'DELETE',
  });
  return handleResponse<void>(response);
};

export const getUser = async (principal: string): Promise<ApiResponse<User>> => {
  const response = await fetch(`${API_BASE_URL}/users/${principal}`);
  return handleResponse<User>(response);
};

export const updateUser = async (principal: string, updates: Partial<User>): Promise<ApiResponse<User>> => {
  const response = await fetch(`${API_BASE_URL}/users/${principal}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  return handleResponse<User>(response);
};

export const getUserPolls = async (principal: string): Promise<ApiResponse<Poll[]>> => {
  try {
    const response = await pollrushCanister.getUserPolls(principal);
    return { success: true, data: response as Poll[] };
  } catch (error) {
    console.error('Failed to fetch user polls:', error);
    return { success: false, error: 'Failed to fetch user polls' };
  }
};

export const getParticipatedPolls = async (principal: string): Promise<ApiResponse<Poll[]>> => {
  try {
    const response = await pollrushCanister.getParticipatedPolls(principal);
    return { success: true, data: response as Poll[] };
  } catch (error) {
    console.error('Failed to fetch participated polls:', error);
    return { success: false, error: 'Failed to fetch participated polls' };
  }
};

export const getPollStats = async (id: number): Promise<ApiResponse<PollStats>> => {
  try {
    const response = await pollrushCanister.getPollStats(id);
    return { success: true, data: response as PollStats };
  } catch (error) {
    console.error('Failed to fetch poll stats:', error);
    return { success: false, error: 'Failed to fetch poll stats' };
  }
};

export const vote = async (pollId: number, optionIds: number[]): Promise<ApiResponse<void>> => {
  const response = await fetch(`${API_BASE_URL}/polls/${pollId}/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ optionIds }),
  });
  return handleResponse<void>(response);
};

export const getStats = async (): Promise<ApiResponse<{
  totalPolls: number;
  totalVotes: number;
  totalUsers: number;
}>> => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  return handleResponse<{
    totalPolls: number;
    totalVotes: number;
    totalUsers: number;
  }>(response);
};

// Token related API calls
export const getBalance = async (principal: string): Promise<ApiResponse<number>> => {
  try {
    const response = await tokenCanister.balance_of(principal);
    return { success: true, data: Number(response) };
  } catch (error) {
    console.error('Failed to fetch balance:', error);
    return { success: false, error: 'Failed to fetch balance' };
  }
};

export const transfer = async (
  to: string,
  amount: number
): Promise<ApiResponse<void>> => {
  try {
    await tokenCanister.transfer(to, amount);
    return { success: true };
  } catch (error) {
    console.error('Failed to transfer tokens:', error);
    return { success: false, error: 'Failed to transfer tokens' };
  }
}; 