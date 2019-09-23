const {User} = require('../db/models')

module.exports.isAuthorized = async function(req, res, next) {
  if (req.user) {
    const user = await User.findByPk(req.user.id)
    if (user.id !== Number(req.params.userId)) {
      res.status(401).redirect('/unauthorized')
    } else {
      return next()
    }
  } else {
    res.status(401).redirect('/unauthorized')
  }
}
