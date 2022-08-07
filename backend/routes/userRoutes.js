import express from "express";
import User from "../models/userModels.js";

const router = express.Router();

router.get("/createadmin", async (req, res) => {
  try {

    const user = new User({
      name: "Rafeeq",
      email: "rafeeqansari067@gmail.com",
      password: "1234",
      isAdmin: true
    });

    const newUser = await user.save();
    res.send(newUser)

  } catch (error) {
    res.send({ msg: error.message })
  }

})

export default router;