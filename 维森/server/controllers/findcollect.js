const { mysql } = require('../qcloud')


module.exports = async (ctx) => {
  var value = ctx.query.keyword//用户ID
  await mysql('collection').select('*').where('user', value).select('conferID')//根据用户的openid查找该用户所有的收藏
    .then(res => {
      ctx.state.code = 0
      ctx.state.data = res//返回json数组，在客户端回调函数中解析
    })
    .catch(err => {
      ctx.state.code = -1
      throw new Error(err)
    })
}