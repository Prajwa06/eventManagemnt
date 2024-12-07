const z=require('zod');

const getProductSchema= z.object({
    productname : z.string(),
});
module.exports={getProductSchema};