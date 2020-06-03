const _ = require('underscore');
const db = require('../db');
class Portfolio {
    id
    created_at
    updated_at
    deleted_at
    title
    description
    copyright
    author_id
    focal_length
    iso
    lens
    public

    static get_fields = ['id', 'title', 'description', 'author_id'];

    constructor(_id, _created_at, _updated_at, _deleted_at, _title, _description, _author_id){
        this.id = _id;
        this.created_at = _created_at;
        this.updated_at = _updated_at;
        this.deleted_at = _deleted_at;
        this.title = _title;
        this.description = _description;
        this.author_id = _author_id;
    }

    static async get(fields, ret_fields){
        var db_ret = await db('portfolios').where(fields).first(ret_fields ? this.get_fields.concat(ret_fields) : this.get_fields);
        return db_ret ? this.fromObject(db_ret) : null;
    }
    static async delete(id){
        await db('portfolios').where({id: id}).del();
    }
    static fromJSON(json){
        return this.fromObject(JSON.parse(json));
    }
    static fromObject(obj){
        var _obj = new Photo();
        for(const key in obj) {
            if( _obj.hasOwnProperty(key)){
                _obj[key] = obj[key];
            }
        }
        return _obj;
    }

    getUserQuery(){
        return require('../db')('users').where({id: this.author_id});
    }
}

module.exports = Portfolio;