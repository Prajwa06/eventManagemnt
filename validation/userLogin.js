const z=require('zod');

const userLoginSchema =z.object({
    username : z.string().min('username must be at least 3 characters long'),
    password: z.string().min(6,'Password must be atleast 6 characters long')
});

module.exports= {userLoginSchema} ;