import { useState, useEffect } from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "@/components/layout/Layout";
import useStorage from "@/components/hooks/useStorage";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoggedIn,setIsLoggedIn] = useState(false)

  useEffect(() => {
    const { getItem } = useStorage();  
    const emailSession = getItem('emailSession');
    setIsLoggedIn(emailSession && emailSession !== ""? true : false);
  }, [])
  
  return (
    <Layout isLoggedIn={isLoggedIn} >
      <Component {...pageProps} />
    </Layout>
  );
}


