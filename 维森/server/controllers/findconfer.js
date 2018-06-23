const {
  mysql
} = require('../qcloud')


module.exports = async(ctx) => {
  var value = eval(ctx.query.keyword)//因为request传过来的数据为字符串，用eval解析成数组
  await mysql('new1').select('*').where((builder) =>
    builder.whereIn('ID', value)//根据会议的ID数组查找出所有的会议信息
    )
    .then(res => {
      ctx.state.code = 0
      ctx.state.data = res
    })
    .catch(err => {
      ctx.state.code = -1
      throw new Error(err)
    })
}