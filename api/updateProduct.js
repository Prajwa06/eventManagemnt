const update = require('../routes/updateProduct');
const updateProduct = async (request,response) =>{
    const {productname,details,price,category}=request.body; 
    const output=await update(productname,price,details,category);
    response.status(output.statusCode).json({message :output.message})
}

module.exports=updateProduct;