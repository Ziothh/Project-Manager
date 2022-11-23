/* 
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import "../styles/globals.scss";

const SafeAppContents = ({ Component, pageProps }: AppProps) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  // Lock out users on old versions
  if (window?.yerba?.version < 0.1) {
    return <div>Please update your app</div>;
  }

  // Lock out SSR and browser users
  if (typeof window === "undefined" || !window?.yerba?.version) {
    return <div>Please use the app</div>;
  }

  // Only render if top two conditions pass
  return <Component {...pageProps} />;
};

function AppWrapper(props: AppProps) {
  return (
    <>
      <Head>
        <title>Project manager</title>
      </Head>
      <SafeAppContents {...props} />
    </>
  );
}

export default AppWrapper;
*/

import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.scss";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

// export default trpc.withTRPC(MyApp);
export default MyApp
