import { Box, Typography, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";

export default function SecurityLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <Box sx={{ width: 240, bgcolor: "#f0f0f0", p: 2 }}>
          <Typography variant="h6">Security Sidebar</Typography>
        </Box>

        {/* Main content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
