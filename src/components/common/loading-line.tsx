import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LoadingComponentLine() {
  return (
    <Box sx={{ width: "100%" }} display="flex" justifyContent="center">
      <LinearProgress />
    </Box>
  );
}
