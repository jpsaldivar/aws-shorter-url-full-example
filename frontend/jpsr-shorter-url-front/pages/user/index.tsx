import useStorage from "@/components/hooks/useStorage";
import Head from "next/head";
import ShorterForm from "@/components/shorter/ShorterForm";
import { useRouter } from "next/router";

let newUrl = "";
const UserPage = (props: any) => {
  const { getItem } = useStorage();
  const email = getItem('emailSession');
  const router = useRouter();
  
  const getNewUrl = () => {
    return newUrl;
  }

  const setNewUrl = (value: string) => {
    newUrl = value;
  }
  const send = async (enteredLoginData: any) => {
    const response = await fetch("/api/shorter", {
      method: "POST",
      body: JSON.stringify(enteredLoginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log("DATa",data);
      setNewUrl(data.newUrl);
      //router.push("/user");
    }
  };

  return (
    <>
      <Head>
        <title>User data of {email}</title>
      </Head>
      <h1>Succesfully loggedin</h1>
      <h3>{email}</h3>
      <ShorterForm send={send} newUrl={getNewUrl()}/>
    </>
  );
};


export default UserPage;
