import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedProfileUser({ children }) {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/recruiter/companies");
    } else {
      setLoading(false);
    }
  }, [navigate, user?.role]);

  if (loading) return;
  return children;
}
