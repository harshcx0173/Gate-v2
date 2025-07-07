import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, CircularProgress } from "@mui/material";

export default function Home() {

  const router = useRouter();

  const navigateToSummary = () => {
    // Navigates to '/viewSummary' when the ViewSummary button is clicked
    router.push("/viewSummary");
  };

  const navigateToDevTools = () => {
    // Navigates to '/devTools' when the Project Section button is clicked
    router.push("/devtools");
  };


  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role) {
      router.replace("/login");
    }
    // Only redirect from root path `/`
    if (router.pathname === "/") {
      if (role === "admin") {
        router.replace("/admin/dashboard");
      } else if (role === "residential") {
        router.replace("/residential/dashboard");
      } else if (role === "security") {
        router.replace("/security/dashboard");
      }
    }
  }, [router]);

  return (
    <Box sx={{ display: 'flex',alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
    // <div>
    //   <button onClick={navigateToSummary}>ViewSummary</button>
    //   <button onClick={navigateToDevTools}>Project Section</button>
    // </div>
  );
}
