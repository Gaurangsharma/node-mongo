const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');

const url= 'mongodb://localhost:27017/';
const dbname='conFusion';

MongoClient.connect(url,(err,client)=>{

    assert.equal(err,null);

    console.log("Connected with Mongo Server Sucessfully");

    const db=client.db(dbname);
    const collection=db.collection('dishes');

    collection.insertOne({
         "name":"Gujia",
         "description":"On Diwali Available"},(err,result)=>{
            assert.equal(err,null);  

            console.log("Insertion done:"+result.ops);

            collection.find({}).toArray((err,docs)=>{
                assert.equal(err,null);
             
                console.log("Found done:"+docs);

                db.dropCollection('dishes',(err,result)=>{
                    assert.equal(err,null);
                    client.close();
                });
            });
         });
});