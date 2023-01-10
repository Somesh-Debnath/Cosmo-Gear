import { SnipcartProvider } from 'use-snipcart';

import '@styles/globals.scss'

function MyApp({ Component, pageProps:{session,...pageProps} }) {
  return (
    <SnipcartProvider>
      <Component {...pageProps} />
    </SnipcartProvider>
  );
}

export default MyApp