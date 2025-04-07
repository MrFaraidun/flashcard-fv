import React, { useState, useEffect } from "react";
import { useUser } from "../components/UserContext";
import { editUserInfo, deleteUserAccount } from "../api/apiUser";

const Settings = () => {
  const { userData, setUserData, profilePicture, setProfilePicture } =
    useUser();
  const [isEditing, setIsEditing] = useState({
    name: false,
    age: false,
    purpose: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    purpose: "",
    profilePicture: null,
  });
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Determine the full image URL
  const getImageUrl = (profilePicture) => {
    if (!profilePicture) {
      return "http://localhost:5000/uploads/user.png"; // Default image
    }

    // If the profile picture is already a full URL (e.g., from Google), use it as-is
    if (profilePicture.startsWith("http")) {
      return profilePicture;
    }

    // If the profile picture is a relative path, prepend the backend URL
    return `http://localhost:5000${profilePicture}?t=${Date.now()}`; // Cache busting
  };

  useEffect(() => {
    if (userData) {
      const fullProfilePictureUrl = getImageUrl(profilePicture);

      setFormData({
        name: userData.Name,
        age: userData.Age,
        purpose: userData.PurposeOfUse,
        profilePicture: fullProfilePictureUrl,
      });
      setProfilePicturePreview(fullProfilePictureUrl);
    }
  }, [userData, profilePicture]);

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleEditClose = () => {
    setIsEditing({
      name: false,
      age: false,
      purpose: false,
    });
  };

  const handleSave = async () => {
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("age", formData.age);
    formDataObj.append("purposeOfUse", formData.purpose);
    if (formData.profilePicture) {
      formDataObj.append("profilePicture", formData.profilePicture);
    }

    try {
      const updatedData = await editUserInfo(formDataObj);
      setUserData(updatedData);

      window.location = "/Settings"; // Redirect to the homepage
      setProfilePicture(updatedData.profilePictureUrl);

      setProfilePicturePreview(getImageUrl(updatedData.profilePictureUrl));
    } catch (error) {
      console.error("Error saving user info:", error);
    }
  };

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });
    setProfilePicturePreview(URL.createObjectURL(file)); // Update preview on file selection
  };

  const handleDeleteAccount = async () => {
    await deleteUserAccount();

    window.location = "/home"; // Redirect to homepage or login page
  };

  const renderField = (field, label) => (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400 capitalize">
            {label}
          </p>
          {isEditing[field] ? (
            <input
              type="text"
              value={formData[field]}
              onChange={(e) => handleChange(e, field)}
              className="w-full p-2 mt-1 text-white bg-transparent outline-none"
            />
          ) : (
            <p className="text-lg font-semibold">{formData[field]}</p>
          )}
        </div>
        <div className="space-x-2">
          {isEditing[field] ? (
            <>
              <button
                className="text-green-500 hover:underline"
                onClick={handleEditClose}
              >
                Save
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => setIsEditing({ ...isEditing, [field]: false })}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="text-blue-500 hover:underline"
              onClick={() => handleEdit(field)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-gray-800">
      <div className="flex flex-col items-center w-[150vh] max-w-lg p-8 bg-gray-900 rounded-lg shadow-lg">
        <div className="flex items-center justify-between w-auto mb-8 space-x-20">
          <h2 className="text-2xl font-bold">Personal Information</h2>
          <button
            type="button"
            className="p-2 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={() => setIsModalOpen(true)}
          >
            Delete Account
          </button>
        </div>

        {/* Profile Picture */}
        <div className="w-full mb-6">
          <label className="block mb-2 text-sm font-medium">
            Profile Picture
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 overflow-hidden bg-gray-700 rounded-full">
              <img
                src={profilePicturePreview}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <label className="text-blue-500 cursor-pointer hover:underline">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              Change Photo
            </label>
          </div>
        </div>

        {/* Editable Fields */}
        {renderField("name", "name")}
        {renderField("age", "age")}
        {renderField("purpose", "purpose")}

        {/* Buttons */}
        <div className="w-full mt-6 space-x-6 text-center">
          <button
            type="submit"
            className="p-2 text-white bg-green-500 rounded hover:bg-green-600"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Delete Account Modal */}
      {isModalOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 transition-opacity bg-gray-600/50"
            aria-hidden="true"
          ></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <div className="relative overflow-hidden text-left transition-all transform bg-gray-800 rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                <div className="px-4 pt-5 pb-4 bg-gray-800 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="flex items-center justify-center mx-auto bg-red-600 rounded-full size-12 shrink-0 sm:mx-0 sm:size-10">
                      <svg
                        className="text-white size-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold text-white"
                        id="modal-title"
                      >
                        Are you sure?
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-300">
                          By deleting your account, all your data will be
                          permanently erased. This action is irreversible. Do
                          you wish to proceed?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-700 rounded-md shadow-sm hover:bg-red-600 sm:ml-3 sm:w-auto"
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-200 bg-gray-600 rounded-md shadow-sm ring-1 ring-inset ring-gray-500 hover:bg-gray-500 sm:mt-0 sm:w-auto"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
