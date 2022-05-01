import "../styles/globals.css";
import { AppPropsWithLayout } from "../models";
import { EmptyLayout } from "../components/layout";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
