import request from '@/utils/request'

/**
 *
 * @param {String} phone - 用户手机号码
 * @param {String} password - 用户密码
 * @returns Promise
 */
type LoginType = {
  phone: string
  password: string
}
export const login = ({ phone, password }: LoginType) => {
  return request('/login/cellphone', { phone, password }, 'POST')
}

/**
 * 获取短信验证码
 * @param {Integer|String} phone - 手机号码
 * @returns Promise
 */
export const sendCaptcha = (phone: string) => {
  return request('/captcha/sent', {
    phone,
    timestamp: Date.parse(new Date() + '')
  })
}

/**
 * 验证 验证码
 * @param {String} phone - 手机号码
 * @param {String} captcha - 验证码
 * @returns Promise
 */
type verifyType = {
  phone: string
  captcha: string
}
export const verifyUserCaptcha = ({ phone, captcha }: verifyType) => {
  return request(
    '/captcha/verify',
    { phone, captcha, timestamp: Date.parse(new Date() + '') },
    'POST'
  )
}
// ?uid=32953014
/**
 * 获取用户详情
 * @param {String} UID - 用户ID
 * @returns Promise
 */

export const findUserDetail = (uid: string) => {
  return request('/user/detail', {
    uid,
    timestamp: Date.parse(new Date() + '')
  })
}

/**
 * 获取登录后调用此接口 ,可获取用户账号信息
 * @param {}
 * @returns Promise
 */
export const getUserDetail = () => {
  return request('/user/account')
}
// logout
/**
 * 退出登录
 * @param {}
 * @returns Promise
 */
export const logoutUser = () => {
  return request('/logout')
}

/**
 * 获取二维码生成的key
 * @returns Promise
 */
export const generateQRKey = () => {
  return request('/login/qr/key', { timestamp: Date.parse(new Date() + '') })
}

/**
 * 根据QRKey来生成二维码
 * @param {String} key - 生成需要的key
 * @returns Promise
 */
export const generateQR = (key: string) => {
  return request('/login/qr/create?qrimg=true', {
    key,
    timestamp: Date.parse(new Date() + '')
  })
}

/**
 * 二维码检测扫码状态
 * @param {String} key - 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
 * @returns Promise
 */
export const checkGenerateQR = (key: string) => {
  return request('/login/qr/check', {
    key,
    timestamp: Date.parse(new Date() + '')
  })
}

/**
 *获取用户信息 , 歌单，收藏，mv, dj 数量
 * @param {String} uid - 用户ID
 * @returns Promise
 */

export const findUserPlayList = (uid: string, limit = 500) => {
  return request('/user/playlist', {
    uid,
    limit,
    timestamp: Date.parse(new Date() + '')
  })
}

/**
 * 获取用户关注电台
 * @param {String} uid - 用户ID
 * @returns Promise
 */
export const findUserAudioList = () => {
  return request('/dj/sublist')
}

/**
 * 获取用户关注列表
 * @param {String} uid - 用户ID
 * @returns Promise
 */
export const findUserFollowsList = (uid: string) => {
  return request('user/follows?limit=10000', { uid })
}

/**
 * 获取用户关注列表
 * @param {String} uid - 用户ID
 * @returns Promise
 */
export const findUserFollowedList = (uid: string) => {
  return request('/user/followeds?limit=10000', { uid })
}
