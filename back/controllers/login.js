import dotenv from "dotenv";
import UserModel from "../Models/user.model.js"
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

// request user model with form datas to find the account
export async function Login (req, res){
  
  const {APP_SECRET, FRONTEND_URL} = process.env;
  const { email, password } = req.body;

  try {

    const user = await UserModel.find({email});
    const match = await bcrypt.compare(password, user[0].password)

    if (match) {
      const token = jsonwebtoken.sign(
        {email, role: user[0].isAdmin ? "admin" : "user"},
        APP_SECRET,
        {expiresIn: '24h'}
      )
      req.session.token = token;
      req.session.role = user[0].isAdmin ? "admin" : "user";
      req.session.email = req.body.email;
      req.session.firstname = user[0].firstname;
      req.session.lastname= user[0].lastname;

      res.status(200).json({
        "status": true,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': FRONTEND_URL,
        token: JSON.stringify(token),
        firstname: user[0].firstname,
        lastname: user[0].lastname,
        message: "You are logged in"
      });
    }
    else {
      res.status(404).json({
        'Content-Type': 'application/json',
        "status": false,
        message: 'User not found',
        location: '/login'
      });
    }
  } catch (error) {
      console.log(`Login
       error: ${error.message}`);
  }
}