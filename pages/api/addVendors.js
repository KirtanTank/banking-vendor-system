import Vendor from '../../models/Vendor';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
    if(req.method == 'POST'){
        let v = new Vendor(req.body);
        await v.save();
        res.status(200).json({ success: "success" })
    }
    else{
        res.status(400).json({ error: "This method is not allowed" })
        
    }

}

export default connectDb(handler);