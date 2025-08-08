// 云函数入口文件
'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
  // 获取城市列表
  const res = await db.collection('city').get()
  return res
}