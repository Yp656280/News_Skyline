import React, { useState, useEffect } from "react";

function Otp({
  email,
  visibility,
  otp,
  setOtpVisibility,
  setEmailSignUp,
  setNameSignUp,
  setPhoneCodeSignUp,
  setPhoneSignUp,
  setPasswordSignUp,
  setOtp,
  setDisabled,
}) {
  const [userOtp, setUserOtp] = useState("");
  const [verified, setVerified] = useState(false);

  const checkOtp = (e) => {
    e.preventDefault();
    if (otp === userOtp) {
      setVerified(true);
      setUserOtp("");
      setOtpVisibility(false);
    } else {
      // alert("enter correct otp");
      console.log("enter correct otp");
    }
  };

  useEffect(() => {
    if (verified) {
      async function setAlive() {
        try {
          const response = await fetch(
            "http://localhost:4000/api/users/setAlive",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: email }), // Provide the email parameter here
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }

      setAlive();
      setEmailSignUp("");
      setNameSignUp("");
      setPasswordSignUp("");
      setPhoneCodeSignUp("");
      setPhoneSignUp("");
      setOtp("");
      setDisabled(false);
    }
  }, [verified]);

  return (
    <div
      className={`absolute ml-24 ${
        visibility ? "visible" : "hidden"
      } text-white   z-10`}
    >
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden  py-12 z-20">
        <div className="relative bg-gray-800 px-6  pt-20 pb-9 shadow-xl mx-auto  w-80  ml-8 mb-80 max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email {email}</p>
              </div>
            </div>

            <div>
              <form>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className=" w-96 p-1 h-14 " key={1}>
                      <input
                        className="w-full text-xl h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200   bg-gray-700 focus:bg-gray-800 focus:ring-1 ring-blue-700 "
                        type="text"
                        name=""
                        value={userOtp}
                        onChange={(e) => setUserOtp(e.target.value)}
                        id=""
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                        onClick={checkOtp}
                      >
                        Verify Account
                      </button>
                    </div>

                    {/* <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't receive code?</p>{" "}
                      <a
                        className="flex flex-row items-center text-blue-600"
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resend
                      </a>
                    </div> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
