import '../../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@emotion/react'
import theme from 'src/mui/theme'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
