import { MdCenterFocusStrong } from "react-icons/md";
import { RiTodoFill } from "react-icons/ri";
import { SiConvertio } from "react-icons/si";
import { useState } from 'react';
import IMagemath from "../img/Math.jpg";

const Home = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="w-full min-h-screen max-sm:w-fit">
            <div className="flex pl-4 pr-4 flex-col items-center justify-start pt-[76px] pb-12 bg-[#1F2937] min-h-screen">
                {/* Outer Container */}
                <div className="container flex flex-col items-center justify-between w-full mx-auto lg:ml-52 md:flex-row">
                    {/* Left Section */}
                    <div className="flex-col items-start justify-start w-full mb-8 md:ml-12 md:w-1/2 md:mb-0">
                        <h1 className="w-[500px] mb-8 text-3xl font-bold text-white max-sm:w-64 text-start md:text-4xl md:text-left">
                            The easiest way to make and study flashcards
                        </h1>
                        <p className="mb-8 w-[500px] text-base text-gray-300 text-start max-lg:w-96 max-sm:w-56 md:text-xl md:text-left">
                            A better way to study with flashcards is here. Quizlet makes it
                            simple to create your own flashcards, study those of a classma4 pr-4e, or
                            search our archive of millions of flashcard decks from other
                            students.
                        </p>
                        <ul className="mb-6 space-y-8 text-xl">
                            <li className="flex items-center">
                                <span className="flex items-center justify-center p-3 mr-4 text-xl text-white bg-blue-500 rounded-lg">
                                    📷
                                </span>
                                <div>
                                    <p className="font-bold text-white">Over 500 million</p>
                                    <p className="text-gray-300">flashcards created</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="p-3 mr-4 text-xl text-white bg-purple-500 rounded-lg">
                                    🎓
                                </span>
                                <div>
                                    <p className="font-bold text-white">90% of students</p>
                                    <p className="text-gray-300">
                                        who use Quizlet report receiving higher grades
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="p-3 mr-4 text-xl text-white bg-blue-400 rounded-lg">
                                    📘
                                </span>
                                <div>
                                    <p className="font-bold text-white">The most popular</p>
                                    <p className="text-gray-300">
                                        online learning tool in the US
                                    </p>
                                </div>
                            </li>
                        </ul>
                        <div className="mt-12 text-xl text-start md:text-left">
                            <button className="px-6 py-3 text-white rounded-lg bg-amber-500 hover:bg-amber-600">
                                Create a flashcard set
                            </button>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-end justify-end w-96 h-[550px] max-lg:w-96 max-lg:-ml-[-120px] xl:mr-60 max-md:hidden">
                        <div className=" w-96 h-[550px] rounded-xl flex-col justify-between items-center ">
                            <div className="flex items-center justify-center pt-4">

                            </div>
                            <div className="flex items-center justify-center pt-4">
                                <img className="w-[350px] h-[450px]" src={IMagemath} alt="Math" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card Section */}
            <div className="bg-[#1F2937] pl-4 pr-4 flex flex-col md:flex-row md:justify-center md:items-start justify-start items-start h-auto px-0">
                <div className="relative  h-[320px] flex justify-center items-center ">
                    <div
                        className="max-lg:w-[650px] max-sm:w-[560px] max-xs:w-[460px] max-xf:w-[360px] w-[450px] h-[325px]  perspective cursor-pointer"
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        <div
                            className={`relative w-auto h-full text-center m-0 transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                        >
                            <div className="absolute flex items-center justify-center w-full h-full p-6 text-black bg-white rounded-lg shadow-lg backface-hidden">
                                <p className="text-lg font-semibold">my name is faraidun</p>
                            </div>
                            <div className="absolute flex items-center justify-center w-full h-full p-6 text-white bg-blue-500 rounded-lg shadow-lg backface-hidden rotate-y-180">
                                <p className="text-lg font-semibold">hextra</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center md:ml-12 md:mt-0 w-80 md:w-3/12 md:text-left">
                    <h1 className="text-4xl font-bold text-white text-start">Make flashcards</h1>
                    <p className="text-gray-300 text-xl  w-[20rem] max-md:w-[660px] max-sm:w-[520px] max-xs:w-[460px] max-xf:w-[360px] max-sm:text-justify text-justify mt-4">
                        Easily create personalized flashcards with our intuitive flashcard maker. Simply add a term, define it, and enhance your learning experience with images from our extensive library. Once your set is complete, you can study, review, and share it seamlessly with friends.
                    </p>

                </div>
            </div>

            {/* Yellow Box Section */}
            <div className="flex items-center justify-center mt-16 space-y-4 max-sm:flex-col max-md:space-x-12 space-x-44 h-96">
                <div className="flex flex-col items-center justify-center gap-12 mb-8 md:flex-row">

                    <div className="flex flex-col items-center text-center">
                        <SiConvertio className="w-10 h-14 text-amber-500" />
                        <p className="leading-relaxed text-white">
                            <span className="text-lg font-semibold">Task to Card</span> <br />
                            Convert tasks into flashcards for easy review.
                        </p>
                    </div>


                    <div className="flex flex-col items-center text-center">
                        <RiTodoFill className="w-10 h-14 text-amber-500" />
                        <p className="leading-relaxed text-white">
                            <span className="text-lg font-semibold">Manage</span> <br />
                            Organize your to-dos and study in one place.
                        </p>
                    </div>


                    <div className="flex flex-col items-center text-center">
                        <MdCenterFocusStrong className="w-10 h-14 text-amber-500" />
                        <p className="leading-relaxed text-white">
                            <span className="text-lg font-semibold">Focus List</span> <br />
                            Track tasks and flashcards effortlessly.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;
