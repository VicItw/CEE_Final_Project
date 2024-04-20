import Group from "../models/groupModel.js";

export const getGroupRank = async (req, res) => { //ถ้าหาเจอ return json หาไม่เจอ return 400
    try {
        const rankedGroup = await Group.find().sort({ score: -1 }).limit(10);
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
