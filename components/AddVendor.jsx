import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

const AddVendor = () => {
  const [formData, setFormData] = useState({
    name: "",
    bankName: "",
    accNo: "",
    address1: "",
    address2: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const [inputError, setInputError] = useState({});
  const { data: session } = useSession();
  const userId = session?.userId;

  const handleChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setInputError({
      ...inputError,
      [name]: "",
    });
  };

  const validateInput = () => {
    const newErrors = {};
    if (formData.accNo.length !== 12) {
      newErrors.accNo = "Account number must be exactly 12 digits.";
    }
    if (formData.zipCode.length > 10) {
      newErrors.zipCode = "Zip code must be less than 10 digits.";
    }

    setInputError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      toast("Please fix the errors before submitting", { type: "error" });
      return;
    }

    // Add userId to formData
    const VendorPayload = {
      ...formData,
      userId,
    };

    // Send Data to Server
    AddNewVendor(VendorPayload);

    setFormData({
      name: "",
      bankName: "",
      accNo: "",
      address1: "",
      address2: "",
      city: "",
      zipCode: "",
      country: "",
    });
  };

  const AddNewVendor = async (formData) => {
    if(!userId) {
      toast("Please login to create a vendor", { type: "error" });
      return;
    }
    await fetch(`/api/addVendors`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.ok) {
          toast("Vendor created successfully", { type: "success" });
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
        toast("Sorry, could not create vendor", { type: "error" });
      });
  };

  return (
    <div className="max-w-2xl px-5 m-auto w-full mt-10">
      <div className="text-3xl mb-6 text-center ">Create New Vendor</div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">
          <div className="col-span-2 lg:col-span-1">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
              id="vendorName"
              placeholder="Vendor Name"
              required
            />
          </div>

          <div className="col-span-2 lg:col-span-1">
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
              id="bankName"
              placeholder="Bank Name"
              required
            />
          </div>

          <div className="col-span-2">
            <input
              type="number"
              name="accNo"
              value={formData.accNo}
              onChange={handleChange}
              className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
              id="accNumber"
              placeholder="Bank Account Number"
              required
            />
            {inputError.accNo && (
              <p className="text-red-500">{inputError.accNo}</p>
            )}
          </div>

          <div className="col-span-2">
            <input
              type="text"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
              id="address1"
              placeholder="Address Line 1"
              required
            />
          </div>

          <div className="col-span-2">
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
              id="address2"
              placeholder="Address Line 2"
            />
          </div>

          <div className="col-span-2 lg:col-span-1">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
              id="city"
              placeholder="City"
              required
            />
          </div>

          <div className="col-span-2 lg:col-span-1">
            <input
              type="number"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
              id="zip"
              placeholder="ZipCode"
              required
            />
            {inputError.zipCode && (
              <p className="text-red-500">{inputError.zipCode}</p>
            )}
          </div>

          <div className="col-span-2">
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
              id="country"
              placeholder="Country"
              required
            />
          </div>

          <div className="col-span-2 text-right">
            <button
              className="py-3 px-6 rounded-md bg-green-500 text-white font-bold w-full sm:w-32"
              type="submit"
            >
              CREATE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddVendor;
