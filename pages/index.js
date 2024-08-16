import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditVendorModal from "../components/EditVendorModal";
import VendorCard from "../components/VendorCard";
import DeleteVendorModal from "../components/DeleteVendorModal";
import { useSession } from "next-auth/react";

var updatedDetailsOfVendors = [];
const Index = () => {
  const [vendors, setVendors] = useState([]);
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
  const [totalVendors, setTotalVendors] = useState(vendors.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [vendorsPerPage] = useState(6);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [vendorToBeDelete, setVendorToBeDelete] = useState("");

  const { data: session } = useSession();
  const userId = session?.userId;

  useEffect(() => {
    if(!userId) return;
    fetchVendors();
  }, [userId]);

  // Get Request
  const fetchVendors = async () => {
    try {
      const response = await fetch(`/api/getVendors?userId=${userId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setVendors(data.vendors);
      setTotalVendors(data.vendors.length);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const [showEditVendorModal, setShowEditVendorModal] = useState(false);

  const editFun = (id) => {
    setShowEditVendorModal(true);
    const selectedVendor = vendors.find((vendor) => vendor._id === id);
    if (selectedVendor) {
      updatedDetailsOfVendors = [selectedVendor];
      setId(selectedVendor._id);
      setName(selectedVendor.name);
      setBankName(selectedVendor.bankName);
      setAccNo(selectedVendor.accNo);
      setAddress1(selectedVendor.address1);
      setAddress2(selectedVendor.address2);
      setCity(selectedVendor.city);
      setZipCode(selectedVendor.zipCode);
      setCountry(selectedVendor.country);
    }
  };

  const lastVendor = currentPage * vendorsPerPage;
  const firstVendor = lastVendor - vendorsPerPage;
  const currentVendors = vendors.slice(firstVendor, lastVendor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="relative flex flex-col min-h-full">
        <VendorCard
          editFun={editFun}
          currentVendors={currentVendors}
          setOpenDeleteModal={setOpenDeleteModal}
          setVendorToBeDelete={setVendorToBeDelete}
        />

      <EditVendorModal
        showEditVendorModal={showEditVendorModal}
        _id={_id}
        accNo={accNo}
        setAccNo={setAccNo}
        address1={address1}
        setAddress1={setAddress1}
        address2={address2}
        setAddress2={setAddress2}
        bankName={bankName}
        setBankName={setBankName}
        city={city}
        setCity={setCity}
        country={country}
        setCountry={setCountry}
        name={name}
        setName={setName}
        zipCode={zipCode}
        setZipCode={setZipCode}
        updatedDetailsOfVendors={updatedDetailsOfVendors}
        setShowEditVendorModal={setShowEditVendorModal}
        fetchVendors={fetchVendors}
      />

      <div className="flex justify-center w-full mt-5">
        <Pagination
          vendorsPerPage={vendorsPerPage}
          totalVendors={totalVendors}
          paginate={paginate}
        />
      </div>
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
      <DeleteVendorModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        fetchVendors={fetchVendors}
        vendorToBeDelete={vendorToBeDelete}
        toast={toast}
      />
    </div>
  );
};

export default Index;
