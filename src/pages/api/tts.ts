import { NextApiRequest, NextApiResponse } from 'next'

import log from 'lib/log'
import audioRepository from 'lib/repositories/audioRepository'

const tts = async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  try {
    if (request.method?.toUpperCase() === 'GET') {
      response.setHeader('content-type', 'audio/mp3')

      const { id } = request.query
      const data = await audioRepository.getAudio(Array.isArray(id) ? id[0] : id, false)
      response.status(200).send(data)
    } else {
      log('ERROR', 'Method not allowed', 'api.tts')
      response.status(405).send('')
    }
  } catch (error) {
    log('ERROR', error.message, 'api.tts')
    response.status(500).send('Generic error')
  }
}

export default tts
