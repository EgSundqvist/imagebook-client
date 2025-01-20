import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoadingComponent() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Centrera horisontellt
        alignItems: "center", // Centrera vertikalt
      }}
    >
      <CircularProgress />
    </Box>
  );
}
