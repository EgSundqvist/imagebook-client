import { useInView } from "react-intersection-observer";
import ImageCard from "./image-card";
import { ImageData } from "../../types/image";
import { useEffect } from "react";
import LoadingComponent from "../common/loading-spinner";
import LoadingComponentLine from "../common/loading-line";
import { useImageList } from "../../hooks/use-imagelist"; // Importera useImageList
import { Typography, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface ImageListProps {
  onImageCountChange: (count: number) => void; // Lägg till en prop för att skicka tillbaka antalet bilder
}

export function ImageList({ onImageCountChange }: ImageListProps) {
  const { ref, inView } = useInView();
  const {
    images,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useImageList(); // Använd useImageList

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    onImageCountChange(images.length); // Skicka tillbaka antalet bilder
  }, [images.length, onImageCountChange]);

  const content = images.map((image: ImageData, index: number) => {
    if (images.length === index + 1) {
      return <ImageCard innerRef={ref} key={image.ID} image={image} />;
    }
    return <ImageCard key={image.ID} image={image} />;
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") {
    return LoadingComponent();
  }

  if (status === "error" && error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {content}
      {isFetchingNextPage ? (
        LoadingComponentLine()
      ) : !hasNextPage && images.length > 0 ? (
        <>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Shadows Into Light', cursive",
              fontSize: isSmallScreen ? "32px" : "48px",
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            No more images...
          </Typography>
        </>
      ) : null}
    </Box>
  );
}
