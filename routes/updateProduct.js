const Product =require('../models/Product');
const productSchema= require('../validation/updateProduct')

const updateProduct= async (productname,price,details,category) =>{
    try {
        const  parsedData = productSchema.safeParse({
            productname,
            price,
            details,
            category
        });

        if(!parsedData.success){
            console.log(parsedData.error);
            return{
                statusCode : 403,
                message    : "Validation error, Please enter valid input",
            }
        }

        const data=parsedData.data;
        
        const existingProduct = await Product.findOne({productname:data.productname});
        
        if(!existingProduct){
            return {
                statusCode : 400,
                message    : "Product does not exist",
            };
        }
        
        const productId=existingProduct._id;
    
        await Product.findByIdAndUpdate(productId,data , {new:true});

        return {
            statusCode : 201,
            message    : "Product updated succesfully"
        };

    } catch (error) {
        if(error ){
            console.log(error);
            return{
                statusCode : 400,
                message    : "Product updation failed, Please try again" 
            }
        }
        return{
            statusCode : 500,
            message    : "Internal server error"
        }
    }
}

module.exports=updateProduct;