import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import NoDataFound from "./NoDataFound";

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
    const masked = accNo.replace(/.(?=.{4})/g, "*");
    const formatted = masked.replace(/(.{4})/g, "$1 ");
    return formatted.trim();
  };

  return (
    <>
      <div
        className={`flex flex-wrap justify-center gap-20 text-center`}
      >
        {currentVendors.length === 0 ? (
          <NoDataFound />
        ) : (
          currentVendors.map((item) => {
            const isVisible = visibleAccounts[item._id];
            return (
              <div key={item._id} className="vendor-card">
                <div className="flex flex-col items-center p-4">
                  <h5 className="mb-1 text-3xl font-medium text-[#EEEEEE] dark:text-white">
                    {item.name}
                  </h5>
                  <span className="text-xl">{item.bankName}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {isVisible ? item.accNo : maskAccountNumber(item.accNo)}
                    </span>
                    <span onClick={() => toggleVisibility(item._id)}>
                      {isVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <span className="text-md">
                    {item.city}, {item.country} - {item.zipCode}
                  </span>
                  <div className="flex mt-4 space-x-3 md:mt-6">
                    <button
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[#000000] hover:text-[#FFFFFF] rounded-lg focus:ring-4 focus:outline-none"
                      onClick={() => editFun(item._id)}
                    >
                      Edit
                    </button>

                    <button
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[#000000] hover:text-[#FFFFFF] rounded-lg focus:ring-4 focus:outline-none"
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
          })
        )}
      </div>
    </>
  );
};

export default VendorCard;
