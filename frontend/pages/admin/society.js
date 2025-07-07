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

const SocietyPage = () => {
  const tabs = [
    { label: "Pending Approvals", component: <PendingApprovals /> },
    { label: "Help Tickets", component: <HelpTickets /> },
    { label: "Maintenance", component: <MaintenanceRequests /> },
  ];

  const [tabValue, setTabValue] = useState(0);

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "100%" },
        bgcolor: "background.paper",
        borderRadius: 1,
      }}
    >
      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      <Divider />
      <Box sx={{ p: 2, height: "100vh" }}>{tabs[tabValue].component}</Box>
    </Box>
  );
};

SocietyPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default SocietyPage;
