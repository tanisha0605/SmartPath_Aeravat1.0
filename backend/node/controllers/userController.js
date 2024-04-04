const User = require('./../models/userModel');
const  catchAsync = require('./../utils/catchAsync');

exports.getUser = catchAsync(async (req,res,next) =>{
    const user = await User.findOne({email: req.params.email});
    res.status(200).json({
         status: 'success',
         user: user
    }); 
  })

exports.updateUser = catchAsync(async (req, res, next) => { 
    console.log(req.params.email)
    console.log(req.body)
    const updatedUser = await User.findOneAndUpdate({"email":req.params.email}, req.body, {
      new: false,
      runValidators: true
    });
  
    res.status(200).json({
      status: 'success',
      user: updatedUser
    });
});

exports.createUser = catchAsync(async (req, res, next) => { 
    const user = await User.create(req.body);
     res.status(200).json({
         status: 'success',
         user: user
     });
});

