import LoginForm from "@/components/login/LoginForm";
import { useRouter } from "next/router";
import useStorage from "@/components/hooks/useStorage";

const LogoutPage = () => {
  const router = useRouter();
  const { setItem } = useStorage();

  setItem("emailSession","");
  return (
    <>
      <h1>Gracias!</h1>
    </>
  );
};

export default LogoutPage;
