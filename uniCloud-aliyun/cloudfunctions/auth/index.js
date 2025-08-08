'use strict';
const db = uniCloud.database()
const crypto = require('crypto')

function generateToken() {
  return crypto.randomBytes(16).toString('hex') + Date.now().toString(36)
}

exports.main = async (event, context) => {
  const { action, code, nickname, avatar } = event

  if (action === 'login') {
    // 微信小程序登录：使用 code 换取 openid
    let openid = ''
    try {
      // 读取配置（请在uni-config-center中配置，或直接填写常量）
      const APPID = process.env.MP_WEIXIN_APPID || ''
      const SECRET = process.env.MP_WEIXIN_SECRET || ''
      if (code && APPID && SECRET) {
        const resp = await uniCloud.httpclient.request('https://api.weixin.qq.com/sns/jscode2session', {
          method: 'GET',
          data: { appid: APPID, secret: SECRET, js_code: code, grant_type: 'authorization_code' },
          dataType: 'json',
          timeout: 5000
        })
        if (resp.data && resp.data.openid) openid = resp.data.openid
      }
      // 本地/无配置时，使用模拟openid，便于联调
      if (!openid) openid = 'mock_' + (code || generateToken())
    } catch (e) {
      // 失败也使用mock，避免开发阻塞
      openid = 'mock_' + (code || generateToken())
    }

    // 查找或创建用户
    const users = await db.collection('user').where({ openid }).get()
    let user = users.data && users.data[0]
    if (!user) {
      const insert = await db.collection('user').add({ openid, nickname: nickname || '', avatar: avatar || '', role: 'user' })
      user = { _id: insert.id, openid, nickname: nickname || '', avatar: avatar || '', role: 'user' }
    }

    // 生成token并保存
    const token = generateToken()
    const token_expire = Date.now() + 7 * 24 * 60 * 60 * 1000
    await db.collection('user').doc(user._id).update({ token, token_expire })

    return { token, user: { _id: user._id, openid, nickname: user.nickname, avatar: user.avatar, role: user.role } }
  }

  return { code: 400, msg: 'unknown action' }
}