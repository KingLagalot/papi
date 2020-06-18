const {Model} = require('./model');
class Portfolio{
    id
    created_at
    updated_at
    deleted_at
    title
    description
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

    async withPhotos(){
        try{
            const photo_ids = await db('portfolios_images').where({portfolio_id: this.id});
            this.photos = await db('photos').whereIn('id', photo_ids);
            return this;
        }catch(err){
            console.error(err);
        }
    }

    async addPhoto(photo_id){
        try{
            const pf = (await db('portfolios_images').insert({portfolio_id: this.id, photo_id: photo_id}))[0];
            return pf; 
        }catch(err){
            console.error(err);
        }
    }

    getUserQuery(){
        return require('../db')('users').where({id: this.author_id});
    }
}

require('./model')('portfolios', Portfolio);

module.exports = Portfolio;