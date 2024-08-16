import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const EditVendorModal = ({
  setShowEditVendorModal,
  showEditVendorModal,
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
      <Dialog
        open={showEditVendorModal}
        onClose={setShowEditVendorModal}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-950 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h1"
                      className="font-semibold text-3xl text-gray-900 underline underline-offset-8 justify-center text-center py-3"
                    >
                      Update Vendor
                    </DialogTitle>
                    <div className="mt-2">
                      {updatedDetailsOfVendors.map((ele) => {
                        return (
                          <div
                            key={ele._id}
                          >
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
                                    onChange={(e) =>
                                      setBankName(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                      setAddress1(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                      setAddress2(e.target.value)
                                    }
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

                              </div>
                            </form>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => updateVendor()}
                  className="inline-flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-900 sm:ml-3 sm:w-auto"
                >
                  Edit
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => closeModal()}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default EditVendorModal;


/*
"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
  return (
    <Dialog
      open={openDeleteModal}
      onClose={setOpenDeleteModal}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-950 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Delete Vendor
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this vendor? All of your
                      data will be permanently removed. This action cannot be
                      undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => deleteVendor(vendorToBeDelete)}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Delete
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpenDeleteModal(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteVendorModal;

*/