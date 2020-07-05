var _ = require('underscore');
const db = require('../db');
const bcrypt = require('bcryptjs');
class User {
  static get_fields = [
    'id',
    'display_name',
    'first_name',
    'last_name',
    'photo_url',
    'email',
    'username',
    'account_type',
  ];

  constructor(
    _id,
    _created_at,
    _updated_at,
    _deleted_at,
    _display_name,
    _first_name,
    _last_name,
    _photo_url,
    _email,
    _username,
    _password,
    _provider,
    _provider_id,
    _account_type,
  ) {
    this.id = _id;
    this.created_at = _created_at;
    this.updated_at = _updated_at;
    this.deleted_at = _deleted_at;
    this.display_name = _display_name;
    this.first_name = _first_name;
    this.last_name = _last_name;
    this.photo_url = _photo_url;
    this.email = _email;
    this.username = _username;
    this.password = _password;
    this.provider = _provider;
    this.provider_id = _provider_id;
    this.account_type = _account_type;
  }

  static async create(fields, ret_fields) {
    try {
      if (fields && fields.password) {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(fields.password, salt);
        fields.password = hash;
      }
      const user = (await db('users').insert(
        fields,
        ret_fields ? this.get_fields.concat(ret_fields) : this.get_fields,
      ))[0];
      return user;
    } catch (err) {
      console.error(err);
    }
  }

  getPhotosQuery() {
    return require('../db')('photos').where({ author_id: this.id });
  }
  getPortfoliosQuery() {
    return require('../db')('portfolios').where({ author_id: this.id });
  }
}

require('./model')('users', User);
module.exports = User;
