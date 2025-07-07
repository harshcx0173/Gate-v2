import useRoleGuard from "@/hooks/useRoleGuard";
import ResidentialLayout from "@/components/layout/ResidentialLayout";
import { Box, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
const ResidentDashboard = () => {
  const isAuthorized = useRoleGuard("residential");
  const router = useRouter();

  if (!isAuthorized) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };
  return (
    <Box>
      <h1>Residential Dashboard</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
};

ResidentDashboard.getLayout = (page) => (
  <ResidentialLayout>{page}</ResidentialLayout>
);

export default ResidentDashboard;
