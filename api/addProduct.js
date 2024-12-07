const add = require('../routes/addProduct');

const addProduct = async (request,response)=> {
    const {productname, price, details, category}=request.body;
    const output=await add(productname,price,details,category);
    response.status(output.statusCode).json({message :output.message})
}

module.exports =addProduct;