const mongoose =require('mongoose');


const Productschema = new mongoose.Schema({
    productname : {type : String , required: true, unique : true},
    price : {type :Number, required : true},
    details : {type : String},
    category : {type : String}
})

module.exports= mongoose.model('Product',Productschema);