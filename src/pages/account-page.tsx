import { Box, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FormTextField from "../components/common/form-textfield";
import LoadingComponent from "../components/common/loading-spinner";
import Notification from "../components/common/notification";
import { useAccountForm } from "../hooks/use-accountform";
import PageLayout from "../components/layout/page-layout";

const AccountPage = () => {
  const {
    formData,
    loading,
    notificationOpen,
    notificationType,
    notificationMessage,
    handleChange,
    handleSubmit,
    handleNotificationClose,
    password,
    confirmPassword,
    confirmPasswordError,
    handlePasswordChange,
    handleConfirmPasswordChange,
    arePasswordsValid,
  } = useAccountForm();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <PageLayout title="Account Information">
      <FormTextField
        margin="normal"
        fullWidth
        id="first_name"
        label="First Name"
        name="first_name"
        autoComplete="off"
        onChange={handleChange}
        value={formData.first_name || ""}
        InputProps={{
          disabled: true,
        }}
        size={isSmallScreen ? "small" : "medium"}
      />
      <FormTextField
        margin="normal"
        fullWidth
        id="last_name"
        label="Last Name"
        name="last_name"
        autoComplete="off"
        onChange={handleChange}
        value={formData.last_name || ""}
        InputProps={{
          disabled: true,
        }}
        size={isSmallScreen ? "small" : "medium"}
      />
      <FormTextField
        margin="normal"
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="off"
        onChange={handleChange}
        value={formData.email || ""}
        InputProps={{
          disabled: true,
        }}
        size={isSmallScreen ? "small" : "medium"}
      />
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <FormTextField
          margin="normal"
          fullWidth
          id="old_password"
          label="Current Password"
          name="old_password"
          type="password"
          autoComplete="off"
          onChange={handleChange}
          value={formData.old_password || ""}
          size={isSmallScreen ? "small" : "medium"}
        />
        <FormTextField
          margin="normal"
          fullWidth
          id="new_password"
          label="New Password"
          name="new_password"
          type="password"
          autoComplete="off"
          onChange={handlePasswordChange}
          value={password}
          size={isSmallScreen ? "small" : "medium"}
        />
        <FormTextField
          margin="normal"
          fullWidth
          id="confirm_password"
          label="Confirm New Password"
          name="confirm_password"
          type="password"
          autoComplete="off"
          onChange={handleConfirmPasswordChange}
          value={confirmPassword}
          error={!!confirmPasswordError}
          helperText={confirmPasswordError || undefined}
          inputLabelColor="#ff6666"
          size={isSmallScreen ? "small" : "medium"}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          size={isSmallScreen ? "medium" : "large"}
          disabled={loading || !arePasswordsValid(formData.old_password || "")}
        >
          {loading ? <LoadingComponent /> : "Change Password"}
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

export default AccountPage;
