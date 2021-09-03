import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {wrapper} from "src/store/modules";
import {QueryClient, QueryClientProvider} from "react-query";
import {Hydrate} from "react-query/hydration";
import {ReactQueryDevtoolsPanel} from "react-query/devtools";

function MyApp({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient();
  return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydrateState}>
          <Component {...pageProps} />
          <ReactQueryDevtoolsPanel/>
        </Hydrate>
      </QueryClientProvider>
  )
}

export default wrapper.withRedux(MyApp);
