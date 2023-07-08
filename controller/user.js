const express = require('express');
const dbName = "Nerve-Sparks";
const url = "mongodb+srv://manishankarkumar789:mani@cluster0.vgopnh9.mongodb.net/";

 const getAllCars = async(req,res)=>{
    try {
        const client = new MongoClient(url);
        await client.connect();

        const db = client.db(dbName);
        const result = await db.collection('cars').find().toArray((err,result)=>{
           return res.send(result)
        })
        return res.send(result)
  
   } catch (error) {
      console.log(error);
   }
}

module.exports = getAllCars
