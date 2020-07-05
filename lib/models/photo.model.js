var sharp = require('sharp');
const _ = require('underscore');
const db = require('../db');
var fs = require('fs');
class Photo {
  id;
  created_at;
  updated_at;
  deleted_at;
  title;
  description;
  author_id;
  public;
  processing;

  static get_fields = ['id', 'title', 'description', 'author_id'];

  constructor(
    _id,
    _created_at,
    _updated_at,
    _deleted_at,
    _title,
    _description,
    _author_id,
    _public,
    _processing,
  ) {
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

  async moveAndSize(file) {
      try{
        if (!fs.existsSync(process.env.STORAGE_DIR)){
            fs.mkdirSync(process.env.STORAGE_DIR);
        }
        if (!fs.existsSync(`${process.env.STORAGE_DIR}/${this.author_id}`)){
            fs.mkdirSync(`${process.env.STORAGE_DIR}/${this.author_id}`);
        }
        ['full','large','medium','small','tiny'].forEach(val => {
        if (!fs.existsSync(`${process.env.STORAGE_DIR}/${this.author_id}/${val}`)){
            fs.mkdirSync(`${process.env.STORAGE_DIR}/${this.author_id}/${val}`);
        }
        })
        var ext = 'jpg';
    var jp = sharp(file.path);
      await jp.toFile(
        `${process.env.STORAGE_DIR}/${this.author_id}/full/${this.id}.${ext}`,
      ); // save
      await jp.resize(2048, 2048, {fit: 'inside'}).toFile(
        `${process.env.STORAGE_DIR}/${this.author_id}/large/${this.id}.${ext}`,
      ); // save
      await jp.resize(1024, 1024, {fit: 'inside'}).toFile(
        `${process.env.STORAGE_DIR}/${this.author_id}/medium/${this.id}.${ext}`,
      ); // save
      await jp.resize(512, 512, {fit: 'inside'}).toFile(
        `${process.env.STORAGE_DIR}/${this.author_id}/small/${this.id}.${ext}`,
      ); // save
      await jp.resize(256, 256, {fit: 'inside'}).toFile(
        `${process.env.STORAGE_DIR}/${this.author_id}/tiny/${this.id}.${ext}`,
      ); // save
    }catch(err){
        console.error(err);
        throw err;
    }
  }

  async addToPortfolio(portfolio_id) {
    try {
      const pf = (await db('portfolios_images').insert({
        portfolio_id: portfolio_id,
        photo_id: this.id,
      }))[0];
      return pf;
    } catch (err) {
      console.error(err);
    }
  }

  getUserQuery() {
    return require('../db')('users').where({ id: this.author_id });
  }
}

require('./model')('photos', Photo);

module.exports = Photo;
