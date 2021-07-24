import { NextApiRequest, NextApiResponse } from 'next'

import api from 'lib/notion-client'

import log from '../../lib/log'

const pages = async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  try {
    if (request.method?.toUpperCase() === 'POST') {
      response.setHeader('content-type', 'application/json')

      const data = await api.getPages()
      response.status(200).send(data)
    } else {
      log('ERROR', 'Method not allowed', 'api.pages')
      response.status(405).send('')
    }
  } catch (error) {
    log('ERROR', error.message, 'api.pages')
    response.status(500).send('Generic error')
  }
}

export default pages
