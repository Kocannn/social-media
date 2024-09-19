"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    image:
      "https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Transparent-Image.png",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/v1/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify( data ),
    });
    if (response.status === 409) {
      setError("User already exists");
      return;
    }
    if(response.status === 200) {
      router.push("/");
    }
  };

  return (
    <>
      {error && (
        <div
          className="flex items-center p-4 m-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Alert!</span> {error}
          </div>
        </div>
      )}

      <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="bg-[#222831] w-full sm:w-96 rounded-xl p-6 border border-gray-500 shadow-xl shadow-[#000000]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-color-primary">
              Create an account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={registerUser}>
            <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-color-primary"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => {
                      setData({ ...data, name: e.target.value });
                    }}
                    required
                    className="block w-full p-4 rounded-md border-0 py-1.5 text-black  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-color-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-color-primary"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => {
                      setData({ ...data, email: e.target.value });
                    }}
                    required
                    className="block  w-full p-4 rounded-md border-0 py-1.5 text-black  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-color-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
             

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-color-primary"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    value={data.password}
                    onChange={(e) => {
                      setData({ ...data, password: e.target.value });
                    }}
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full p-4 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-color-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full text-color-primary justify-center rounded-md bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-300 px-3 py-1.5 text-sm font-semibold leading-6"
                >
                  Sign up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold leading-6 text-color-primary hover:text-blue-500 transition-all duration-200"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
