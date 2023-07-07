const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
    accNo: {
        type: String, 
        required:true,
        unique: true
    },
    address1: {
        type: String, 
        required:true
    },
    address2: {
        type: String, 
    },
    bankName: {
        type: String, 
        required:true
    },
    city: {
        type: String, 
        required:true
    },
    country: {
        type: String, 
        required:true
    },
    name: {
        type: String, 
        required:true
    },
    zipCode: {
        type: String, 
        required:true
    },
}, {timestamps: true});

mongoose.models = {}
export default mongoose.model("Vendor", VendorSchema);