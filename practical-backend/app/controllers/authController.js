import User from "../models/user.js";
import dotenv from "dotenv";
import { generateAccessToken } from "../utils/jwtHelper.js";
import { createHash, match } from "../utils/helper.js";
dotenv.config();

class AuthController {
  registerUser = async (req, res) => {
    try {
      const { userName, password } = req.body;

      if (!userName || !password) {
        return res.status(404).json({ message: "Please provide User Name and password" });
      }

      const isUser = await User.findOne({ userName });
      if (isUser) {
        return res.status(404).json({ message: "User Name with this email is already registerd" });
      }
      const hashPassword = await createHash(password);
      const user = new User({
        userName,
        password: hashPassword,
      });
      await user.save();
      res.status(200).json(user);
    } catch (e) {
      res.status(500).json(e);
    }
  };

  loginUser = async (req, res) => {
    try {
      const { userName, password } = req.body;
      
      if (!userName || !password) {
        return res.status(404).json({ message: "Please provide User Name and password" });
      }

      const isUser = await User.findOne({ userName });
      if (!isUser) {
        return res.status(404).json({ message: "Email is not registerd" });
      }
      const passwordMatch = await match(isUser.password, password);

      if (!passwordMatch) {
        return res.status(404).json({ message: "Invalid Email or password" });
      }
      const token = await generateAccessToken(isUser.id);

      res.status(200).json({ accessToken: token });
    } catch (e) {
      res.status(500).json(e);
    }
  };
}

export default new AuthController();
