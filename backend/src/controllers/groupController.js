import Group from "../models/groupModel.js";
import User from "../models/userModel.js";
export const getGroupRank = async (req, res) => { //ถ้าหาเจอ return json หาไม่เจอ return 400
    try {
        const rankedGroup = await Group.find({}, { group: 1, score: 1 }).sort({ score: -1 }).limit(100);
        res.status(200).json(rankedGroup)
      }
      catch (err) {
        res.status(500).json({ error: "Internal server error." });
      }
}
export const createGroup = async (req, res) => { //ถ้าหาเจอ return json หาไม่เจอ return 400
  
    const newUser = new Group(req.body);
    await newUser.save();
    res.status(200).json({ message: "OK" });
  
};

export const getRankInGroup = async (req, res) => {
    
    const top = await User.find({group : req.params.group}, { name: 1, score: 1 }).sort({ score: -1 }).limit(100);
    res.status(200).json(top);

}