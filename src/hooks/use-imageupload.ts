import { useState } from "react";
import axios from "axios";
import { getUploadUrl, confirmUpload } from "../services/image-service";
import { v4 as uuidv4 } from "uuid";
import { useNotification } from "./use-notifications";

export const useImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const {
    notificationOpen,
    notificationType,
    notificationMessage,
    showNotification,
    handleNotificationClose,
  } = useNotification();

  const handleFileSelected = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleClear = () => {
    setSelectedFile(null);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const isFormValid = () => {
    return selectedFile !== null && description.trim() !== "";
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setLoading(true);

    try {
      const uniqueFileName = `${uuidv4()}-${selectedFile!.name}`;

      const { data } = await getUploadUrl(uniqueFileName, description);
      const { presignedURL, s3URL } = data;

      const uploadResponse = await axios.put(presignedURL, selectedFile, {
        headers: {
          "Content-Type": selectedFile!.type,
        },
      });

      if (uploadResponse.status === 200) {
        await confirmUpload(s3URL, description);

        setSelectedFile(null);
        setDescription("");
        handleClear();
        showNotification("success", "Upload successful");
      } else {
        throw new Error("Failed to upload image to S3");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      showNotification("error", "Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};