const Product =require('../models/Product');
const z=require('zod');

const productSchema = z.object({
    productname:z.string(),
});

const deleteProduct= async (productname) =>{
    try {
        const  parsedData = productSchema.safeParse({
            productname
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

        await Product.deleteOne({ productname: productname });

        return {
            statusCode : 201,
            message    : "Product deleted succesfully"
        };

    } catch (error) {
        if(error ){
            console.log(error);
            return{
                statusCode : 400,
                message    : "Product deletion failed, Please try again" 
            }
        }
        return{
            statusCode : 500,
            message    : "Internal server error"
        }
    }
}

module.exports=deleteProduct;