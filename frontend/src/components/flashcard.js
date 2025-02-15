import { useState } from 'react';

const Flashcard = ({ question, answer }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="h-40 m-4 cursor-pointer w-60 perspective"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div
                className={`relative w-full h-full text-center transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
            >
                {/* Front Side */}
                <div
                    className="absolute flex items-center justify-center w-full h-full p-6 text-black bg-white rounded-lg shadow-lg backface-hidden"
                >
                    <p className="text-lg font-semibold">{question}</p>
                </div>

                {/* Back Side */}
                <div
                    className="absolute flex items-center justify-center w-full h-full p-6 text-white bg-blue-500 rounded-lg shadow-lg backface-hidden rotate-y-180"
                >
                    <p className="text-lg font-semibold">{answer}</p>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
