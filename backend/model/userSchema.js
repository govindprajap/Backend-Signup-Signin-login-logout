const mongoose = require("mongoose")
const {Schema} = mongoose;
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = new Schema({
    name:{
        type: String,
        require:[true, "name is required"],
        minLength: [5, "min length is five character"],
        maxlength: [20, "max length should be twenty character"],
        trim: true
    },
    email:{
        type: String,
        require:[true, "Email is required"],
        unique: true,
        lowercase:true,
        unique: [true, "Already Email is register"]
    },
    password:{
        type: String,
        select: false
    },
    forgetPasswordToken:{
        type: String

    },
    forgetPasswordExpiryDate:{
        type: Date
    }
        

},{
    timestamps: true
});
userSchema.pre('save',async function(){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10);
    return next()
})
userSchema.methods = {
    jwtToken(){
        return JWT.sign(
            {id: this._id, email: this.email},
            process.env.SECRET,
            {expiresIn:'24h'}
        )
    }
}
const userModel = mongoose.model('user', userSchema)
module.exports = userModel;