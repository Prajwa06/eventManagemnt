const z=require('zod');

const userRegistrationSchema =z.object({
    username : z.string().min('username must be at least 3 characters long'),
    email : z.string().email('Invalid email format'),
    password: z.string().min(6,'Password must be atleast 6 characters long')
});

module.exports= {userRegistrationSchema} ;