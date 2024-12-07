const get = require('../routes/getProducts');

const getProducts = async (request,response)=> {
    const {category,minPrice,maxPrice}=request.query;
    const output=await get(category,minPrice,maxPrice);
    response.status(output.statusCode).json(output.data? {data:output.data, message: output.message} : {message :output.message})
}

module.exports =getProducts;