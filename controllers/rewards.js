const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const getUserVIPLevel = async (req,res)=>{
    const userId = req.params.userID
try{
    const user = await User.findById(userId)
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
      }
    return res.status(StatusCodes.OK).json({VIPLevel:user.VIP})
    
}catch(error){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'message':'Server error'})
}
}
const getUserPoints = async (req,res)=>{
    const userId = req.params.userID
    try{
        const user = await User.findById(userId)
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
          }
        return res.status(StatusCodes.OK).json({points:user.points})
        
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'message':'Server error'})
    }
}

const getUserBalance = async (req,res)=>{
    const userId = req.params.userID
    try{
        const user = await User.findById(userId)
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
          }
        return res.status(StatusCodes.OK).json({balance:user.balance})
        
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'message':'Server error'})
    }
}
module.exports = {
    getUserPoints,
    getUserVIPLevel,
    getUserBalance
}