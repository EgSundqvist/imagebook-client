import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AvatarSelector from "../components/profile/avatar-selector";
import FormTextField from "../components/common/form-textfield";
import LoadingComponent from "../components/common/loading-spinner";
import Notification from "../components/common/notification";
import { useProfileForm } from "../hooks/use-profileform";
import PageLayout from "../components/layout/page-layout";

const avatars = ["owl.jpg", "deer.jpg", "wolf.jpg", "rabbit.jpg", "lynx.jpg"];

const ProfilePage = () => {
  const {
    formData,
    loading,
    hasChanges,
    notificationOpen,
    notificationType,
    notificationMessage,
    handleChange,
    handleAvatarClick,
    handleSubmit,
    handleNotificationClose,
  } = useProfileForm();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const avatarSize = isSmallScreen ? 55 : isMediumScreen ? 70 : 80;
  const avatarMargin = isSmallScreen ? 1 : isMediumScreen ? 2 : 3;

  return (
    <PageLayout title="Profile">
      <Typography variant="h6" component="h2" gutterBottom>
        Choose an Avatar
      </Typography>
      <AvatarSelector
        avatars={avatars}
        selectedAvatar={formData.avatar || ""}
        onAvatarClick={handleAvatarClick}
        avatarSize={avatarSize}
        avatarMargin={avatarMargin}
      />
      <FormTextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="off"
        size={isSmallScreen ? "small" : "medium"}
        onChange={handleChange}
        value={formData.username || ""}
        sx={{ mt: 3 }}
      />
      <FormTextField
        margin="normal"
        fullWidth
        id="bio"
        label="Bio"
        name="bio"
        autoComplete="off"
        size={isSmallScreen ? "small" : "medium"}
        onChange={handleChange}
        value={formData.bio || ""}
        sx={{ mt: 3 }}
      />
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Button
          type="submit"
          size={isSmallScreen ? "medium" : "large"}
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
          disabled={loading || !hasChanges}
        >
          {loading ? <LoadingComponent /> : "Save Changes"}
        </Button>
      </Box>
      <Notification
        open={notificationOpen}
        onClose={handleNotificationClose}
        severity={notificationType}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={notificationMessage}
      />
    </PageLayout>
  );
};

export default ProfilePage;
