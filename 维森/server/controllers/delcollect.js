const {
  mysql
} = require('../qcloud')


module.exports = async(ctx) => {
  var info = {
    user: ctx.query.keyword1,
    conferID: ctx.query.keyword2
  }
  await mysql('collection').select('*').where(info).del()//因为逻辑所以不需要判断是否存在，直接删除
    .then(res => {
      ctx.state.code = 0
      ctx.state.data = res
    })
    .catch(err => {
      ctx.state.code = -1
      throw new Error(err)
    })
}