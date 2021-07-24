import { NextApiRequest, NextApiResponse } from 'next'

import api from 'lib/notion-client'

import log from '../../lib/log'

const databaseName = async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  try {
    if (request.method?.toUpperCase() === 'GET') {
      response.setHeader('content-type', 'application/json')

      const data = await api.getDatabaseName()
      response.status(200).send(data)
    } else {
      log('ERROR', 'Method not allowed', 'api.databaseName')
      response.status(405).send('')
    }
  } catch (error) {
    log('ERROR', error.message, 'api.databaseName')
    response.status(500).send('Generic error')
  }
}

export default databaseName
