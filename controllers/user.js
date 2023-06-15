
const User = require('../models/User')

const getUser =  async () =>{
    try {
        const {id} = req.params;
        const user = User.findById(id)
        res.status(200).send(user);
        
        
    } catch (error) {
        res.status(404).send({message: error.message})
        
    }
}



const getUserFriends = async () =>{

    try {
        const {id} = req.params;
        const user = await User.findById(id)


        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
              return { _id, firstName, lastName, occupation, location, picturePath };
            }
          );


          res.status(200).send(formattedFriends);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const addRemoveFriends = async (req, res) => {
    try {
      const { id, firedId } = req.params;
      const user = await User.findById(id);
      const friend = await User.findById(id);
      if (user.friends.includes(firedId)) {
        // for the friends id removing
        user.friends = user.friends.filter((id) => id !== firedId);
  
        // for the user id  and remove
        friend.friends = friend.friends.filter((id) => id !== id);
      }
  
      // not encluding adding in the friend lis
      else {
        user.friends.push(firedId);
        friend.friends.push(id);
      }
  
      await user.save();
      await friend.save();
  
      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
  
      const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return { _id, firstName, lastName, occupation, location, picturePath };
        }
      );
  
      res.status(200).send(formattedFriends);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };



  module.exports = { getUser, getUserFriends, addRemoveFriends };