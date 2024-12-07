const express =require ('express');
const app=express();
require('dotenv').config();
const cors=require('cors');
const port=process.env.port || 3000;
const date=new Date();
const connectDB=require('./middleware/connectDB');
const authenticateToken =require('./middleware/authRoutes');
const login=require('./api/login');
const register=require('./api/register')
const addProduct=require('./api/addProduct');
const getProducts = require('./api/getProducts');
const deleteProduct =require('./api/deleteProduct');
const updateProduct = require('./api/updateProduct');
connectDB().catch(console.dir);;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/register",register);

app.post("/login",login);

app.post('/addProduct',authenticateToken,addProduct);

app.post('/deleteProduct', authenticateToken, deleteProduct);

app.put('/updateProduct', authenticateToken, updateProduct);

app.get('/getProducts',getProducts);


app.listen(port,()=>{
    console.log("App is running on port at "+date.toLocaleString());
});



