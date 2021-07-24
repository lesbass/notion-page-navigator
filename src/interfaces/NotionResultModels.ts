export type ItemListResultModel = {
  has_more: boolean
  next_cursor: string
  results: {
    id: string
    properties: {
      Image: {
        url: string
      }
      Name: {
        title: {
          plain_text: string
        }[]
      }
      Time: {
        number: number
      }
    }
  }[]
}
export type DatabaseDataResultModel = {
  title: {
    plain_text: string
  }[]
}
export type BlocksResultModel = {
  has_more: boolean
  next_cursor: string
  results: {
    id: string
    paragraph: {
      text: {
        text: {
          content: string
        }
        type: string
      }[]
    }
    type: string
  }[]
}
