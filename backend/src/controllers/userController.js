import User from "../models/userModel.js";

export const getUser = async (req, res) => {
  const user = await User.find({name: req.body.name});

  res.status(200).json(user);
};

export const getRank = async (req, res) => {
  const rankedUser = await User.find({ $sort: { score: 1 } }, { $limit: 10 });

  res.status(200).json(rankedUser)

}

export const getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
};

export const updateScore = async (req, res) => {

  try {
    const user = await User.update({name: req.body.name} , {$set: {score : req.body.score} } );

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json({ message: "OK" });

  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};
