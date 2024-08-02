import Vendor from "../../models/Vendor";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "GET") {
    let vendors = await Vendor.find();
    res.status(200).json({ vendors });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
