// 云函数入口文件
'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
  const { action, id, vendor, data } = event

  if (action === 'list') {
    // 获取文章列表（仅展示审核通过）
    const where = { status: 'approved' }
    if (vendor) where.vendor = vendor
    const res = await db.collection('article').where(where).orderBy('created_at', 'desc').get()
    return res
  }

  if (action === 'detail') {
    const res = await db.collection('article').doc(id).get()
    return res
  }

  if (action === 'add') {
    // 新增文章：默认待审核
    const now = Date.now()
    const doc = {
      title: data.title,
      desc: data.desc || '',
      img: data.img || '',
      vendor: data.vendor,
      content: data.content,
      status: 'pending',
      created_at: now,
      updated_at: now
    }
    const res = await db.collection('article').add(doc)
    return res
  }

  if (action === 'reviewList') {
    // 审核队列（待审核）
    const res = await db.collection('article').where({ status: 'pending' }).orderBy('created_at', 'desc').get()
    return res
  }

  if (action === 'approve') {
    const res = await db.collection('article').doc(id).update({ status: 'approved', updated_at: Date.now() })
    return res
  }

  if (action === 'reject') {
    const res = await db.collection('article').doc(id).update({ status: 'rejected', updated_at: Date.now() })
    return res
  }

  return { code: 400, msg: '未知操作' }
}