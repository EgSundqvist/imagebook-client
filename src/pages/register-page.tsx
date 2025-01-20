import { Box, Button, Typography, Divider, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LoadingComponent from "../components/common/loading-spinner";
import Notification from "../components/common/notification";
import AvatarSelector from "../components/profile/avatar-selector";
import FormTextField from "../components/common/form-textfield";
import { useRegisterForm } from "../hooks/use-registerform";
import PageLayout from "../components/layout/page-layout";

const RegisterPage = () => {
  const {
    formData,
    loading,
    notificationOpen,
    notificationType,
    notificationMessage,
    passwordError,
    handleAvatarClick,
    handleChange,
    handleSubmit,
    handleNotificationClose,
    password,
    confirmPassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
  } = useRegisterForm();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const avatarSize = isSmallScreen ? 55 : isMediumScreen ? 70 : 80;
  const avatarMargin = isSmallScreen ? 1 : isMediumScreen ? 2 : 3;

  return (
    <PageLayout title="Register">
      <Typography variant="h6" component="h2" gutterBottom>
        Choose an Avatar
      </Typography>
      <AvatarSelector
        avatars={["owl.jpg", "deer.jpg", "wolf.jpg", "rabbit.jpg", "lynx.jpg"]}
        selectedAvatar={formData.avatar}
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
        onChange={handleChange}
        size={isSmallScreen ? "small" : "medium"}
        value={formData.username}
      />
      <FormTextField
        margin="normal"
        fullWidth
        id="bio"
        label="Bio"
        name="bio"
        autoComplete="off"
        onChange={handleChange}
        size={isSmallScreen ? "small" : "medium"}
        value={formData.bio}
      />
      <Divider sx={{ width: "100%", my: 3 }} />
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <FormTextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="off"
          onChange={handleChange}
          size={isSmallScreen ? "small" : "medium"}
          value={formData.firstName}
        />
        <FormTextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="off"
          onChange={handleChange}
          size={isSmallScreen ? "small" : "medium"}
          value={formData.lastName}
        />
        <FormTextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="off"
          onChange={handleChange}
          size={isSmallScreen ? "small" : "medium"}
          value={formData.email}
        />
        <FormTextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="off"
          onChange={handlePasswordChange}
          size={isSmallScreen ? "small" : "medium"}
          value={password}
        />
        <FormTextField
          margin="normal"
          required
          fullWidth
          name="reenterPassword"
          label="Re-enter Password"
          type="password"
          id="reenterPassword"
          autoComplete="off"
          onChange={handleConfirmPasswordChange}
          error={!!passwordError}
          helperText={passwordError || undefined}
          inputLabelColor="#ff6666"
          size={isSmallScreen ? "small" : "medium"}
          value={confirmPassword}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
          size={isSmallScreen ? "medium" : "large"}
        >
          {loading ? <LoadingComponent /> : "Register"}
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

export default RegisterPage;
