import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getSets, deleteSet, updateSet } from "../api/apiSets";

const Sets = () => {
  const [sets, setSets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSet, setSelectedSet] = useState(null);
  const [newSetName, setNewSetName] = useState("");
  useEffect(() => {
    const fetchSets = async () => {
      try {
        const data = await getSets();

        if (data && Array.isArray(data)) {
          setSets(data);
        }
      } catch (error) {
        console.error("Error fetching sets:", error);
      }
    };

    fetchSets();
  }, []);

  // Handle deleting a set
  const handleDeleteSet = async (setid) => {
    try {
      await deleteSet(setid);
      setSets((prevSets) => prevSets.filter((set) => set.setid !== setid));
    } catch (error) {
      console.error("Error deleting set:", error);
    }
  };

  const handleEditSet = (set) => {
    setSelectedSet(set);
    setNewSetName(set.setname);
    setShowModal(true);
  };

  const handleUpdateSet = async () => {
    try {
      await updateSet(selectedSet.setid, newSetName);
      setSets((prevSets) =>
        prevSets.map((set) =>
          set.setid === selectedSet.setid
            ? { ...set, setname: newSetName }
            : set
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error updating set:", error);
    }
  };

  return (
    <div className="h-screen w-full bg-[#1F2937] p-6 overflow-auto">
      <h1 className="mb-8 text-3xl font-bold text-center text-white">
        Flashcard Sets
      </h1>

      {/* Add Set Button */}
      <div className="flex items-center justify-center mb-6">
        <NavLink to="/create">
          <div className="flex items-center justify-center h-40 text-4xl font-semibold text-blue-600 transition bg-white rounded-lg shadow-lg w-60 hover:bg-blue-50">
            <span>+</span>
          </div>
        </NavLink>
      </div>

      {/* Sets Container */}
      <div className="flex flex-wrap justify-center gap-4">
        {sets.length === 0 ? (
          <div className="text-xl font-semibold text-white">
            No sets created.
          </div>
        ) : (
          sets.map((set) => (
            <div key={set.setid} className="relative group">
              {/* Flashcard Set */}
              <NavLink to={`/sets/${set.setid}`}>
                <div className="z-40 flex items-center justify-center h-40 text-xl font-semibold text-black transition bg-white rounded-lg shadow-lg cursor-pointer w-60 hover:bg-gray-50">
                  <span>{set.setname}</span>
                </div>
              </NavLink>

              {/* Edit & Delete Buttons (show on hover) */}
              <div className="absolute transition-opacity opacity-0 top-2 right-2 group-hover:opacity-100">
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevents accidental navigation
                    handleEditSet(set);
                  }}
                  className="p-2 mr-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
                >
                  <MdModeEdit />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteSet(set.setid);
                  }}
                  className="p-2 text-white bg-red-500 rounded-full hover:bg-red-600"
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Editing Set */}
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-2xl font-semibold text-black">Edit Set</h2>
            <input
              type="text"
              value={newSetName}
              onChange={(e) => setNewSetName(e.target.value)}
              className="w-full p-2 mb-4 text-black border rounded"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSet}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sets;
