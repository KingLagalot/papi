var _ = require('underscore');
const db = require('../db');
const bcrypt = require('bcryptjs');
class User {
    id
    created_at
    updated_at
    deleted_at
    display_name
    first_name
    last_name
    photo_url
    email
    username
    password
    provider
    provider_id
    account_type

    static get_fields = ['id', 'display_name', 'first_name', 'last_name', 'photo_url', 'email', 'username'];

    constructor(_id, _created_at, _updated_at, _deleted_at, _display_name, _first_name, _last_name, _photo_url, _email, _username, _password, _provider, _provider_id, _account_type){
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

    static async create(fields, ret_fields){
        try{
        if(fields && fields.password){
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(fields.password, salt); 
            fields.password = hash;
        }
        return (await db('users').insert(fields, ret_fields ? this.get_fields.concat(ret_fields) : this.get_fields))[0];
        }catch(err){
            console.error(err);
        }
    }

    static async get(fields, ret_fields){
        var db_ret = await db('users').where(fields).first(ret_fields ? this.get_fields.concat(ret_fields) : this.get_fields);
        return db_ret ? this.fromObject(db_ret) : null;
    }
    static async delete(id){
        await db('users').where(id).del();
    }
    static fromJSON(json){
        return this.fromObject(JSON.parse(json));
    }
    static fromObject(obj){
        var _obj = new User();
        for(const key in obj) {
            if( _obj.hasOwnProperty(key)){
                _obj[key] = obj[key];
            }
        }
        return _obj;
    }

    getPhotosQuery(){
        return require('../db')('photos').where({author_id: this.id});
    }
    getPortfoliosQuery(){
        return require('../db')('portfolios').where({author_id: this.id});
    }
}

module.exports = User;