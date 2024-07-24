const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true,unique:true },
    description :{type: String, required: true},
    price:{type: Number, min:[1,'Wrong Min Price'],max:[10000,"Wrong Max Price"],required: true},
    discountPercentage:{type: Number,min:[1,'Wrong Min Discount'],max:[99,"Wrong Max Discount"], required: true},
    rating:{type: Number,min:[0,'Wrong Min Rating'],max:[5,"Wrong Max Rating"], default: 0},
    stock:{type: Number,min:[0,'Wrong Min Stock'], default: 0},
    brand:{type: String, required: true},
    category:{type: String, required: true},
    thumbnail:{type: String, required: true},
    images:{type: [String], required: true},
    deleted:{type: Boolean, required: false}
})

//this code is to conver _id generated in postman to id, removing _

const virtualId = productSchema.virtual("id")
virtualId.get(function(){
    return this._id;
})

productSchema.set('toJSON',{
virtuals:true,
versionKey:false,
transform:function(doc,ret){delete ret._id}

})

exports.Product = mongoose.model('Product',productSchema);