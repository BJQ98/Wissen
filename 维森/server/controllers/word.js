const { mysql } = require('../qcloud')


module.exports = async (ctx) => {
  var value = ctx.query.id//发送过来的随机数
  await mysql('sentence').select('*').where('id',value)//找到对应的句子
    .then(res => {
      ctx.state.code = 0
      ctx.state.data = res
    })
    .catch(err => {
      ctx.state.code = -1
      throw new Error(err)
    })
}