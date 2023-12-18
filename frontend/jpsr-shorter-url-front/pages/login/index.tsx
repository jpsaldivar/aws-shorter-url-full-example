import LoginForm from "@/components/login/LoginForm";
import { useRouter } from "next/router";
import useStorage from "@/components/hooks/useStorage";

import Head from "next/head";
const LoginPage = () => {
  const router = useRouter();
  const AddLoginData = async (enteredLoginData: any) => {
    const { setItem } = useStorage(); 
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(enteredLoginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      setItem('emailSession',enteredLoginData.email);
      const data = await response.json();
      router.push("/user");
    }
  };

  return (
    <>
      <Head>
        <title>Login page</title>
      </Head>
      <LoginForm addLoginData={AddLoginData}  />
    </>
  );
};

export default LoginPage;
