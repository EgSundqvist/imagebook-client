import React from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useImage } from "../hooks/use-image";
import ImageCard from "../components/image/image-card";
import ImageDeleteButton from "../components/image/image-delete";
import PageLayout from "../components/layout/page-layout";

const ImageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { image, loading, error } = useImage(id!);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <PageLayout>
      <Box display="flex" flexDirection="column" alignItems="center">
        {image && (
          <>
            <ImageCard image={image} isDetailPage />
            <ImageDeleteButton imageId={id!} />
          </>
        )}
      </Box>
    </PageLayout>
  );
};

export default ImageDetailPage;
