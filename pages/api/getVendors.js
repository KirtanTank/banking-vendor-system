import Vendor from '../../models/Vendor';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
    let vendors = await Vendor.find();
    console.log(vendors);
    res.status(200).json({ vendors })
}

export default connectDb(handler);
  