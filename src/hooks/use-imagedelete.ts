import { useState } from "react";
import axios from "axios";
import { getDeleteUrl, confirmDelete } from "../services/image-service";
import { useNotification } from "./use-notifications";
import { useNavigate } from "react-router-dom";
import { ImageData } from "../types/image";

export const useImageDelete = (imageId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    notificationOpen,
    notificationType,
    notificationMessage,
    showNotification,
    handleNotificationClose,
  } = useNotification();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { data } = await getDeleteUrl(imageId);
      console.log("Delete URL response:", data);
      const { PresignedURL } = data as Pick<ImageData, 'PresignedURL'>;
      const deleteResponse = await axios.delete(PresignedURL);

      if (deleteResponse.status === 204) {
        await confirmDelete(imageId);
        showNotification("success", "Image deleted successfully");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        throw new Error("Failed to delete image from S3");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      showNotification("error", "Error deleting image");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    notificationOpen,
    notificationType,
    notificationMessage,
    handleDelete,
    handleNotificationClose,
  };
};