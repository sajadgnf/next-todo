import '../../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@emotion/react'
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'src/mui/theme'
import createEmotionCache from 'src/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  )
}

export default MyApp
