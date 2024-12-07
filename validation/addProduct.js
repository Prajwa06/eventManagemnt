const z=require('zod');

const productSchema= z.object({
    productname : z.string(),
    price : z.string(),
    details : z.string(),
    category : z.string()
});

module.exports={productSchema};