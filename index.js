const express = require('express')
const satelize = require('satelize')
const cors = require('cors')
const axios = require('axios')
const { MongoClient, ServerApiVersion } = require('mongodb')
const app = express()
const port = process.env.PORT || 3000

app.use(cors({
  origin:'http://localhost:5500'
}
)) 
app.use(express.json())
//app.use(express.static('public'))

const uri = "mongodb+srv://infinitycloud:Rawlings004@infinitycloud.0vlqb7r.mongodb.net?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let collection;
 
app.get('/',async(req, res)=>{
  let ip = req.ip
  let state;
  satelize.satelize({ip:ip}, function(err, payload){
    state = payload.state.name
  })
  try{
    await client.connect(err => {
    console.log("MongoDB connected")
    const ids = client.db("forApp").collection("hospitals")
    ids.find({'reg':{'$eq':state}}).toArray((err, result)=> {
       res.jsonp(result)
    })
}); 
  }catch(ex){
    console.error(ex)
  }
  finally{
    await client.close()
  }
 // res.send('hi')
})

app.post('/data',async (req,res)=>{
  let region = req.body.reg
  try{
    await client.connect(err => {
    console.log("MongoDB connected")
    const ids = client.db("forApp").collection("hospitals")
    ids.find({'reg':{'$eq':region}}).toArray((err, result)=> {
      console.log(result);
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
app.listen(port,()=>{
  console.log(`app running on port ${port}`);
}) 