import Vendor from "../../models/Vendor";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "GET") {
    try {
      let vendors = await Vendor.find({ userId: req.query.userId });
      res.status(200).json({ vendors });
    } catch (error) {
      res.status(500).json({ error: "Error fetching vendors" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);

