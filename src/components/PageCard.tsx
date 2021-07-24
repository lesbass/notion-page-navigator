import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from '@material-ui/core'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import ReplayIcon from '@material-ui/icons/Replay'
import React, { useEffect, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import Swipe from 'react-easy-swipe'

import ColorCard from 'components/template/ColorCard'
import { Page } from 'interfaces/Page'
import api from 'lib/local-api'

interface RenderTimeProps {
  remainingTime: number
}

const styles = {
  text: {
    color: '#aaa',
  },
  timer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  value: {
    fontSize: '40px',
  },
}

const renderTime = ({ remainingTime }: RenderTimeProps) => {
  if (remainingTime === 0) {
    return <div className="timer">Completato!</div>
  }

  return (
    <div style={styles.timer as React.CSSProperties}>
      <div style={styles.text}>Restano</div>
      <div style={styles.value}>{remainingTime}</div>
      <div style={styles.text}>secondi</div>
    </div>
  )
}

interface ExerciseProps {
  backToStart: () => void
  currentPage: Page
  databaseName: string | undefined
  moveNext: () => void
  movePrev: () => void
  pages: Page[]
}

const PageCard: React.VFC<ExerciseProps> = ({ backToStart, currentPage, databaseName, moveNext, movePrev, pages }) => {
  const currentIndex = currentPage ? pages.indexOf(currentPage) + 1 : 0
  const [pageBlocks, setPageBlocks] = useState<string[] | undefined>(undefined)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setPageBlocks(undefined)
    if (currentPage) {
      api.getPage(currentPage.id).then((data) => {
        setPageBlocks(data)
      })
    }
  }, [currentPage])

  const title = databaseName ? `${databaseName}: ${currentIndex} / ${pages.length}` : '-'

  return (
    <ColorCard>
      <CardHeader
        action={
          currentIndex > 1 ? (
            <IconButton aria-label="Torna all'inizio" onClick={backToStart}>
              <ReplayIcon />
            </IconButton>
          ) : (
            ''
          )
        }
        avatar={<AccessibilityNewIcon />}
        sx={{ paddingBottom: 0 }}
        title={title}
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        {pageBlocks ? (
          <Swipe tolerance={100} onSwipeLeft={moveNext} onSwipeRight={movePrev}>
            <Grid container alignItems="center" direction="column" spacing={4} sx={{ paddingTop: '20px' }}>
              <Grid item textAlign={'center'}>
                <ReactAudioPlayer autoPlay controls src={`/api/tts?id=${currentPage.id}`} />
              </Grid>

              {currentPage.image && (
                <Grid item textAlign={'left'}>
                  <img
                    alt={'Exercise image'}
                    height={100}
                    src={currentPage.image}
                    style={{ height: 'auto', width: '100%' }}
                    width={100}
                  />
                </Grid>
              )}
              <Grid item textAlign={'left'}>
                <Typography variant={'body1'}>{pageBlocks.join('<br />')}</Typography>
              </Grid>
              {currentPage.time && (
                <Grid item textAlign={'center'}>
                  <CountdownCircleTimer
                    colors={[
                      [isPlaying ? '#fa0d26' : '#72cdd0', 0.33],
                      ['#ffe74d', 0.33],
                      ['#88ff4d', 0.33],
                    ]}
                    duration={currentPage.time}
                    isPlaying={isPlaying}
                  >
                    {renderTime}
                  </CountdownCircleTimer>
                  <Button style={{ marginTop: '10px' }} variant={'outlined'} onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? 'Stop' : 'Start'}
                  </Button>
                </Grid>
              )}
            </Grid>
          </Swipe>
        ) : (
          <Grid container alignItems="center" direction="column" spacing={4} sx={{ padding: '20px' }}>
            <Grid item textAlign={'center'}>
              <b>Caricamento...</b>
            </Grid>
            <Grid item sx={{ width: '100%' }}>
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            </Grid>
          </Grid>
        )}
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
        <IconButton aria-label="Indietro" onClick={movePrev}>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton aria-label="Avanti" style={{ float: 'right' }} onClick={moveNext}>
          <NavigateNextIcon />
        </IconButton>
      </CardActions>
    </ColorCard>
  )
}

export default PageCard
