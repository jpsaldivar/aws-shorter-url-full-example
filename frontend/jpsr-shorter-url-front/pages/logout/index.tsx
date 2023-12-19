import { useRouter } from "next/router";
import useStorage from "@/components/hooks/useStorage";

const LogoutPage = () => {
  const router = useRouter();
  const { setItem } = useStorage();

  setItem("emailSession","");
  router.replace(router.asPath);
  return (
    <>
      <h1>Gracias!</h1>
    </>
  );
};

export default LogoutPage;
