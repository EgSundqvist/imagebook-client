import React from "react";
import { Button } from "@mui/material";
import Notification from "../common/notification";
import { useImageDelete } from "../../hooks/use-imagedelete"; // Importera useImageDelete

interface ImageDeleteButtonProps {
  imageId: string;
}

const ImageDeleteButton: React.FC<ImageDeleteButtonProps> = ({ imageId }) => {
  const {
    loading,
    notificationOpen,
    notificationType,
    notificationMessage,
    handleDelete,
    handleNotificationClose,
  } = useImageDelete(imageId); // Använd useImageDelete

  return (
    <>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2, mb: 2 }}
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete image"}
      </Button>
      <Notification
        open={notificationOpen}
        onClose={handleNotificationClose}
        severity={notificationType}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={notificationMessage}
      />
    </>
  );
};

export default ImageDeleteButton;
