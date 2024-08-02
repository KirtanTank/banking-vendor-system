import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditVendorModal = ({
  setShowEditVendorModal,
  _id,
  accNo,
  address1,
  address2,
  bankName,
  city,
  country,
  name,
  zipCode,
  setAccNo,
  setAddress1,
  setAddress2,
  setBankName,
  setCity,
  setCountry,
  setName,
  setZipCode,
  updatedDetailsOfVendors,
  fetchVendors
}) => {
  const closeModal = () => {
    setShowEditVendorModal(false);
    updatedDetailsOfVendors = [];
  };
  const updateVendor = async (e) => {
    const newPayload = {
      _id,
      accNo,
      address1,
      address2,
      bankName,
      city,
      country,
      name,
      zipCode,
    };

    //Update Request
    await fetch(`/api/updateVendors`, {
      method: "POST",
      body: JSON.stringify(newPayload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res) {
          toast("Vendor updated Successfully", { type: "success" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast("Sorry, could not update", { type: "error" });
      });
    setShowEditVendorModal(false);
    fetchVendors();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        {updatedDetailsOfVendors.map((ele) => {
          return (
            <div
              key={ele._id}
              className="max-w-2xl bg-blue-700 px-5 m-auto w-fit p-5 rounded-lg"
            >
              <div className="text-3xl mb-6 text-center text-white">
                Edit Vendor Details
              </div>
              <form>
                <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">
                  <div className="col-span-2 lg:col-span-1">
                    <input
                      type="text"
                      className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
                      id="vendorName"
                      placeholder="Vendor Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <input
                      type="text"
                      className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
                      id="bankName"
                      placeholder="Bank Name"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <input
                      type="number"
                      cols="30"
                      rows="8"
                      className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
                      id="accNumber"
                      placeholder="Bank Account Number"
                      value={accNo}
                      onChange={(e) => setAccNo(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <input
                      cols="30"
                      rows="8"
                      className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
                      id="address1"
                      placeholder="Address Line 1"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <input
                      cols="30"
                      rows="8"
                      className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
                      id="address2"
                      placeholder="Address Line 2"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <input
                      type="text"
                      className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
                      id="city"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <input
                      type="number"
                      className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
                      id="zip"
                      placeholder="ZipCode"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <input
                      cols="30"
                      rows="8"
                      className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
                      id="country"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-span-2"></div>
                  <div className="col-span-2 lg:col-span-1">
                    <button
                      type="button"
                      className="py-3 px-6 rounded-md bg-green-500 text-white font-bold w-full sm:w-32"
                      onClick={() => closeModal()}
                    >
                      CANCEL
                    </button>
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <button
                      type="button"
                      className="py-3 px-6 rounded-md bg-green-500 text-white font-bold w-full sm:w-32"
                      onClick={() => updateVendor()}
                    >
                      EDIT
                    </button>
                  </div>
                </div>
              </form>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EditVendorModal;
