import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedRecruiterRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user?.role === "job-seeker") {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [navigate, user]);

  if (loading) return;

  return children;
}
