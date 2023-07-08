import Vendor from "../models/Vendor";
import mongoose from "mongoose";
import { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';

var arr = [];
const Index = ({vendors}) => {

  const getVendors = async () => {
    await fetch(`/api/getVendors`)
    .then(data => {return {vendors: JSON.parse(JSON.stringify(data))}})
    .catch(err => console.log(err));
  }

  useEffect(() => {
    getVendors();
  }, []);

  const [_id, setId] = useState("");
  const [name, setName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accNo, setAccNo] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  // Pagination
  const [totalVendors] = useState(vendors.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [vendorsPerPage] = useState(10);

  // Delete Request
  const deleteVendor = async (id) => {
    let conf = confirm("Are You Sure?");
    if (conf) {
      const resp = await fetch(`/api/deleteVendors?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((res) => {
        console.log({res});
      }).catch((err) => {
        console.log({err});
      });
    }
    window.location.reload(true);
  }

  const [show, setShow] = useState(false);

  const editFun = (id) => {
    setShow(true);
    for (let i = 0; i < vendors.length; i++) {
      if (vendors[i]._id == id) {
        arr.push(vendors[i]);
        setId(vendors[i]._id);
        setName(vendors[i].name);
        setBankName(vendors[i].bankName);
        setAccNo(vendors[i].accNo);
        setAddress1(vendors[i].address1);
        setAddress2(vendors[i].address2);
        setCity(vendors[i].city);
        setZipCode(vendors[i].zipCode);
        setCountry(vendors[i].country);
        break;
      }
    }
  }
  const closeModal = () => {
    setShow(false);
    arr = [];
  }

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
      zipCode
    }
    // console.log(newPayload);
    //Update Request
    await fetch(`/api/updateVendors`, {
      method: 'POST',
      body: JSON.stringify(newPayload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((res) => {
      console.log({res});
    }).catch((err) => {
      console.log({err});
    });
    setShow(false);
    window.location.reload(true);
  }

  const lastVendor = currentPage*vendorsPerPage;
  const firstVendor = lastVendor - vendorsPerPage;
  const currentVendors = vendors.slice(firstVendor, lastVendor);


  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div onload="getVendors()">
      <div className="grid grid-cols-4 gap-4 justify-items-center">
        {currentVendors.map((item) => {
          return <div key={item._id} className="w-full items-center content-center max-w-xs bg-white rounded-xl shadow-[0_25px_80px_-5px_rgba(0,0,0,0.4)] dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center p-4">
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{item.name}</h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.bankName}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.accNo}</span>
              <div className="flex mt-4 space-x-3 md:mt-6">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => editFun(item._id)}>Edit</button>

                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700" onClick={() => deleteVendor(item._id)}>Delete</button>
              </div>
            </div>
          </div>
        })}
      </div>

      {show && <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        {arr.map((ele) => {
          return <div key={ele._id} className="max-w-2xl bg-blue-700 px-5 m-auto w-fit p-5 rounded-lg">
            <div className="text-3xl mb-6 text-center text-white">Edit Vendor Details</div>
            <form>
              <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">

                <div className="col-span-2 lg:col-span-1">
                  <input type="text" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="vendorName" placeholder="Vendor Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <input type="text" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="bankName" placeholder="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} required />
                </div>

                <div className="col-span-2">
                  <input type="number" cols="30" rows="8" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="accNumber" placeholder="Bank Account Number" value={accNo} onChange={(e) => setAccNo(e.target.value)} required />
                </div>

                <div className="col-span-2">
                  <input cols="30" rows="8" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="address1" placeholder="Address Line 1" value={address1} onChange={(e) => setAddress1(e.target.value)} required />
                </div>

                <div className="col-span-2">
                  <input cols="30" rows="8" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="address2" placeholder="Address Line 2" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <input type="text" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <input type="number" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="zip" placeholder="ZipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
                </div>

                <div className="col-span-2">
                  <input cols="30" rows="8" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="country" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </div>

                <div className="col-span-2">
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <button type='button' className="py-3 px-6 rounded-md bg-green-500 text-white font-bold w-full sm:w-32" onClick={() => closeModal()}>CANCEL</button>
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <button type='button' className="py-3 px-6 rounded-md bg-green-500 text-white font-bold w-full sm:w-32" onClick={() => updateVendor()} >EDIT</button>
                </div>
              </div>
            </form>

          </div>
        })}
      </div>}
      
      <Pagination vendorsPerPage={vendorsPerPage} totalVendors={totalVendors} paginate={paginate} />

    </div>
  );
}

// export const getServerSideProps = async () => {
//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect("mongodb://127.0.0.1/MyVendorData");
//   }
//   let res = await Vendor.find();
//   return {
//     props: { vendors: JSON.parse(JSON.stringify(res)) },
//   }
// }


export default Index;
