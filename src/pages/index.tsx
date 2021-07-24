import { CssBaseline, ThemeProvider } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import { StyledEngineProvider } from '@material-ui/core/styles'
import moment from 'moment'
import Head from 'next/head'
import 'moment/locale/it'
import React, { useState } from 'react'

import App from 'components/App'
import theme from 'theme/theme'

const Index: React.VFC = () => {
  moment().locale('it')
  const [pageTitle, setPageTitle] = useState('-')
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <CssBaseline />

        <Container component="main" maxWidth="sm">
          <App setPageTitle={setPageTitle} />
        </Container>
      </StyledEngineProvider>
    </ThemeProvider>
  )
}

export default Index
