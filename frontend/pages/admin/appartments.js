import AdminLayout from "@/components/layout/AdminLayout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";

// Import the tab content components
import PendingApprovals from "@/components/tabs/PendingApprovals";
import HelpTickets from "@/components/tabs/HelpTickets";
import MaintenanceRequests from "@/components/tabs/MaintenanceRequests";
import { Divider } from "@mui/material";

const AppartmentsPage = () => {
 

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "100%" },
        bgcolor: "background.paper",
        borderRadius: 1,
      }}
    >
        AppartmentsPage 
    </Box>
  );
};

AppartmentsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default AppartmentsPage;
