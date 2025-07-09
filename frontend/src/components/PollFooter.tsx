import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  ThumbUpOutlined as ThumbUpOutlinedIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
} from '@mui/icons-material';

interface PollFooterProps {
  poll: {
    id: string;
    title: string;
    totalVotes: number;
    isBookmarked: boolean;
    hasVoted: boolean;
    terms?: string;
    privacyPolicy?: string;
    attribution?: Array<{
      text: string;
      url?: string;
    }>;
    updatedAt?: number;
  };
  onShare?: () => void;
  onBookmark?: () => void;
  onVote?: () => void;
}

const PollFooter: React.FC<PollFooterProps> = ({
  poll,
  onShare,
  onBookmark,
  onVote,
}) => {
  const [showTerms, setShowTerms] = React.useState(false);
  const [showPrivacy, setShowPrivacy] = React.useState(false);
  const [showAttribution, setShowAttribution] = React.useState(false);

  return (
    <Box sx={{ mt: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          variant={poll.hasVoted ? "contained" : "outlined"}
          startIcon={poll.hasVoted ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          onClick={onVote}
        >
          {poll.hasVoted ? 'Voted' : 'Vote'}
        </Button>

        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          onClick={onShare}
        >
          Share
        </Button>

        <Button
          variant="outlined"
          startIcon={poll.isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          onClick={onBookmark}
        >
          {poll.isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </Button>
      </Stack>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {poll.totalVotes} votes
        </Typography>

        {poll.terms && (
          <Button
            size="small"
            onClick={() => setShowTerms(true)}
            sx={{ ml: 1 }}
          >
            Terms
          </Button>
        )}

        {poll.privacyPolicy && (
          <Button
            size="small"
            onClick={() => setShowPrivacy(true)}
            sx={{ ml: 1 }}
          >
            Privacy Policy
          </Button>
        )}

        {poll.attribution && poll.attribution.length > 0 && (
          <Button
            size="small"
            onClick={() => setShowAttribution(true)}
            sx={{ ml: 1 }}
          >
            Attribution
          </Button>
        )}

        {poll.updatedAt && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            Last updated: {new Date(poll.updatedAt * 1000).toLocaleString()}
          </Typography>
        )}
      </Box>

      <Dialog open={showTerms} onClose={() => setShowTerms(false)}>
        <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogContent>
          <Typography>{poll.terms}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTerms(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showPrivacy} onClose={() => setShowPrivacy(false)}>
        <DialogTitle>Privacy Policy</DialogTitle>
        <DialogContent>
          <Typography>{poll.privacyPolicy}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPrivacy(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showAttribution} onClose={() => setShowAttribution(false)}>
        <DialogTitle>Attribution</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            {poll.attribution?.map((item, index) => (
              <Typography key={index}>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.text}
                  </a>
                ) : (
                  item.text
                )}
              </Typography>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAttribution(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PollFooter; 