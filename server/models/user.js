const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   username:  {
       type: String,
       min: [4, 'Too short, min is 4 characters'],
       max: [32, 'Too long, max is 32 characters']
   },
   email: {
       type: String,
       min: [4, 'Too short, min is 4 characters'],
       max: [32, 'Too long, max is 32 characters'],
       unique: true,
       lowercase: true,
       required: "Email is required",
       match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
   },
   password:{
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters'],
    required: "Password is required" 
   },
   rentals: [{type: Schema.Types.ObjectId, ref: 'Rental'}],
   bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}]
});

userSchema.methods.hasSamePassword = function(requestedPassword){
    return bcrypt.compareSync(requestedPassword, this.password)
}

userSchema.pre('save', function(next){
   // const user = this;
   // console.log(this)
    bcrypt.genSalt(10, (err, salt)=>{
     //   console.log(this)
       bcrypt.hash(this.password, salt, (err, hash)=>{
       //    console.log(this)
           this.password = hash;
           next();
       })
    })
})

module.exports = mongoose.model('User', userSchema);