var _ = require('underscore');
const db = require('../db');
const bcrypt = require('bcryptjs');
class User {

    static get_fields = ['token', 'refresh_token', 'user_id'];

    constructor(_token, _refresh_token, _user_id){
        this.token = _token;
        this.refresh_token = _refresh_token;
        this.user_id = _user_id;
    };

    static async create(fields, ret_fields){
        try{
        if(fields && fields.password){
            const salt = bcrypt.genSaltSync();
            const token_hash = bcrypt.hashSync(fields.token, salt); 
            const refresh_hash = bcrypt.hashSync(fields.refresh_token, salt); 
            fields.token = token_hash;
            fields.refresh_token = refresh_hash;
        }
        return (await db('auth_tokens').insert(fields, ret_fields ? this.get_fields.concat(ret_fields) : this.get_fields));
        }catch(err){
            console.error(err);
        }
    }

    static async get(fields, ret_fields){
        var db_ret = await db('auth_tokens').where(fields).first(ret_fields ? this.get_fields.concat(ret_fields) : this.get_fields);
        return db_ret ? this.fromObject(db_ret) : null;
    }
    static async delete(id){
        await db('auth_tokens').where(token).del();
    }
    static fromJSON(json){
        return this.fromObject(JSON.parse(json));
    }
    static fromObject(obj){
        var _obj = new AuthToken();
        for(const key in obj) {
            if( _obj.hasOwnProperty(key)){
                _obj[key] = obj[key];
            }
        }
        return _obj;
    }

    getUser(){
        return require('../db')('users').where({id: this.user_id});
    }
}

module.exports = User;