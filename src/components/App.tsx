import { sortBy } from 'lodash'
import React, { useEffect, useState } from 'react'

import AppLoader from 'components/AppLoader'
import PageCard from 'components/PageCard'
import { Page } from 'interfaces/Page'
import api from 'lib/local-api'

interface Props {
  setPageTitle: (pageTitle: string) => void
}

const App: React.VFC<Props> = ({ setPageTitle }) => {
  const [pages, setPages] = useState<Page[]>([])
  const [databaseName, setDatabaseName] = useState<string | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState<Page | undefined>(undefined)

  useEffect(() => {
    console.log('fetch')
    api.getPages().then((data) => {
      const sortedData = sortBy(data, ['order'])
      setPages(sortedData)
    })
    api.getDatabaseName().then((data) => setDatabaseName(data))
  }, [])

  useEffect(() => {
    setPageTitle(databaseName ?? '-')
  }, [databaseName, setPageTitle])

  useEffect(() => {
    if (pages.length > 0) {
      setCurrentPage(pages[0])
    }
  }, [pages])

  const moveNext = () => {
    const currentIndex = currentPage ? pages.indexOf(currentPage) : 0
    const nextIndex = currentIndex < pages.length - 1 ? currentIndex + 1 : 0
    setCurrentPage(pages[nextIndex])
  }
  const movePrev = () => {
    const currentIndex = currentPage ? pages.indexOf(currentPage) : 0
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : pages.length - 1
    setCurrentPage(pages[prevIndex])
  }
  const backToStart = () => {
    setCurrentPage(pages[0])
  }

  return currentPage === undefined ? (
    <AppLoader />
  ) : (
    <PageCard
      backToStart={backToStart}
      currentPage={currentPage}
      databaseName={databaseName}
      moveNext={moveNext}
      movePrev={movePrev}
      pages={pages}
    />
  )
}

export default App
