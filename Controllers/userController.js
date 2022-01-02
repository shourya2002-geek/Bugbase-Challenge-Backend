const Users = require("../models/userModel");

const registerUser = async (req, res, next) => {
  const { name, username } = req.body;

  try {
    if (!name || typeof name !== "string") {
      return res.json({ status: "error", error: "Invalid Name" });
    }
    const user = await Users.findOne({ username }).lean();
    if (user) {
      console.log(user);
      return res.json({ status: "error", error: "Username already exists" });
    }

    const response = await Users.create({
      name,
      username,
    });
    return res.json({
      status: "Successfully created the user!",
      error: "",
      response: response,
    });
  } catch (error) {
    throw error;
  }
};

const filterUsers = async (req, res, next) => {
  const keyword = req.params["username"];
  console.log(keyword);

  try {
    const users = await Users.find();
    var filteredUsers = [];

    users.map((ele) => {
      if (ele.username == keyword) {
        filteredUsers.push(ele.name);
      } else if (ele.username.includes(keyword) == true) {
        filteredUsers.push(ele.name);
      }
    });

    return res.json({
      status: "success",
      error: "",
      response: filteredUsers,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { registerUser, filterUsers };
