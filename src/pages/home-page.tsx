import "../App.css";
import { ImageList } from "../components/image/image-list";
import { Typography, Button } from "@mui/material";
import PageLayout from "../components/layout/page-layout";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [imageCount, setImageCount] = useState(0);

  return (
    <PageLayout>
      <Typography
        variant="h1"
        sx={{
          fontFamily: "'Shadows Into Light', cursive",
          fontSize: isSmallScreen ? "40px" : "48px",
          textAlign: "center",
          textDecoration: "underline",
        }}
      >
        {imageCount > 0 ? "My images" : "You haven't uploaded anything yet..."}{" "}
      </Typography>
      {imageCount === 0 && (
        <Button
          component={Link}
          to="/upload"
          variant="outlined"
          sx={{
            mt: 6,
            fontFamily: "'Shadows Into Light', cursive",
            border: "2px dashed",
            color: "inherit",
            textDecoration: "none",
            backgroundColor: "transparent",
            padding: "6px 24px",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Upload
        </Button>
      )}
      <ImageList onImageCountChange={setImageCount} />{" "}
    </PageLayout>
  );
}

export default HomePage;
