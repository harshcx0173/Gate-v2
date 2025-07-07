import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function useRoleGuard(allowedRole) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!router.isReady) return;

    const role = localStorage.getItem("role");

    if (!role || role !== allowedRole) {
      // Unauthorized? Redirect
      if (role === "admin") {
        router.replace("/admin/dashboard");
      } else if (role === "residential") {
        router.replace("/residential/dashboard");
      } else if (role === "security") {
        router.replace("/security/dashboard");
      } else {
        router.replace("/login");
      }
    } else {
      // Role matches, allow render
      setIsAuthorized(true);
    }
  }, [router.isReady, router, allowedRole]);

  return isAuthorized;
}
