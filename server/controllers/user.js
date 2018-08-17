const User = require('../models/user');
const MongooseHelpers = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev')

exports.auth = function(req, res){
    const { email, password} = req.body;

    if(!password || !email){
        return res.status(422).send({errors: [{title: 'Data missing', details: 'Provide Email and Password'}]})
    }

    User.findOne({email}, function(err, user){
        if(err){
            return res.status(422).send({errors: MongooseHelpers.normalizeErrors(err.errors)})
        }

        if(!user){
            return res.status(422).send({errors: [{title: 'inValid User', details: 'User does not exist'}]})
        }

        if(user.hasSamePassword(password)){
            const token = jwt.sign({
                userId: user.id,
                username: user.username
              }, config.SECRET, { expiresIn: '1h' });
            
              return res.json(token);

        }else{
            return res.status(422).send({errors: [{title: 'Wrong Data', details: 'Wrong Email or Password'}]})
        }
     
    })
}


exports.register = function(req, res){
  const {username, email, password, passwordConfirmation} = req.body;
  
  if(!password || !username){
   return res.status(422).send({errors: [{title: 'Data missing', details: 'Provide Email and Password'}]})
  }

  if(password !== passwordConfirmation){
    return res.status(422).send({errors: [{title: 'Invalid Password', details: 'Password not same as confirmation Password'}]})
  }

  User.findOne({username: username}, (err, existingUser)=>{

    if(err){
       return res.status(422).send({errors: MongooseHelpers.normalizeErrors(err.errors)})
    }

    if(existingUser){
       return res.status(422).send({error: "User exists"})
    }

    const user = new User({
        username,
        email,
        password
    })

    user.save(function(err){
        if(err){
           return res.status(422).send({errors: MongooseHelpers.normalizeErrors(err.errors)})
        }
        return res.json({'registered': true})
    })
  })
 // res.json({username, email})
}

exports.authMiddleware = function(req, res, next){
    const token = req.headers.authorization;

    if(token){
        const user = parseToken(token);
        User.findById(user.userId, function(err, user){
            if(err){
                return res.status(422).send({errors: MongooseHelpers.normalizeErrors(err.errors)})
             }
             if(user){
                 res.locals.user = user;
                 next();
             }else{
                return notAuthorized(res)
            }
        })
    }
    else{
        return notAuthorized(res);
    }
}

function parseToken(token){
    return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res){
    return  res.status(401).send({errors: [{title: 'Not Authorized', details: 'You need to login to get Access'}]})
}