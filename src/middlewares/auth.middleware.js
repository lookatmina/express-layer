export default async function (req, res, next) {
  console.log('auth middleware 입니다.')
  next()
}
