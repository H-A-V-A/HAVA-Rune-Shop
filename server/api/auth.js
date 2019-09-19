const {User} = require('../db/models')

module.exports.isAuthorized = async function(req, res, next) {
  console.log('reqqqqqqqqq', req.params)
  console.log('userrrrrrr', req.user)
  if (req.user) {
    const user = await User.findByPk(req.user.id)
    if (user.id !== Number(req.params.userId)) {
      res.sendStatus(401)
    } else {
      return next()
    }
  } else {
    res.sendStatus(401)
  }
}
