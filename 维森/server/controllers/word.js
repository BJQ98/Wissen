const { mysql } = require('../qcloud')


module.exports = async (ctx) => {
  var value = ctx.query.id
  console.log(value)
  await mysql('sentence').select('*').where('id',value)
    .then(res => {
      ctx.state.code = 0
      ctx.state.data = res
    })
    .catch(err => {
      ctx.state.code = -1
      throw new Error(err)
    })
}