const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

 
const validateTicketPrice = async (req, res) => {
 const {id} = req.params
 const {ticketPrice} = req.body
 try{
  const user = User.findById(id)
  if(ticketPrice <= user.balance){
    user.balance -= ticketPrice
    return res.status(StatusCodes.OK).json({message:'Ticket bought'})
  }else{
    return res.status(StatusCodes.BAD_REQUEST).json({message:'Ticket price is more than current balance'})

  }
 }catch(error){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Server error!'})
 }
};

module.exports = {
 validateTicketPrice
}
