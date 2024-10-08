import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const LoginModal = ({
  showLoginModal,
  setShowLoginModal,
  setShowRegisterModal,
}) => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const [loginRequestLoading, isLoginRequestLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setLoginCredentials({
      ...loginCredentials,
      [name]: value,
    });
  };

  const handleRegisterClick = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleLogin = async (e) => {
    isLoginRequestLoading(true);
    e.preventDefault();

    const response = await fetch("/api/loginUser", {
      method: "POST",
      body: JSON.stringify(loginCredentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email: loginCredentials.email,
        password: loginCredentials.password,
      });

      if (signInResponse.ok) {
        isLoginRequestLoading(false);
        setShowLoginModal(false);
        toast("Logged in successfully", { type: "success" });
      } else {
        toast("Failed to log in", { type: "error" });
        isLoginRequestLoading(false);
      }
    } else {
      toast(`Error: ${data.error}`, { type: "error" });
      isLoginRequestLoading(false);
    }
  };

  const isFormValid =
    loginCredentials.email.trim() !== "" &&
    loginCredentials.password.trim() !== "";

  return (
    <>
      <Dialog
        open={showLoginModal}
        onClose={setShowLoginModal}
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
              <div className="px-6 pb-6 text-left">
                <DialogTitle
                  as="h3"
                  className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
                >
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">
                    Sign in to our platform
                  </span>
                  <button
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                    onClick={() => setShowLoginModal(false)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </DialogTitle>
                <div className="p-4 md:p-5">
                  <form className="space-y-4">
                    <div>
                      <label
                        for="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Email"
                        value={loginCredentials.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        value={loginCredentials.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className={`w-full p-2 text-white rounded-lg transition-colors ${
                        isFormValid
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      onClick={handleLogin}
                    >
                      {loginRequestLoading ? "Logging in..." : "Login to your account"}
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Not registered?{" "}
                      <button
                        onClick={handleRegisterClick}
                        className="text-blue-700 hover:underline dark:text-blue-500 bg-transparent"
                      >
                        Create account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default LoginModal;
