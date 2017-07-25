import { request, config } from 'utils'
const { api } = config
const { testItem } = api

export async function queryMany (params) {

  return request({
    url: testItem.replace('/:id',""),
    method: 'get',
    data: params,
  })
}