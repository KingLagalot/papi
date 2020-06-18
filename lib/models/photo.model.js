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

require('./model')('photos', Photo);

module.exports = Photo;