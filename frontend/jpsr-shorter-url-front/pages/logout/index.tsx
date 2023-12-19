import { useRouter } from "next/router";
import useStorage from "@/components/hooks/useStorage";

const LogoutPage = () => {
  const router = useRouter();
  const { setItem } = useStorage();

  const logout = () => {
    setItem("emailSession","");
    router.replace(router.asPath);
    router.push("/login");
  }
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <button
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
          onClick={logout}
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Cerrar sesión{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </button>
      </div>
    </main>
  );
};

export default LogoutPage;
