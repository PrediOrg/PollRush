import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

declare module '@mui/material/Grid' {
  interface GridProps {
    item?: boolean;
    container?: boolean;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    sx?: SxProps<Theme>;
    component?: React.ElementType;
  }
}

declare module '@mui/material/ListItem' {
  interface ListItemProps {
    button?: boolean;
    component?: React.ElementType;
    sx?: SxProps<Theme>;
    disabled?: boolean;
  }
}

declare module '@mui/material/ListItemText' {
  interface ListItemTextProps {
    primary?: React.ReactNode;
    secondary?: React.ReactNode;
  }
}

declare module '@mui/material/ListItemAvatar' {
  interface ListItemAvatarProps {
    children?: React.ReactNode;
  }
}

declare module '@mui/material/Avatar' {
  interface AvatarProps {
    src?: string;
    alt?: string;
  }
}

declare module '@mui/material/Link' {
  interface LinkProps {
    children?: React.ReactNode;
  }
} 