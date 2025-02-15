import { NavLink } from 'react-router-dom';
import Flashcard from './flashcard'; // Adjust the import if necessary

const SetDetails = () => {
    return (
        <div className="min-h-screen bg-[#0f172a] p-6">
            <h1 className="mb-8 text-3xl font-bold text-center">Flashcards of set: Example Set</h1>

            {/* Button to add new flashcard */}
            <div className="flex items-center justify-center mb-6 cursor-pointer">
                <NavLink to="">
                    <div className="flex items-center justify-center h-40 text-4xl font-semibold text-blue-500 transition bg-white rounded-lg shadow-lg w-60 hover:bg-blue-50">
                        <span>+</span>
                    </div>
                </NavLink>
            </div>

            {/* Display static flashcards */}
            <div className="flex flex-wrap justify-center gap-4 text-center">
                {/* Static flashcards */}
                <Flashcard key={1} question="Term 1" answer="Definition 1" />
                <Flashcard key={2} question="Term 2" answer="Definition 2" />
                <Flashcard key={3} question="Term 3" answer="Definition 3" />
            </div>
        </div>
    );
};

export default SetDetails;
