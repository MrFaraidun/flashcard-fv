import React from "react";

const FlashcardCreate = () => {
    return (
        <div className="relative faraidun left-0 right-0 top-0 bottom-0 min-h-screen bg-[#0F172A] flex justify-center items-center">
            <div className="max-w-lg w-full bg-[#1E293B] text-white rounded-lg shadow-lg p-6">
                <h1 className="mb-6 text-2xl font-bold text-center">Create a new flashcard set</h1>

                {/* Input for Title */}
                <input
                    type="text"
                    placeholder="Enter a title, like 'Biology - Chapter 22: Evolution'"
                    className="w-full bg-[#334155] text-white placeholder-gray-400 px-4 py-2 rounded mb-4"
                />

                {/* Textarea for Description */}
                <textarea
                    placeholder="Add a description"
                    className="w-full bg-[#334155] text-white placeholder-gray-400 px-4 py-2 rounded mb-4"
                ></textarea>

                {/* Display Added Flashcards */}
                <div className="mt-6">
                    <h2 className="text-lg font-medium">Added Flashcards:</h2>
                    <p className="text-gray-400">No cards added yet.</p>
                </div>

                <div className="flex gap-4 mt-4">
                    {/* Button to Create the Flashcard Set */}
                    <button className="flex-grow px-4 py-2 text-white bg-blue-600 rounded">
                        Create Set
                    </button>
                    <button className="flex-grow px-4 py-2 text-white bg-green-600 rounded">
                        Create and Practice
                    </button>
                </div>


            </div>
        </div>
    );
};

export default FlashcardCreate;
