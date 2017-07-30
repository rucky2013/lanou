import { request, config } from 'utils'
const { api } = config
const { paper } = api

export async function queryMany (params) {

  return request({
    url: paper.replace('/:id',""),
    method: 'get',
    data: params,
  })
}
export async function update (params) {
  return request({
    url: paper,
    method: 'patch',
    data: params,
  })
}
export async function queryOneById (params) {
  return request({
    url: paper,
    method: 'get',
    data: params,
  })
}
