import memoryCache, { CacheClass } from 'memory-cache'

import getAudio from 'lib/getAudio'
import log from 'lib/log'

const memCache: CacheClass<string, Uint8Array | string | null | undefined> = memoryCache

const initRepository = () => ({
  async getAudio(id: string, refresh = false) {
    const cacheKey = `audioRepository.getAudio-${id}`
    const timeInMinutes = 120

    let cachedData = memCache.get(cacheKey)
    if (!cachedData || refresh) {
      cachedData = await getAudio(id)
      memCache.put(cacheKey, cachedData, timeInMinutes * 60 * 1000)
    } else {
      log('INFO', 'cached data found', 'audioRepository.getAudio')
    }
    return cachedData
  },
})

export default initRepository()
