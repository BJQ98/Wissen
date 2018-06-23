const { mysql } = require('../qcloud')


module.exports = async (ctx) => {
  var info = {
    user: ctx.query.keyword1,
    conferID: ctx.query.keyword2
  }
  const iscollect = await mysql('collection').select('*').where(info);
  if (!iscollect.length) {
  await mysql('collection').insert(info)
    .then(res => {
      ctx.state.code = 0
      ctx.state.data = res
    })
    .catch(err => {
      ctx.state.code = -1
      throw new Error(err)
    })}
    else{
    ctx.state.data = true
    }
}