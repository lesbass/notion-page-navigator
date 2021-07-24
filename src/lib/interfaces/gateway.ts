import { Page } from '../../interfaces/Page'

export type Gateway = {
  getDatabaseName: () => Promise<string>
  getPage: (id: string) => Promise<string[]>
  getPages: () => Promise<Page[]>
}
