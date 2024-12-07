const {productSchema }= require('../validation/addProduct');
const Product =require('../models/Product');


const addProduct = async(productname,price,details,category)=>{
    try {
       

        const  parsedData = productSchema.safeParse({
            productname,
            price,
            details,
            category,
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

        if(existingProduct){
            return {
                statusCode : 400,
                message    : "Product already exist",
            };
        }

        // add product 
        const newProduct = new Product({
            productname: data.productname,
            price : parseInt(data.price),
            details : data.details,
            category : data.category,
        });

        await newProduct.save();

        return {
            statusCode : 201,
            message    : "Product added succesfully"
        };

    } catch (error) {
        if(error ){
            console.log(error);
            return{
                statusCode : 400,
                message    : "Product addition failed, Please try again" 
            }
        }
        return{
            statusCode : 500,
            message    : "Internal server error"
        }
    }
}

module.exports=addProduct;

