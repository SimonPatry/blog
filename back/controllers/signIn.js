import UserModel from "../Models/user.model.js"
import { userExists } from "../middlewares/authentification.js";

export const SignIn = async (req, res) => {
  const { FRONTEND_URL } = process.env; 
  const {
    email,
    firstname, 
    lastname, 
    password,
    photo
  } = req.body;
  console.log(req.body)
  try {
      const user = await userExists(email);
      if (user){
        res.status(302).json({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': FRONTEND_URL,
          "status": false,
          message: 'User already exists',
        });
      }
      else {
        await UserModel.create({
          email,
          firstname, 
          lastname, 
          password,
          photo,
          isAdmin: false
        });
        console.log(`User ${firstname} ${lastname} has been added!\n`);
        res.status(200).json({
          "status": true,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': FRONTEND_URL,
        });
      }
  } catch (error) {
      console.log(`Error: ${error.message}`);
  }
}