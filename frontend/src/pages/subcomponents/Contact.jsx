import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [contactDetails, setContactDetails] = useState([]);
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleMessage = async (e) => {
    debugger;
    e.preventDefault();
    if (!senderName || !subject || !message) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/message/send",
        { senderName, subject, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setSenderName("");
      setSubject("");
      setMessage("");
      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Error Response:", error.response);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Call the function once, not recursively.
  useEffect(() => {
    const getContact = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/contacts/getcontact",
          { withCredentials: true }
        );
        setContactDetails(data.contact); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching contact details:", error);
      }
    };

    getContact(); // Call the async function
  }, []);

  return (
    <div className="overflow-x-hidden bg-gray-100 dark:bg-gray-900 py-4">
      <div className="container mx-auto px-5 lg:px-20">
        {/* Wrapper for Image and Form */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-7 lg:gap-10">
          {/* Left Section - Image */}
          <div className="flex justify-center items-center w-full lg:w-1/2">
            <div className="relative group">
              <img
                src={contactDetails?.ContactImg?.url || "default-avatar.jpg"}
                alt={contactDetails?.titleName || "Contact Avatar"}
                className="rounded-3xl shadow-2xl border-4 border-blue-500 dark:border-purple-600 w-full h-[650px] max-h-[650px] object-contain transition-transform transform group-hover:scale-90 duration-500 ease-in-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 lg:p-12  ">
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 mb-4">
                Contact
                <span className="animate-pulse"> Me</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
                Feel free to reach out. I'd love to hear from you!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleMessage} className="flex flex-col gap-6">
              {/* Name Field */}
              <div className="flex flex-col">
                <Label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Your Name
                </Label>
                <Input
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="John Doe"
                  className="mt-2 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Subject Field */}
              <div className="flex flex-col">
                <Label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Subject
                </Label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject of your message"
                  className="mt-2 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col">
                <Label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Message
                </Label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="mt-2 border border-gray-300 dark:border-gray-600 rounded-lg p-3 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows="5"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                {!loading ? (
                  <Button className="w-full sm:w-52 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-bold shadow-md hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-105">
                    SEND MESSAGE
                  </Button>
                ) : (
                  <button
                    disabled
                    type="button"
                    className="w-full sm:w-52 py-2 px-4 text-white bg-gray-400 dark:bg-gray-700 rounded-lg font-medium shadow-md flex items-center justify-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="w-5 h-5 mr-2 text-gray-200 animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Sending...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
