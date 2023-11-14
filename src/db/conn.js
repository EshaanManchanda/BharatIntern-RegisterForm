const mongoos = require('mongoose');
const URI=process.env.MONGODB_URL;
mongoos.connect("mongodb://localhost:27017/BharatIntern",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
});
const db=mongoos.connection;

db.on('error',(err)=>{
    console.log("MongoDB error: "+err);
})
db.once('open',()=>{
    console.log("MongoDB connected");
});