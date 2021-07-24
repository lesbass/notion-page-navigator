import { NextApiRequest, NextApiResponse } from 'next'

import log from 'lib/log'
import pageRepository from 'lib/repositories/pageRepository'

const blocks = async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  try {
    if (request.method?.toUpperCase() === 'POST') {
      response.setHeader('content-type', 'application/json')

      const { id, refresh } = request.body
      const data = await pageRepository.getPage(id, refresh)
      response.status(200).send(data)
    } else {
      log('ERROR', 'Method not allowed', 'api.blocks')
      response.status(405).send('')
    }
  } catch (error) {
    log('ERROR', error.message, 'api.blocks')
    response.status(500).send('Generic error')
  }
}

export default blocks
