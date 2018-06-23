const { mysql } = require('../qcloud')


module.exports = async (ctx) => {
  var info = {
    user: ctx.query.keyword1,//用户的唯一标识——openid
    conferID: ctx.query.keyword2//会议的唯一标识——ID
  }
  const iscollect = await mysql('collection').select('*').where(info);//能否找到
  if (!iscollect.length) {//如果没有，则插入
  await mysql('collection').insert(info)
    .then(res => {
      ctx.state.code = 0
      ctx.state.data = res
    })
    .catch(err => {
      ctx.state.code = -1
      throw new Error(err)
    })}
    else{//如果已经存在，返回一个类似flag的信息
    ctx.state.data = true
    }
}