const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.listen(port) 

const uri = "mongodb+srv://infinitycloud:Rawlings004@infinitycloud.0vlqb7r.mongodb.net?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let collection;

app.post('/data',async (req,res)=>{
  let region = req.body.reg
  try{
    await client.connect(err => {
    console.log("MongoDB connected")
    const ids = client.db("forApp").collection("hospitals")
    ids.find({'reg':{'$eq':region}}).toArray(function(err, result) {
       res.jsonp(result)
    })
});
  }catch(ex){
    console.error(ex)
  }
  finally{
    await client.close()
  }
})

