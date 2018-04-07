import qiniu from 'qiniu'
/**
 *
 * 构建一个七牛云上传凭证类
 * @class qn
 */
class QN {
  /**
   * Creates an instance of qn.
   * @param {string} accessKey -七牛云AK
   * @param {string} secretKey -七牛云SK
   * @param {string} scope -七牛云空间名称
   * @param {string} domain -七牛云默认外链域名,(可选参数)
   * @memberof QN
   */
  constructor (accessKey, secretKey, scope, domain) {
    this.ak = accessKey
    this.sk = secretKey
    this.scope = scope
    this.domain = domain
  }
  /**
   *
   * 获取七牛云文件上传凭证
   * @param {number} time - 七牛云凭证过期时间，以秒为单位，如果为空，默认为7200，有效时间为2小时
   * @memberof QN
   */
  upToken (time) {
    const mac = new qiniu.auth.digest.Mac(this.ak, this.sk)
    const options = {
      scope: this.scope,
      expires: time || 7200
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)
    return uploadToken
  }
}
// const myqn = new qn('saasas', 'asadasa', 'sasa', 'sasasdsa')
// const token = myqn.upToken()
// console.log(token)
export default QN
