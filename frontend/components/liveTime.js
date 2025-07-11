import React, { useState, useEffect } from "react";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import { CalendarDays } from "lucide-react";
import theme from "@/theme";
import { CalendarMonthOutlined } from "@mui/icons-material";

// This component will handle the live time updates
const LiveTime = () => {
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, []);

  const formattedTime = currentTime.toLocaleString("en-GB", {
    weekday: "long", // Monday
    day: "2-digit", // 28
    month: "short", // Apr
    hour: "2-digit", // 02
    minute: "2-digit", // 46
    second: '2-digit',// 30
    hour12: true, // 12-hour format
  });

  return (
    <Stack gap={1} direction="row" justifyContent="end">
      {/* <CalendarDays sx={{ fontSize: 12, color: "#666" }}  /> */}
      <CalendarMonthOutlined sx={{ fontSize: 18, color: "#666" }}  />
      <Typography variant="body2" color="#666" fontWeight={500}>
        {formattedTime}
      </Typography>
    </Stack>
  );
};

export default LiveTime;
