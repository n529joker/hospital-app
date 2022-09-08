const express = require('express')
const cors = require('cors')
const axios = require('axios')
const { MongoClient, ServerApiVersion } = require('mongodb')
const app = express()
const port = process.env.PORT || 3000

app.use(cors()) 
app.use(express.json())
//app.use(express.static('public'))

var collection;
const uri = "mongodb+srv://infinitycloud:Rawlings004@infinitycloud.0vlqb7r.mongodb.net?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.listen(port,()=>{console.log(`app running on port ${port}`)}) 

app.get('/',()=>{console.log('connected')})

app.get('/fdata',async (req,res)=>{
  try{
    await client.connect(err => {
    const ids = client.db("forApp").collection("hospitals")
    ids.find({'reg':{'$eq':'Littoral'}}).toArray((err, result)=> {
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

// app.post('/data',async (req,res)=>{
//   let Region = req.body.reg.region
//   try{
//     await client.connect(err => {
//     const ids = client.db("forApp").collection("hospitals")
//     ids.find({'reg':{'$eq':Region}}).toArray((err, result)=> {
//       console.log(result)
//        res.jsonp(result)
//     })
// });
//   }catch(ex){
//     console.error(ex)
//   }
//   finally{
//     await client.close()
//   }
// })



