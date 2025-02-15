import { NavLink } from 'react-router-dom';

const Sets = () => {
    return (
        <div className="h-[100vh] w-[100%] bg-[#1F2937] p-6 overflow-hidden">
            <h1 className="mb-8 text-3xl font-bold text-center">Flashcard Sets</h1>

            {/* Create New Set Card */}
            <div className="flex items-center justify-center mb-6 cursor-pointer">
                <NavLink to="/create">
                    <div className="flex items-center justify-center h-40 text-4xl font-semibold text-blue-500 transition bg-white rounded-lg shadow-lg w-60 hover:bg-blue-50">
                        <span>+</span>
                    </div>
                </NavLink>
            </div>

            {/* Display static sets */}
            <div className="flex flex-wrap justify-center gap-4">
                {/* Static Example Sets */}
                <NavLink to="/sets/ExampleSet1">
                    <div className="flex items-center justify-center h-40 text-xl font-semibold text-black transition bg-white rounded-lg shadow-lg cursor-pointer w-60 hover:bg-gray-50">
                        <span>Example Set 1</span>
                    </div>
                </NavLink>
                <NavLink to="/sets/ExampleSet2">
                    <div className="flex items-center justify-center h-40 text-xl font-semibold text-black transition bg-white rounded-lg shadow-lg cursor-pointer w-60 hover:bg-gray-50">
                        <span>Example Set 2</span>
                    </div>
                </NavLink>
                <NavLink to="/sets/ExampleSet3">
                    <div className="flex items-center justify-center h-40 text-xl font-semibold text-black transition bg-white rounded-lg shadow-lg cursor-pointer w-60 hover:bg-gray-50">
                        <span>Example Set 3</span>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default Sets;
