import UserModel from "../Models/user.model.js"
import { userExists } from "../middlewares/authentification.js";

export const SignIn = async (req, res) => {
  const { FRONTEND_URL } = process.env; 
  const {
    gender,
    firstname, 
    lastname, 
    password,
    email,
    phone,
    birthdate,
    city,
    country,
    photo,
    category
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
          gender,
          category,
          firstname, 
          lastname, 
          email,
          password,
          phone,
          birthdate,
          city,
          country,
          photo,
          
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