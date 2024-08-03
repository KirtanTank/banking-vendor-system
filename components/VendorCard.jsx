import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const VendorCard = ({
  editFun,
  currentVendors,
  setOpenDeleteModal,
  setVendorToBeDelete,
}) => {
  const [visibleAccounts, setVisibleAccounts] = useState({});

  const toggleVisibility = (id) => {
    setVisibleAccounts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const maskAccountNumber = (accNo) => {
    return accNo.replace(/.(?=.{4})/g, "*");
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-6 justify-items-center px-16">
        {currentVendors.map((item) => {
          const isVisible = visibleAccounts[item._id];
          return (
            <div
              key={item._id}
              className="w-full items-center content-center max-w-sm bg-white rounded-xl shadow-[0_25px_80px_-5px_rgba(0,0,0,0.2)] dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex flex-col items-center p-4">
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {item.name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.bankName}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {isVisible ? item.accNo : maskAccountNumber(item.accNo)}
                  </span>
                  <button onClick={() => toggleVisibility(item._id)}>
                    {isVisible ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.city}, {item.country} - {item.zipCode}
                </span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                  <button
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => editFun(item._id)}
                  >
                    Edit
                  </button>

                  <button
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                    onClick={() => {
                      setVendorToBeDelete(item._id);
                      setOpenDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default VendorCard;
