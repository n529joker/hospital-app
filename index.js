const express = require('express')
const cors = require('cors')
const axios = require('axios')
const { MongoClient, ServerApiVersion } = require('mongodb')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
//app.use(express.static('public'))

const uri = "mongodb+srv://infinitycloud:Rawlings004@infinitycloud.0vlqb7r.mongodb.net?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let collection;

async function fetchData(data){
  try{
    await client.connect(err => {
    console.log("MongoDB connected")
    const ids = client.db("forApp").collection("hospitals")
    ids.find({'reg':{'$eq':data}}).toArray((err, result)=> {
      console.log(result);
       res.send('result')
    })
});
  }catch(ex){
    console.error(ex)
  }
  finally{
    await client.close()
  }
}

app.listen(port, console.log('Live')) 
app.get('/',async(req, res)=>{
  let data = await axios('https://api.geoapify.com/v1/ipinfo?&apiKey=2fe3fe325ed9460fa19f7cfc7b771676')
  let fdata = await data.data
  fetchData(fdata.state.name)
})

app.post('/data',async (req,res)=>{
  let region = req.body.reg
  fetchData(region)
})
