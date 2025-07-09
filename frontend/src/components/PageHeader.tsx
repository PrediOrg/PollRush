import React from 'react';
import { Typography, Box } from '@mui/material';
import {
  Breadcrumbs,
  Link,
  Stack,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 2 }}
        >
          {breadcrumbs.map((item, index) => (
            item.href ? (
              <Link
                key={index}
                component={RouterLink}
                to={item.href}
                color="inherit"
                underline="hover"
              >
                {item.label}
              </Link>
            ) : (
              <Typography
                key={index}
                color="text.primary"
              >
                {item.label}
              </Typography>
            )
          ))}
        </Breadcrumbs>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {actions && (
          <Stack
            direction="row"
            spacing={2}
            sx={{ ml: 2 }}
          >
            {actions}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default PageHeader; 