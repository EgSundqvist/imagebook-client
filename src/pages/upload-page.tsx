import { Box, Button } from "@mui/material";
import ImageUpload from "../components/image/image-upload";
import Notification from "../components/common/notification";
import LoadingComponent from "../components/common/loading-spinner";
import FormTextField from "../components/common/form-textfield";
import { useImageUpload } from "../hooks/use-imageupload";
import PageLayout from "../components/layout/page-layout";

const UploadPage = () => {
  const {
    selectedFile,
    description,
    loading,
    notificationOpen,
    notificationType,
    notificationMessage,
    handleFileSelected,
    handleClear,
    handleDescriptionChange,
    handleSubmit,
    handleNotificationClose,
    isFormValid,
  } = useImageUpload();

  return (
    <PageLayout title="Upload Image">
      <Box display="flex" flexDirection="column" alignItems="center">
        <ImageUpload
          onFileSelected={handleFileSelected}
          onClear={handleClear}
          selectedFile={selectedFile}
        />
        <FormTextField
          id="description"
          name="description"
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
          disabled={loading || !isFormValid()}
        >
          {loading ? <LoadingComponent /> : "Submit"}
        </Button>
        <Notification
          open={notificationOpen}
          onClose={handleNotificationClose}
          severity={notificationType}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          message={notificationMessage}
        />
      </Box>
    </PageLayout>
  );
};

export default UploadPage;
