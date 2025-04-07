import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSet } from "../api/apiSets";
import { createCard } from "../api/apiCards";

const FlashcardCreate = () => {
  const [title, setTitle] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Add flashcard to temporary list
  const handleAddFlashcard = () => {
    if (!front || !back) return;
    setFlashcards([...flashcards, { frontcontent: front, backcontent: back }]);
    setFront("");
    setBack("");
  };

  // Create set and add flashcards
  const handleCreateSet = async () => {
    if (!title) {
      setError("Title is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await createSet(title);
      console.log("Create Set Response:", response); // Debugging line

      if (response.error) {
        setError(response.error);
      } else {
        const setId = response.setid;
        console.log("Set ID:", setId); // Check if setId is correctly received

        if (!setId) {
          throw new Error("Set ID is undefined.");
        }

        for (const card of flashcards) {
          await createCard(setId, card.frontcontent, card.backcontent);
        }
        navigate("/sets");
      }
    } catch (err) {
      console.error("Error creating set:", err);
      setError("An error occurred while creating the set.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
      <div className="max-w-lg w-full bg-[#1E293B] text-white rounded-lg shadow-lg p-6">
        <h1 className="mb-6 text-2xl font-bold text-center">
          Create a new flashcard set
        </h1>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Enter set title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-[#334155] text-white px-4 py-2 rounded mb-4"
        />

        {/* Add Flashcards */}
        <div className="mb-4">
          <h2 className="text-lg font-medium">Add Flashcards</h2>
          <input
            type="text"
            placeholder="Front side..."
            value={front}
            onChange={(e) => setFront(e.target.value)}
            className="w-full bg-[#334155] text-white px-4 py-2 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Back side..."
            value={back}
            onChange={(e) => setBack(e.target.value)}
            className="w-full bg-[#334155] text-white px-4 py-2 rounded mb-2"
          />
          <button
            onClick={handleAddFlashcard}
            className="w-full px-4 py-2 bg-green-600 rounded"
          >
            Add Flashcard
          </button>
        </div>

        {/* Show Added Flashcards */}
        <div className="mt-4">
          <h2 className="text-lg font-medium">Added Flashcards:</h2>
          {flashcards.length === 0 ? (
            <p className="text-gray-400">No cards added yet.</p>
          ) : (
            <ul className="pl-4 list-disc">
              {flashcards.map((card, index) => (
                <li key={index} className="text-gray-300">
                  {card.frontcontent} - {card.backcontent}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Create Set Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleCreateSet}
            className="flex-grow px-4 py-2 text-white bg-blue-600 rounded"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Set"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardCreate;
