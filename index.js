const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = 5000 || process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cifvw1u.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const postsCollection = client.db('ChitChat').collection('posts');
        const usersCollection = client.db('ChitChat').collection('users');

        app.get('/', (req,res) => {
            res.send('ChitChat is running');
        });

         /* Adding Posts */
         app.post('/posts', async (req, res) => {
            const body = req.body;
            const result = await postsCollection.insertOne(body);
            res.send(result);
        });

    }
    finally{

    }
}
run().catch(console.log);


app.get('/', async(req,res) => {
    res.send('chitchat server running');
})

app.listen(port,()=> console.log(`chitchat server running`));