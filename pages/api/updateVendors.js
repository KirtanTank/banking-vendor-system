import Vendor from '../../models/Vendor';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
    if(req.method == 'POST'){
        let v = await Vendor.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json({ updated: "success" })
    }
    else{
        res.status(400).json({ error: "This method is not allowed" })
        
    }

}
export default connectDb(handler);
  