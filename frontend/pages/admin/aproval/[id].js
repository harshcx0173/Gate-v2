import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

const ApproveUserPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [status, setStatus] = useState("Approving...");

  useEffect(() => {
    if (!id) return;

    const approveUser = async () => {
      try {
        await axios.patch(`https://gate-v2.onrender.com/api/auth/admin/approve-user/${id}`);
        setStatus("✅ User approved successfully!");
      } catch (err) {
        console.error(err);
        setStatus("❌ Error approving user.");
      }
    };

    approveUser();
  }, [id]);

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>{status}</h1>
    </div>
  );
};

export default ApproveUserPage;
