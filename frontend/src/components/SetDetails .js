import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCards, deleteCard, updateCard } from "../api/apiCards";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { createCard } from "../api/apiCards"; // Import createCard

const SetDetails = () => {
  const { setid } = useParams();
  const [cards, setCards] = useState([]);
  const [setName, setSetName] = useState(""); // New state for set name
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [frontContent, setFrontContent] = useState("");
  const [backContent, setBackContent] = useState("");
  const [isFlipping, setIsFlipping] = useState(true); // State to handle flip animation

  const [newCards, setNewCards] = useState([
    { frontContent: "", backContent: "" },
  ]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getCards(setid);
        if (!response.error) {
          setCards(response.cards);
        }

        setSetName(response.setName);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };

    if (setid) {
      fetchCards();
    }
  }, [setid]);

  const handleDeleteCard = async (cardid) => {
    try {
      const result = await deleteCard(cardid);
      if (!result.error) {
        setCards((prevCards) =>
          prevCards.filter((card) => card.cardid !== cardid)
        );
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleCardFlip = (cardid) => {
    setCards((prevCards) =>
      prevCards.map((item) =>
        item.cardid === cardid ? { ...item, isFlipped: !item.isFlipped } : item
      )
    );

    setIsFlipping(false); // Set flipping state to false immediately

    // Delay the setting of isFlipping to true after the flip animation
    setTimeout(() => {
      setIsFlipping(true); // Set flipping state to true after the animation
    }, 500); // Adjust the delay to match your animation duration
  };

  const handleUpdateCard = async () => {
    if (currentCard) {
      try {
        await updateCard(currentCard.cardid, frontContent, backContent);
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.cardid === currentCard.cardid
              ? {
                  ...card,
                  frontcontent: frontContent,
                  backcontent: backContent,
                }
              : card
          )
        );
        setShowModal(false);
      } catch (error) {
        console.error("Error updating card:", error);
      }
    }
  };

  const handleCreateCard = async () => {
    try {
      const createdCards = [];
      for (const newCard of newCards) {
        const created = await createCard(
          setid,
          newCard.frontContent,
          newCard.backContent
        );
        if (!created.error) {
          createdCards.push(created);
        } else {
          console.error(created.error);
        }
      }
      if (createdCards.length > 0) {
        setCards((prevCards) => [...prevCards, ...createdCards]);
        setShowCreateModal(false);
        setNewCards([{ frontContent: "", backContent: "" }]);
      }
    } catch (error) {
      console.error("Error creating cards:", error);
    }
  };

  const handleCardEdit = (card) => {
    setCurrentCard(card);
    setFrontContent(card.frontcontent);
    setBackContent(card.backcontent);
    setShowModal(true);
  };

  const handleAddCardField = () => {
    setNewCards((prev) => [...prev, { frontContent: "", backContent: "" }]);
  };

  const handleRemoveCardField = (cardid) => {
    setNewCards((prev) => prev.filter((card) => card.id !== cardid));
  };

  const handleChangeCardField = (index, field, value) => {
    setNewCards((prev) => {
      const updatedCards = [...prev];
      updatedCards[index][field] = value;
      return updatedCards;
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-6">
      <h1 className="mb-8 text-3xl font-bold text-center text-white">
        Flashcards for Set: {setName || "Loading..."}{" "}
        {/* Display the set name */}
      </h1>

      <div className="flex items-center justify-center mb-2">
        <div
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center h-40 text-4xl font-semibold text-blue-600 transition bg-white rounded-lg shadow-lg cursor-pointer w-60 hover:bg-blue-50"
        >
          <span>+</span>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-white">Loading...</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {cards.length > 0 ? (
            cards.map((card) => (
              <div
                key={card.cardid}
                className="relative h-40 m-4 cursor-pointer group w-60 perspective"
              >
                <div
                  className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                    card.isFlipped ? "rotate-y-180" : ""
                  }`}
                  onClick={() => handleCardFlip(card.cardid)}
                >
                  {/* Front Side */}
                  <div className="absolute flex items-center justify-center w-full h-full p-6 text-black bg-white rounded-lg shadow-lg backface-hidden">
                    <p className="text-lg font-semibold">{card.frontcontent}</p>
                  </div>

                  {/* Back Side */}
                  <div className="absolute flex items-center justify-center w-full h-full p-6 text-white bg-blue-500 rounded-lg shadow-lg backface-hidden rotate-y-180">
                    <p className="text-lg font-semibold">{card.backcontent}</p>
                  </div>
                </div>

                {/* Edit and Delete Buttons */}
                {isFlipping && (
                  <div className="absolute transition-opacity opacity-0 top-2 right-2 group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardEdit(card);
                      }}
                      className="p-2 mr-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
                    >
                      <MdModeEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCard(card.cardid);
                      }}
                      className="p-2 text-white bg-red-500 rounded-full hover:bg-red-600"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-white">No flashcards found.</p>
          )}
        </div>
      )}

      {/* Modal for updating card */}
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-2xl font-semibold text-black">
              Edit Card
            </h2>
            <input
              type="text"
              value={frontContent}
              onChange={(e) => setFrontContent(e.target.value)}
              className="w-full p-2 mb-4 text-black border rounded"
            />
            <input
              type="text"
              value={backContent}
              onChange={(e) => setBackContent(e.target.value)}
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
                onClick={handleUpdateCard}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for creating multiple cards */}
      {showCreateModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-2xl font-semibold text-black">
              Create New Cards
            </h2>
            {newCards.map((card, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  value={card.frontContent}
                  onChange={(e) =>
                    handleChangeCardField(index, "frontContent", e.target.value)
                  }
                  className="w-full p-2 mb-4 text-black border rounded"
                  placeholder="Front Content"
                />
                <input
                  type="text"
                  value={card.backContent}
                  onChange={(e) =>
                    handleChangeCardField(index, "backContent", e.target.value)
                  }
                  className="w-full p-2 mb-4 text-black border rounded"
                  placeholder="Back Content"
                />
                {newCards.length > 1 && (
                  <button
                    onClick={() => handleRemoveCardField(index)}
                    className="text-red-500"
                  >
                    Remove this card
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={handleAddCardField}
              className="w-full mb-4 text-blue-500"
            >
              Add another card
            </button>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCard}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetDetails;
