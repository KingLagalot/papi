var Jimp = require('jimp');
const _ = require('underscore');
const db = require('../db');
class Photo {
    id
    created_at
    updated_at
    deleted_at
    title
    description
    author_id
    public
    processing

    static get_fields = ['id', 'title', 'description', 'author_id'];

    constructor(_id, _created_at, _updated_at, _deleted_at, _title, _description, _author_id, _public, _processing){
        this.id = _id;
        this.created_at = _created_at;
        this.updated_at = _updated_at;
        this.deleted_at = _deleted_at;
        this.title = _title;
        this.description = _description;
        this.author_id = _author_id;
        this.public = _public;
        this.processing = _processing;
    }

    async moveAndSize(file){
        Jimp.read(file.path, (err, jp) => {
            if (err) throw err;
            jp
              .resize(256, 256)
              .write(`${process.env.STORAGE_DIR}/${ctx.state.user.id}/tiny/${body.id}.png`); // save
            jp
              .resize(512, 512)
              .write(`${process.env.STORAGE_DIR}/${ctx.state.user.id}/small/${body.id}.png`); // save
            jp
              .resize(1024, 1024)
              .write(`${process.env.STORAGE_DIR}/${ctx.state.user.id}/medium/${body.id}.png`); // save
            jp
              .resize(2048, 2048)
              .write(`${process.env.STORAGE_DIR}/${ctx.state.user.id}/large/${body.id}.png`); // save
          });
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