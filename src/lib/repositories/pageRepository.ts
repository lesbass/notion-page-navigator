import memoryCache, { CacheClass } from 'memory-cache'

import log from 'lib/log'
import api from 'lib/notion-client'

const memCache: CacheClass<string, string[]> = memoryCache

const initRepository = () => ({
  async getPage(id: string, refresh = false) {
    const cacheKey = `pageRepository.getPage-${id}`
    const timeInMinutes = 120

    let cachedData = memCache.get(cacheKey)
    if (!cachedData || refresh) {
      cachedData = await api.getPage(id)
      memCache.put(cacheKey, cachedData, timeInMinutes * 60 * 1000)
    } else {
      log('INFO', 'cached data found', 'pageRepository.getPage')
    }
    return cachedData
  },
})

export default initRepository()
