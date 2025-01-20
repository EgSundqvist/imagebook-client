import React, { useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useImageUpload } from "../../hooks/use-imageupload"; // Importera useImageUpload

interface ImageUploadProps {
  onFileSelected: (file: File | null) => void;
  onClear: () => void;
  selectedFile: File | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onFileSelected,
  onClear,
  selectedFile,
}) => {
  const {
    handleFileSelected,
    handleClear,
    selectedFile: internalSelectedFile,
  } = useImageUpload(); // Använd useImageUpload

  const theme = useTheme();

  useEffect(() => {
    handleFileSelected(selectedFile);
  }, [selectedFile, handleFileSelected]);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      handleFileSelected(file);
      onFileSelected(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    disabled: !!internalSelectedFile,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "2px dashed #ccc",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <Box {...getRootProps()} sx={{ width: "100%" }}>
        <input {...getInputProps()} />
        {!internalSelectedFile && (
          <Typography variant="body1">
            {isDragActive
              ? "Drop the image here..."
              : "Drag & drop an image here, or click to select one"}
          </Typography>
        )}
        {internalSelectedFile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Typography variant="body1" sx={{ mr: 1 }}>
              Selected file: {internalSelectedFile.name}
            </Typography>
            <IconButton
              size="small"
              onClick={() => {
                handleClear();
                onClear();
              }}
              sx={{ color: theme.palette.icon.main }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ImageUpload;
