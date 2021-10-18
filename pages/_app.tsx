import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {store, wrapper} from "src/store/modules";
import {QueryClient, QueryClientProvider} from "react-query";
import {Hydrate} from "react-query/hydration";
import {ReactQueryDevtoolsPanel} from "react-query/devtools";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";
import {Provider} from "react-redux";
import {useEffect} from "react";
import {getCookie} from "src/utils/cookieUtil";
import {onSilentRefresh} from "src/utils/securityUtil";


function MyApp({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient();
  const reduxStore = store();
  const persistor = persistStore(reduxStore);

  // 로그인 상태일시 silentRefresh 진행
  useEffect(()=> {
      const userId = getCookie('userId');
      userId && onSilentRefresh(userId);
  },[]);

  return (
      <QueryClientProvider client={queryClient}>
          <Provider store={reduxStore}>
              <PersistGate persistor={persistor} loading={null}>
                  <Hydrate state={pageProps.dehydrateState}>
                      <Component {...pageProps} />
                  </Hydrate>
              </PersistGate>
          </Provider>
      </QueryClientProvider>
  )
}

export default wrapper.withRedux(MyApp);
