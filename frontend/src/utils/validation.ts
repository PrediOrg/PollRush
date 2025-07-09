import { Poll } from '../types';
import { env } from '../config';

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
  INVALID_DEADLINE: 'Deadline must be in the future',
  INVALID_REWARD: 'Invalid reward configuration',
  POSITIVE_AMOUNT: 'Amount must be positive',
} as const;

export const validatePoll = (poll: Poll): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validate title
  if (!poll.title || poll.title.trim().length === 0) {
    errors.push('Title is required');
  } else if (poll.title.length > env.MAX_POLL_TITLE_LENGTH) {
    errors.push(`Title must be less than ${env.MAX_POLL_TITLE_LENGTH} characters`);
  }

  // Validate description
  if (poll.description && poll.description.length > env.MAX_POLL_DESCRIPTION_LENGTH) {
    errors.push(`Description must be less than ${env.MAX_POLL_DESCRIPTION_LENGTH} characters`);
  }

  // Validate options
  if (!poll.options || poll.options.length < 2) {
    errors.push('At least 2 options are required');
  } else {
    for (const option of poll.options) {
      if (!option.text || option.text.trim().length === 0) {
        errors.push('All options must have text');
      } else if (option.text.length < 2) {
        errors.push('Option text must be at least 2 characters long');
      } else if (option.text.length > env.MAX_POLL_OPTION_LENGTH) {
        errors.push(`Option text must be less than ${env.MAX_POLL_OPTION_LENGTH} characters`);
      }
    }
  }

  // Validate deadline
  if (poll.deadline && poll.deadline <= Date.now()) {
    errors.push('Deadline must be in the future');
  }

  // Validate creator
  if (!poll.creator) {
    errors.push('Creator is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateVote = (poll: Poll, optionId: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Check if poll is still active
  if (poll.deadline && poll.deadline <= Date.now()) {
    errors.push('Poll has ended');
  }

  // Check if user has already voted
  if (poll.creator && poll.votes.includes(Number(poll.creator))) {
    errors.push('You have already voted in this poll');
  }

  // Check if option exists
  if (!poll.options.some(option => option.id === optionId)) {
    errors.push('Invalid option selected');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}; 