// // pages/_app.js
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { ThemeProvider, CssBaseline } from '@mui/material';
// import theme from '../theme';

// export default function App({ Component, pageProps }) {
//   const router = useRouter();

//   useEffect(() => {
//     const role = localStorage.getItem('role');

//     // Prevent redirect loop if already on the correct page
//     if (role === 'admin' && !router.pathname.startsWith('/admin')) {
//       router.push('/admin/dashboard');
//     } else if (role === 'residential' && !router.pathname.startsWith('/residential')) {
//       router.push('/residential/dashboard');
//     } else if (role === 'security' && !router.pathname.startsWith('/security')) {
//       router.push('/security/dashboard');
//     }
//   }, []);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Component {...pageProps} />
//     </ThemeProvider>
//   );
// }

// pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/theme";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();

  // useEffect(() => {
  //   const role = localStorage.getItem("role");

  //   // Only redirect from root path `/`
  //   if (router.pathname === "/") {
  //     if (role === "admin") {
  //       router.replace("/admin/dashboard");
  //     } else if (role === "residential") {
  //       router.replace("/residential/dashboard");
  //     } else if (role === "security") {
  //       router.replace("/security/dashboard");
  //     }
  //   }
  // }, [router]);

  return getLayout(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
