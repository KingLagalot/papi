const _ = require('underscore');
const db = require('../db');

module.exports = (table_name, mType) => {
    if(!mType.create)
    mType.create = async function create(fields, ret_fields){
        try{
            const pf = (await db(table_name).insert(fields, ret_fields ? this.get_fields.concat(ret_fields) : this.get_fields))[0];
            return this.fromObject(pf); 
        }catch(err){
            console.error(err);
        }
    }
    if(!mType.get)
    mType.get = async function get(fields, ret_fields){
        var db_ret = await db(table_name).where(fields).first(ret_fields ? this.get_fields.concat(ret_fields) : this.get_fields);
        return db_ret ? this.fromObject(db_ret) : null;
    }
    if(!mType.update)
    mType.update = async function update(id, fields){
        if(Object.keys(fields).length != 0)
        var db_ret = await db(table_name).where({id: id}).update(fields);
        // returns id
        return db_ret;
    }
    if(!mType.remove)
    mType.remove = async function remove(id){
        var ret = await db(table_name).where({id: id}).del();
        return ret;
    }
    if(!mType.fromJSON)
    mType.fromJSON = function fromJSON(json){
        return this.fromObject(JSON.parse(json));
    }
    if(!mType.fromObject)
    mType.fromObject = function fromObject(obj){
        var _obj = new mType();
        for(const key in obj) {
            if( _obj.hasOwnProperty(key)){
                _obj[key] = obj[key];
            }
        }
        return _obj;
    }
}