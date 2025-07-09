import React from 'react';
import { Box, Pagination } from '@mui/material';
import { useWallet } from '../contexts/WalletContext';

interface PollPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PollPagination: React.FC<PollPaginationProps> = ({
  page,
  totalPages,
  onPageChange
}) => {
  const { principal } = useWallet();

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    if (principal) {
      onPageChange(value);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        disabled={!principal}
      />
    </Box>
  );
};

export default PollPagination; 