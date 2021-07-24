import axios from 'axios'

import { Page } from 'interfaces/Page'

import { Gateway } from './interfaces/gateway'

export const initApi = (): Gateway => ({
  async getDatabaseName() {
    return axios.get<string>('/api/databaseName').then((res) => res.data)
  },
  async getPage(id: string) {
    return axios.post<string[]>('/api/blocks', { id }).then((res) => res.data)
  },
  async getPages() {
    return axios.post<Page[]>('/api/pages').then((res) => res.data)
  },
})

export default initApi()
