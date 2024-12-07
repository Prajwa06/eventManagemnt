const deletes = require('../routes/deleteProduct');
const deleteProduct = async (request,response) =>{
    const {productname}=request.body;
    const output=await deletes(productname);
    response.status(output.statusCode).json({message :output.message})
}

module.exports=deleteProduct;