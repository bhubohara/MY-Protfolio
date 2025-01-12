import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewContact,
  clearAllContactErrors,
  getAllContact,
  resetContactState,
  deleteContact,
  updateContact,
} from "@/store/slice/addContactslice";

const Contact = () => {
  const [titleName, setTitleName] = useState("");
  const [firstDescription, setFirstDescription] = useState("");
  const [secondDescription, setSecondDescription] = useState("");
  const [lastDescription, setLastDescription] = useState("");
  const [ContactImg, setContactImg] = useState(null);
  const [ContactImgPreview, setContactImgPreview] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  const { loading, error, message, contacts } = useSelector(
    (state) => state.contact
  );

  const dispatch = useDispatch();

  const handleSvg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setContactImgPreview(reader.result);
        setContactImg(file);
      };
    }
  };

  const handleNewContact = async (e) => {
    e.preventDefault();

    if (
      !titleName ||
      !ContactImg ||
      !firstDescription ||
      !secondDescription ||
      !lastDescription
    ) {
      toast.error("Please fill all the fields.");
      return;
    }

    const formData = new FormData();
    formData.append("titleName", titleName);
    formData.append("firstDescription", firstDescription);
    formData.append("secondDescription", secondDescription);
    formData.append("lastDescription", lastDescription);
    formData.append("ContactImg", ContactImg);

    dispatch(addNewContact(formData));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleUpdateContact = (contact) => {
    setSelectedContact(contact);
    setTitleName(contact.titleName);
    setFirstDescription(contact.firstDescription);
    setSecondDescription(contact.secondDescription);
    setLastDescription(contact.lastDescription);
    setContactImgPreview(contact.ContactImg.url); // Assuming the image URL is stored here
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titleName", titleName);
    formData.append("firstDescription", firstDescription);
    formData.append("secondDescription", secondDescription);
    formData.append("lastDescription", lastDescription);
    if (ContactImg) formData.append("ContactImg", ContactImg);

    dispatch(updateContact(selectedContact._id, formData)); // Update the contact by its ID
    setSelectedContact(null); // Close the popup
  };

  const getlisthandle = () => {
    dispatch(getAllContact());
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllContactErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetContactState());
      dispatch(getAllContact()); // Refresh the contact list
      setTitleName("");
      setFirstDescription("");
      setSecondDescription("");
      setLastDescription("");
      setContactImg(null);
      setContactImgPreview("");
      dispatch(getAllContact());
    }
  }, [dispatch, loading, error, message]);

  return (
    <>
      <div className="flex justify-center items-center min-h-[50vh]  sm:gap-4 bg-gradient-to-r  sm:gap-4 sm:py-4 sm:pl-14">
        <form
          onSubmit={handleNewContact}
          className="w-[100%] px-5 md:w-[650px] bg-white p-8 rounded-lg shadow-xl"
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold text-3xl text-center text-gray-900 mb-8">
                ADD Contact Details
              </h2>
              <div className="mt-10 flex flex-col gap-6">
                {/* Form Inputs */}
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Title Intro
                  </label>
                  <input
                    type="text"
                    value={titleName}
                    onChange={(e) => setTitleName(e.target.value)}
                    className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    placeholder="Intro about"
                  />
                </div>

                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    First Description
                  </label>
                  <input
                    type="text"
                    value={firstDescription}
                    onChange={(e) => setFirstDescription(e.target.value)}
                    className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    placeholder="First Description"
                  />
                </div>

                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Second Description
                  </label>
                  <input
                    type="text"
                    value={secondDescription}
                    onChange={(e) => setSecondDescription(e.target.value)}
                    className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    placeholder="Second Description"
                  />
                </div>

                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Last Description
                  </label>
                  <input
                    type="text"
                    value={lastDescription}
                    onChange={(e) => setLastDescription(e.target.value)}
                    className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    placeholder="Last Description"
                  />
                </div>

                {/* File Upload */}
                <div className="w-full sm:col-span-4">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Contact Svg
                  </label>
                  <div className="mt-4 flex justify-center border-dashed border-2 rounded-lg p-6">
                    <div className="text-center">
                      {ContactImgPreview ? (
                        <img
                          className="mx-auto h-12 w-12 text-gray-300"
                          src={ContactImgPreview}
                          alt="SVG Preview"
                        />
                      ) : (
                        <svg
                          className="mx-auto h-12 w-12 text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}

                      <div className="mt-4 flex text-sm leading-6 text-indigo-600">
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          Upload a file
                          <input
                            id="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleSvg}
                          />
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            {!loading ? (
              <Button
                type="submit"
                className="rounded-lg bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
              >
                Save Details
              </Button>
            ) : (
              <SpecialLoadingButton content="Adding Application" />
            )}
          </div>
        </form>
      </div>

      {/* Contact List Table */}

      <div className="overflow-x-auto px-8 mx-6 mt-12 rounded-xl shadow-lg">
        <Button
          onClick={() => getlisthandle()}
          className="px-2 text-right text-sm "
        >
          Get Contact
        </Button>
        <table className="min-w-full px-8  bg-white table-auto border-collapse">
          <thead className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-white">
                Title
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-white">
                First Description
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white col-2">
            {contacts.map((contact) => (
              <tr key={contact._id} className="hover:bg-gray-100">
                <td className="py-7 px-8 text-sm text-gray-900">
                  {contact.titleName}
                </td>
                <td className="py-7 px-8 text-sm text-gray-900">
                  {contact.firstDescription}
                </td>
                <td className="py-7 px-5 text-sm text-gray-900">
                  <Button
                    onClick={() => handleUpdateContact(contact)}
                    className="mr-2 text-indigo-600 hover:text-indigo-800 bg-white"
                  >
                    Update
                  </Button>

                  <Button
                    onClick={() => handleDeleteContact(contact._id)}
                    className="text-red-600 hover:text-red-800 bg-white"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Contact Popup */}
      {selectedContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h3 className="text-xl font-semibold mb-4">Update Contact</h3>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Title Name</label>
                <input
                  type="text"
                  value={titleName}
                  onChange={(e) => setTitleName(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  First Description
                </label>
                <input
                  type="text"
                  value={firstDescription}
                  onChange={(e) => setFirstDescription(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Second Description
                </label>
                <input
                  type="text"
                  value={secondDescription}
                  onChange={(e) => setSecondDescription(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Last Description
                </label>
                <input
                  type="text"
                  value={lastDescription}
                  onChange={(e) => setLastDescription(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Contact Image
                </label>
                <input
                  type="file"
                  onChange={handleSvg}
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
                {ContactImgPreview && (
                  <img
                    src={ContactImgPreview}
                    alt="Preview"
                    className="mt-2 w-12 h-12"
                  />
                )}
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-600 "
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 text-white">
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
