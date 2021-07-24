import { Client } from '@notionhq/client'
import { RequestParameters } from '@notionhq/client/build/src/Client'

import { BlocksResultModel, DatabaseDataResultModel, ItemListResultModel } from 'interfaces/NotionResultModels'
import { Page } from 'interfaces/Page'
import log from 'lib/log'

import { Gateway } from './interfaces/gateway'

const notion = new Client({ auth: process.env.NOTION_KEY })
const database_id = process.env.NOTION_DATABASE_ID

export const initApi = (): Gateway => ({
  async getDatabaseName() {
    log('INFO', 'Reading database title from Notion API', 'api')

    const request_payload: RequestParameters = {
      method: 'get',
      path: `databases/${database_id}`,
    }
    const current_pages = await notion.request<DatabaseDataResultModel>(request_payload)

    return current_pages.title.map((title) => title.plain_text).join(' ')
  },
  async getPage(id: string) {
    const blocks: string[] = []
    log('INFO', 'Reading blocks for page from Notion API', 'api')

    async function getPageOfBlocks(cursor: string | undefined = undefined) {
      let request_payload: RequestParameters
      // Create the request payload based on the presence of a start_cursor
      if (cursor == undefined) {
        request_payload = {
          body: {},
          method: 'get',
          path: `blocks/${id}/children?page_size=100`,
        }
      } else {
        request_payload = {
          body: {
            start_cursor: cursor,
          },
          method: 'get',
          path: `blocks/${id}/children?page_size=100`,
        }
      }
      // While there are more pages left in the query, get pages from the database.
      const current_pages = await notion.request<BlocksResultModel>(request_payload)

      for (const result of current_pages.results) {
        if (result.type !== 'unsupported') {
          const text = result.paragraph.text[0]?.text?.content
          if (text) {
            blocks.push(text)
          }
        }
      }

      if (current_pages.has_more) {
        await getPageOfBlocks(current_pages.next_cursor)
      }
    }

    await getPageOfBlocks()
    return blocks
  },
  async getPages() {
    const pages: Page[] = []
    log('INFO', 'Reading item list from Notion API', 'api')

    async function getPageOfPages(cursor: string | undefined = undefined) {
      let request_payload: RequestParameters
      // Create the request payload based on the presence of a start_cursor
      if (cursor == undefined) {
        request_payload = {
          body: {
            sorts: [
              {
                direction: 'ascending',
                property: 'Name',
              },
            ],
          },
          method: 'post',
          path: `databases/${database_id}/query`,
        }
      } else {
        request_payload = {
          body: {
            start_cursor: cursor,
          },
          method: 'post',
          path: `databases/${database_id}/query`,
        }
      }
      // While there are more pages left in the query, get pages from the database.
      const current_pages = await notion.request<ItemListResultModel>(request_payload)

      for (const result of current_pages.results) {
        const order = +result.properties.Name.title[0]?.plain_text
        pages.push(<Page>{
          id: result.id,
          image: result.properties.Image?.url,
          name: result.properties.Name.title[0]?.plain_text,
          order: order,
          time: result.properties.Time?.number,
        })
      }

      if (current_pages.has_more) {
        await getPageOfPages(current_pages.next_cursor)
      }
    }

    await getPageOfPages()
    return pages
  },
})

export default initApi()
