const { mysql } = require('../qcloud')


module.exports = async (ctx) => {
  var value = ctx.query.keyword
  await mysql('new1').select('*').where('category', 'like', '%'+value+'%')
      .then(res => {
        ctx.state.code = 0
        ctx.state.data = res
      })
      .catch(err => {
        ctx.state.code = -1
        throw new Error(err)
      })
}