import Layout from '@/components/layout/layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { storeWrapper } from '../store/store';

export default function App({ Component, pageProps }: AppProps) {
  const { store, props } = storeWrapper.useWrappedStore({ ...pageProps });
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
