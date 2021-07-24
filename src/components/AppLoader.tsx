import { Box, CardContent, CardHeader, Grid, LinearProgress } from '@material-ui/core'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'
import React from 'react'

import ColorCard from 'components/template/ColorCard'

const AppLoader: React.VFC = () => {
  return (
    <ColorCard>
      <CardHeader
        avatar={<AccessibilityNewIcon />}
        sx={{ paddingBottom: 0 }}
        title={`Caricamento...`}
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Grid container alignItems="center" direction="column" spacing={4} sx={{ padding: '20px' }}>
          <Grid item sx={{ width: '100%' }}>
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </ColorCard>
  )
}

export default AppLoader
