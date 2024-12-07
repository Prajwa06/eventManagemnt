const z=require('zod');

const productSchema= z.object({
    productname : z.string(),
    price : z.string().optional(),
    details : z.string().optional(),
    category : z.string().optional(),
});
module.exports=productSchema;