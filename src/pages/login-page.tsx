import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import LoadingComponent from "../components/common/loading-spinner";
import Notification from "../components/common/notification";
import FormTextField from "../components/common/form-textfield";
import { useLoginForm } from "../hooks/use-loginform";
import PageLayout from "../components/layout/page-layout";

const LoginPage = () => {
  const {
    formData,
    loading,
    notificationOpen,
    notificationType,
    notificationMessage,
    handleChange,
    handleSubmit,
    handleNotificationClose,
  } = useLoginForm();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  console.log("Keel running...");

  return (
    <PageLayout title="Login">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <FormTextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus={true}
          size={isSmallScreen ? "small" : "medium"}
          onChange={handleChange}
          value={formData.email}
        />
        <FormTextField
          id="outlined-password-input"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="off"
          size={isSmallScreen ? "small" : "medium"}
          onChange={handleChange}
          value={formData.password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          size={isSmallScreen ? "medium" : "large"}
          disabled={loading}
        >
          {loading ? <LoadingComponent /> : "Sign In"}
        </Button>
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          or
        </Typography>
        <Button
          component={Link}
          to="/register"
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          size={isSmallScreen ? "medium" : "large"}
        >
          Register
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

export default LoginPage;
