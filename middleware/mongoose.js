import mongoose from "mongoose";

const connectDb = handler => async (req, res) => {
    if(mongoose.connections[0].readyState){
        return handler(req, res);
    }
    await mongoose.connect("mongodb://127.0.0.1/MyVendorData", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return handler(req, res);
}
mongoose.disconnect();
export default connectDb;