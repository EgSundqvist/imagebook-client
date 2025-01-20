import React from "react";
import { Box, Avatar, useTheme, useMediaQuery } from "@mui/material";

interface AvatarSelectorProps {
  avatars: string[];
  selectedAvatar: string;
  onAvatarClick: (avatar: string) => void;
  avatarSize: number;
  avatarMargin: number;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  avatars,
  selectedAvatar,
  onAvatarClick,
  avatarSize,
  avatarMargin,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const borderColor =
    theme.palette.mode === "dark"
      ? theme.palette.primary.light
      : theme.palette.primary.main;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", mb: 3, flexWrap: isSmallScreen ? "wrap" : "nowrap" }}
    >
      {avatars.map((avatar) => (
        <Avatar
          key={avatar}
          src={`/avatars/${avatar}`}
          sx={{
            width: avatarSize,
            height: avatarSize,
            cursor: "pointer",
            border:
              selectedAvatar === avatar ? `3px solid ${borderColor}` : "none",
            mx: avatarMargin,
            my: isSmallScreen ? 1 : 0,
          }}
          onClick={() => onAvatarClick(avatar)}
        />
      ))}
    </Box>
  );
};

export default AvatarSelector;
