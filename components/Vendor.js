import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VendorComp = () => {
  const [name, setName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accNo, setAccNo] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [inputError, setInputError] = useState({});

  const validateInput = () => {
    const newErrors = {};
    if (accNo.length !== 12) {
      newErrors.accNo = "Account number must be exactly 12 digits.";
    }
    if (zipCode.length > 10) {
      newErrors.zipCode = "Zip code must be less than 10 digits.";
    }

    setInputError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      toast("Please fix the inputError before submitting", { type: "error" });
      return;
    }

    const VendorPayload = {
      accNo,
      address1,
      address2,
      bankName,
      city,
      country,
      name,
      zipCode,
    };

    // Send Data to Server
    await fetch(`/api/addVendors`, {
      method: "POST",
      body: JSON.stringify(VendorPayload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res) {
          toast("Vendor created successfully", { type: "success" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast("Sorry, could not create", { type: "error" });
      });
    setAccNo("");
    setAddress1("");
    setAddress2("");
    setBankName("");
    setCity("");
    setCountry("");
    setName("");
    setZipCode("");
  };

  return (
    <div className="max-w-2xl bg-white px-5 m-auto w-full mt-10">
      <div className="text-3xl mb-6 text-center ">Create New Vendor</div>
      <form>
        <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">
          <div className="col-span-2 lg:col-span-1">
            <input
              type="text"
              value={name}
              onChange={({ target }) => setName(target.value)}
              className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
              id="vendorName"
              placeholder="Vendor Name"
              required
            />
          </div>

          <div className="col-span-2 lg:col-span-1">
            <input
              type="text"
              value={bankName}
              onChange={({ target }) => setBankName(target.value)}
              className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
              id="bankName"
              placeholder="Bank Name"
              required
            />
          </div>

          <div className="col-span-2">
            <input
              type="number"
              value={accNo}
              onChange={({ target }) => {
                setAccNo(target.value);
                setInputError({ ...inputError, accNo: "" });
              }}
              cols="30"
              rows="8"
              className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
              id="accNumber"
              placeholder="Bank Account Number"
              required
            />
            <span>
              {inputError.accNo && (
                <p className="text-red-500">{inputError.accNo}</p>
              )}
            </span>
          </div>

          <div className="col-span-2">
            <input
              type="text"
              cols="30"
              rows="8"
              value={address1}
              onChange={({ target }) => setAddress1(target.value)}
              className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
              id="address1"
              placeholder="Address Line 1"
              required
            />
          </div>

          <div className="col-span-2">
            <input
              type="text"
              cols="30"
              rows="8"
              value={address2}
              onChange={({ target }) => setAddress2(target.value)}
              className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
              id="address2"
              placeholder="Address Line 2"
            />
          </div>

          <div className="col-span-2 lg:col-span-1">
            <input
              type="text"
              value={city}
              onChange={({ target }) => setCity(target.value)}
              className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
              id="city"
              placeholder="City"
              required
            />
          </div>

          <div className="col-span-2 lg:col-span-1">
            <input
              type="number"
              value={zipCode}
              onChange={({ target }) => {
                setZipCode(target.value);
                setInputError({ ...inputError, zipCode: "" });
              }}
              className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
              id="zip"
              placeholder="ZipCode"
              required
            />
            <span>
              {inputError.zipCode && (
                <p className="text-red-500">{inputError.zipCode}</p>
              )}
            </span>
          </div>

          <div className="col-span-2">
            <input
              type="text"
              cols="30"
              rows="8"
              value={country}
              onChange={({ target }) => setCountry(target.value)}
              className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
              id="country"
              placeholder="Country"
              required
            />
          </div>

          <div className="col-span-2 text-right">
            <button
              className="py-3 px-6  rounded-md bg-green-500 text-white font-bold w-full sm:w-32"
              type="submit"
              onClick={handleSubmit}
            >
              CREATE
            </button>
          </div>
        </div>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </div>
  );
};

export default VendorComp;
