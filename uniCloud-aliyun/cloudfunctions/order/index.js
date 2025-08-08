// 云函数入口文件
'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
  const { action, data, user_id } = event
  if (action === 'list') {
    // 获取订单列表
    const res = await db.collection('order').where({ user_id }).get()
    return res
  } else if (action === 'add') {
    // 新增订单
    const res = await db.collection('order').add(data)
    return res
  }
  return { code: 400, msg: '未知操作' }
}