import Vendor from '../../models/Vendor';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
    if(req.method == 'DELETE'){
        await Vendor.findByIdAndDelete({_id: req.query.id});
        res.status(200).json({ deleted: "success" });
    }
    else{
        res.status(400).json({ error: "This method is not allowed" })
        
    }

}
export default connectDb(handler);