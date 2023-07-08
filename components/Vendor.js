import { useState } from "react";

const VendorComp = () => {

    const [name, setName] = useState("");
    const [bankName, setBankName] = useState("");
    const [accNo, setAccNo] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const VendorPayload = {
            accNo,
            address1,
            address2,
            bankName,
            city,
            country,
            name,
            zipCode
        }
        // console.log(VendorPayload);
        // Send Data to Server
        await fetch(`https://banking-vendor-system.vercel.app/api/addVendors`, {
            method: 'POST',
            body: JSON.stringify(VendorPayload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((res) => {
            console.log('success: '+ res);
          }).catch((err) => {
            console.log('error: '+ err);
          });
        setAccNo("")
        setAddress1("")
        setAddress2("")
        setBankName("")
        setCity("")
        setCountry("")
        setName("")
        setZipCode("")
    }

    return (
        <div className="max-w-2xl bg-white px-5 m-auto w-full mt-10">
            <div className="text-3xl mb-6 text-center ">Create New Vendor</div>
            <form>
                <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">

                    <div className="col-span-2 lg:col-span-1">
                        <input type="text" value={name} onChange={({ target }) => setName(target.value)} className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="vendorName" placeholder="Vendor Name" required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <input type="text" value={bankName} onChange={({ target }) => setBankName(target.value)} className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="bankName" placeholder="Bank Name" required />
                    </div>

                    <div className="col-span-2">
                        <input type="number" value={accNo} onChange={({ target }) => setAccNo(target.value)} cols="30" rows="8" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="accNumber" placeholder="Bank Account Number" required />
                    </div>

                    <div className="col-span-2">
                        <input cols="30" rows="8" value={address1} onChange={({ target }) => setAddress1(target.value)} className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="address1" placeholder="Address Line 1" required />
                    </div>

                    <div className="col-span-2">
                        <input cols="30" rows="8" value={address2} onChange={({ target }) => setAddress2(target.value)} className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="address2" placeholder="Address Line 2" />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <input type="text" value={city} onChange={({ target }) => setCity(target.value)} className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="city" placeholder="City" required />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <input type="number" value={zipCode} onChange={({ target }) => setZipCode(target.value)} className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="zip" placeholder="ZipCode" required />
                    </div>

                    <div className="col-span-2">
                        <input cols="30" rows="8" value={country} onChange={({ target }) => setCountry(target.value)} className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="country" placeholder="Country" required />
                    </div>

                    <div className="col-span-2 text-right">
                        <button className="py-3 px-6  rounded-md bg-green-500 text-white font-bold w-full sm:w-32" type="submit" onClick={handleSubmit}>CREATE</button>
                    </div>
                </div>
            </form>

        </div>
    );
}

export default VendorComp;