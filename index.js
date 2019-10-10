const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');

const url= 'mongodb://localhost:27017/';
const dbname='GoodGoing';

const dboper=require('./operation');

MongoClient.connect(url,(err,client)=>{

    assert.equal(err,null);

    console.log("Connected with Mongo Server Sucessfully");

    const db=client.db(dbname);
    const collection=db.collection('ls');

    dboper.insertDocument(db,{name:"Gaurang",description:"Raju bhandari"},"ls",(result)=>{
        console.log("Insert",result.ops);

        dboper.findDocument(db,'ls',(docs)=>{
            console.log('Found Doc',docs);

            dboper.updateDocument(db, { name: "Gaurang" },
                    { description: "Updated Test" }, "ls",
                    (result) => {
                        console.log("Updated Document:\n", result.result);

                        dboper.findDocument(db, "ls", (docs) => {
                            console.log("Found Updated Documents:\n", docs);
                            
                            db.dropCollection("ls", (result) => {
                                console.log("Dropped Collection: ", result);

                                client.close();
                            });
                        });
                    });
        });
    });
    
    });