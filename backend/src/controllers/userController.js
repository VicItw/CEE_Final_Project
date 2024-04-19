import User from "../models/userModel.js";

export const getUser = async (req, res) => { //ถ้าหาเจอ return json หาไม่เจอ return 400
  const user = await User.find({name: req.params.user});
  if(user.length === 0){
    res.status(400).json({error : "This Username is not available"});
  }
  else res.status(200).json(user);
};


export const getRank = async (req, res) => {
  try {
    const rankedUser = await User.find().sort({ score: -1 }).limit(5);
    res.status(200).json(rankedUser)
  }
  catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
}

export const updateScore = async (req, res) => {
  try {
    const user = await User.updateOne({name: req.body.name} , {$set: {score : req.body.score} } );
    res.status(200).json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
};

export const createUser = async (req, res) => {
    const user = await User.find({name : req.body.name});
    if(user.length > 0){
      res.status(401).json({error : "This Username is available"});
    }
    else{
      const newUser = new User(req.body);
      await newUser.save();
      res.status(200).json({ message: "OK" });
    }
};


export const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};