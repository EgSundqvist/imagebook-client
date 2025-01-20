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
  const [imageCount, setImageCount] = useState(0); // Lägg till en state för att hålla reda på antalet bilder

  return (
    <PageLayout>
      <Typography
        variant="h1"
        sx={{
          fontFamily: "'Shadows Into Light', cursive",
          fontSize: isSmallScreen ? "40px" : "48px", // Justera fontSize baserat på skärmstorlek
          textAlign: "center",
          textDecoration: "underline",
        }}
      >
        {imageCount > 0 ? "My images" : "You haven't uploaded anything yet..."}{" "}
        {/* Visa olika texter beroende på antalet bilder */}
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
            padding: "6px 24px", // Justera padding för att göra knappen större
            fontSize: "24px", // Justera fontSize för att göra texten större
            fontWeight: "bold", // Justera fontWeight för att göra texten fylligare
          }}
        >
          Upload
        </Button>
      )}
      <ImageList onImageCountChange={setImageCount} />{" "}
      {/* Skicka tillbaka antalet bilder */}
    </PageLayout>
  );
}

export default HomePage;
