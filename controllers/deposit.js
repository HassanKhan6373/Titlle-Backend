const StatusCodes = require('http-status-codes')
const User = require('../models/User')
const deposit = async(req,res)=>{
    const {id} = req.params
    const {depositAmount} = req.body
    try{
        const user = await User.findByIdAndUpdate(id)
        user.balance+=depositAmount
        user.save()
        res.status(StatusCodes.OK).json({message:"Desposit successful",user})
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Deposit unsuccessful"})
    }
}

module.exports = {
    deposit
}