import Vendor from '../../models/Vendor';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
    let vendors = await Vendor.find();
    res.status(200).json({ vendors })
}
mongoose.disconnect();
export default connectDb(handler);
  