const InvalidAccess = use('App/Exceptions/InvalidAccessException');

class AuthService {
  verifyAccess(object, user) {
    if (object.user_id != user.id) {
      throw new InvalidAccess();
    }
  }
}

module.exports = new AuthService();
