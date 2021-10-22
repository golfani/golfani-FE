import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {store, wrapper} from "src/store/modules";
import {QueryClient, QueryClientProvider, useQueryClient} from "react-query";
import {Hydrate} from "react-query/hydration";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";
import {useEffect} from "react";
import {getCookie} from "src/utils/cookieUtil";
import {onSilentRefresh} from "src/utils/securityUtil";
import {IMessage} from "@stomp/stompjs";
import {socketConnect, socketDisconnect} from "src/socket/socket";

const queryClient = new QueryClient();
const reduxStore = store();
const persistor = persistStore(reduxStore);

const alarmCallback = async (data : IMessage) => {
    await queryClient.invalidateQueries('alarm');
    await queryClient.invalidateQueries('unReadAlarm');
}

function MyApp({ Component, pageProps }: AppProps) {

  // 로그인 상태일시 silentRefresh 진행
  useEffect(()=> {
      const userId = getCookie('userId');
      userId && onSilentRefresh(userId);
      userId && socketConnect(alarmCallback);
      return () => socketDisconnect();
  },[]);

  return (
      <QueryClientProvider client={queryClient}>
          <PersistGate persistor={persistor} loading={null}>
              <Hydrate state={pageProps.dehydrateState}>
                    <Component {...pageProps} />
              </Hydrate>
          </PersistGate>
      </QueryClientProvider>
  )
}

export default wrapper.withRedux(MyApp);
