import useRoleGuard from "@/hooks/useRoleGuard";
import SecurityLayout from "@/components/layout/SecurityLayout";
import { Box, CircularProgress } from "@mui/material";

const SecurityDashboard = () => {
  // const isAuthorized = useRoleGuard("security");

  // if (!isAuthorized) {
  //   return (
  //     <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
  //       <CircularProgress />
  //     </Box>
  //   );
  // }
  return <h1>Security Dashboard</h1>;
};

SecurityDashboard.getLayout = (page) => <SecurityLayout>{page}</SecurityLayout>;

export default SecurityDashboard;
