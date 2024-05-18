import { useRouter } from "next/router";
import { useEffect } from "react";

const useAuth = (): null => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Dashboard/Pokemon");
    }
  }, []);
  return null;
};

export default useAuth;
