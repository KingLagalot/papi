const _ = require('underscore');
const db = require('../db');
class Photo {
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

    static get_fields = ['id', 'title', 'description', 'copyright', 'author_id', 'focal_length', 'iso', 'lens'];

    constructor(_id, _created_at, _updated_at, _deleted_at, _title, _description, _copyright, _author_id, _focal_length, _iso, _lens){
        this.id = _id;
        this.created_at = _created_at;
        this.updated_at = _updated_at;
        this.deleted_at = _deleted_at;
        this.title = _title;
        this.description = _description;
        this.copyright = _copyright;
        this.author_id = _author_id;
        this.focal_length = _focal_length;
        this.iso = _iso;
        this.lens = _lens;
    }

    static async create(fields, ret_fields){
        try{
            const pf = (await db('photos').insert(fields, ret_fields ? this.get_fields.concat(ret_fields) : this.get_fields))[0];
            return pf; 
        }catch(err){
            console.error(err);
        }
    }

    static async get(fields, ret_fields){
        var db_ret = await db('photos').where(fields).first(ret_fields ? this.get_fields.concat(ret_fields) : this.get_fields);
        return db_ret ? this.fromObject(db_ret) : null;
    }
    static async delete(id){
        await db('photos').where({id: id}).del();
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

    async addToPortfolio(portfolio_id){
        try{
            const pf = (await db('portfolios_images').insert({portfolio_id: portfolio_id, photo_id: this.id}))[0];
            return pf; 
        }catch(err){
            console.error(err);
        }
    }

    getUserQuery(){
        return require('../db')('users').where({id: this.author_id});
    }
}

module.exports = Photo;