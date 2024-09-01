import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import RegisterNow from "../public/register-now.svg";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const RegisterModal = ({ showRegisterModal, setShowRegisterModal }) => {
  const [registrationCredentials, setRegistrationCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setRegistrationCredentials({
      ...registrationCredentials,
      [name]: value,
    });
  };

  const handleRegistration = async () => {
    const response = await fetch("/api/addUser", {
      method: "POST",
      body: JSON.stringify(registrationCredentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      toast("Registered successfully", { type: "success" });

      const signInResponse = await signIn("credentials", {
        redirect: false,
        email: registrationCredentials.email,
        password: registrationCredentials.password,
      });

      if (signInResponse.ok) {
        setShowRegisterModal(false);
      } else {
        toast("Failed to log in", { type: "error" });
      }
    } else {
      toast(`Error: ${data.error}`, { type: "error" });
    }
  };

  return (
    <>
      <Dialog
        open={showRegisterModal}
        onClose={() => {}}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-950 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="shadow sm:rounded-lg flex justify-center flex-1">
          <div className="fixed inset-0 z-10 w-full overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-auto rounded-xl bg-green-100 flex flex-row text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-6xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
              >
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-6 rounded-xl bg-white">
                  <div className="mt-6 flex flex-col items-center">
                    <div className="w-full flex-1 mt-8">
                      <div className="flex flex-col items-center">
                        <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                          <div className="bg-white p-2 rounded-full">
                            <svg className="w-4" viewBox="0 0 533.5 544.3">
                              <path
                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                fill="#4285f4"
                              />
                              <path
                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                fill="#34a853"
                              />
                              <path
                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                fill="#fbbc04"
                              />
                              <path
                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                fill="#ea4335"
                              />
                            </svg>
                          </div>
                          <span className="ml-4">Sign In with Google</span>
                        </button>
                      </div>

                      <div className="my-12 border-b text-center">
                        <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                          Or register with your e-mail
                        </div>
                      </div>

                      <div className="mx-auto max-w-xs">
                        <input
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          type="text"
                          placeholder="Name"
                          name="name"
                          value={registrationCredentials.name}
                          onChange={handleChange}
                        />
                        <input
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={registrationCredentials.email}
                          onChange={handleChange}
                        />
                        <input
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={registrationCredentials.password}
                          onChange={handleChange}
                        />
                        <button
                          className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                          onClick={handleRegistration}
                        >
                          <svg
                            className="w-6 h-6 -ml-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <path d="M20 8v6M23 11h-6" />
                          </svg>
                          <span className="ml-4">Register</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" bg-green-100 text-center hidden lg:flex flex-1">
                  <div className="xl:m-16 w-full bg-contain bg-center bg-no-repeat flex flex-col items-center justify-center">
                    <Image
                      src={RegisterNow}
                      alt="No Data"
                      className="w-10/12"
                    />
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default RegisterModal;
