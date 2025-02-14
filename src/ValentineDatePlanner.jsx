import React, { useState } from "react";
import { motion } from "framer-motion";
import PleaseImg from "./assets/Please.png";
import HappyTomImg from "./assets/HappyTom.png";

const Button = ({ onClick, children, extraClasses = "" }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
    className={`px-10 py-4 
                text-2xl 
                font-extrabold 
                rounded-full 
                focus:outline-none 
                shadow-2xl 
                text-white 
                bg-gradient-to-r 
                from-rose-500 
                to-red-500
                hover:from-rose-600 
                hover:to-red-600
                border-4 
                border-white
                drop-shadow-lg
                ${extraClasses}`}
  >
    {children}
  </motion.button>
);

const AnimatedHearts = () => {
  const heartsCount = 12;
  const heartsArray = Array.from({ length: heartsCount });

  return (
    <>
      {heartsArray.map((_, idx) => {
        const startX = Math.random() * 100;
        const delay = Math.random() * 5;
        const size = Math.floor(Math.random() * 25) + 15;
        return (
          <motion.span
            key={idx}
            className="absolute select-none text-pink-500"
            style={{
              left: `${startX}%`,
              fontSize: `${size}px`,
            }}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: "-10%", opacity: 1 }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              delay,
            }}
          >
            ♥
          </motion.span>
        );
      })}
    </>
  );
};

const ValentinePrompt = ({ onAccept, onNoHover, noButtonPos }) => (
  <div className="flex flex-col items-center justify-center space-y-8 relative">
    <img
      src= {PleaseImg}
      alt="Please be my Valentine"
      width={250}
      height={250}
      className="rounded-full shadow-lg"
    />

    <h1 className="text-center text-5xl font-bold text-pink-900 font-dancing">
      Will you be my Valentine? <span className="animate-pulse">💖</span>
    </h1>

    <div className="flex space-x-6 relative">
      <Button onClick={onAccept}>Yes</Button>

      <motion.button
        className={`
          absolute 
          px-10 py-4 
          text-2xl 
          font-extrabold 
          rounded-full 
          shadow-2xl 
          focus:outline-none 
          text-rose-600 
          bg-white 
          border-4 
          border-rose-400 
          hover:bg-rose-100
          transition-all
          duration-300
          ease-in-out
          select-none
        `}
        style={{
          transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
        }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={onNoHover}
      >
        No 😢
      </motion.button>
    </div>
  </div>
);

const ItineraryPreview = ({ onShowItinerary }) => (
  <div className="flex flex-col items-center justify-center space-y-6">
    <img
      src={HappyTomImg}
      alt="Yay!"
      width={200}
      height={200}
      className="rounded-full shadow-md"
    />
    <h2 className="text-4xl font-bold text-pink-900 font-dancing text-center">
      YAY! I have planned everything! 💕
    </h2>
    <Button onClick={onShowItinerary}>View the itinerary</Button>
  </div>
);

const ItineraryList = ({ activities }) => (
  <div className="flex flex-col items-center justify-center space-y-8">
    <h1 className="text-5xl font-bold text-pink-900 font-dancing">
      Our Valentine's Itinerary <span className="animate-bounce">💕</span>
    </h1>
    <ul className="mt-6 space-y-4 text-2xl text-pink-600">
      {activities.map((activity, index) => (
        <motion.li
          key={index}
          whileHover={{ scale: 1.05 }}
          className="bg-pink-200 px-6 py-3 rounded-full shadow-lg text-center font-semibold"
        >
          {activity}
        </motion.li>
      ))}
    </ul>
  </div>
);

export default function ValentineDatePlanner() {
  const [accepted, setAccepted] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const handleNoHover = () => {
    const randomX = (Math.random() - 0.5) * 400;
    const randomY = (Math.random() - 0.5) * 300;
    setNoButtonPos({ x: randomX, y: randomY });
  };

  const activities = [
    "Eat dinner that I cook 🍽️❤️",
    "Watch movies 🎬🍿",
    "Secret😉",
  ];

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-pink-100 overflow-hidden">
      <AnimatedHearts />

      <div
        className="
          z-10 
          bg-white 
          bg-opacity-90 
          w-full 
          max-w-3xl 
          mx-6 
          p-12 
          rounded-3xl 
          shadow-2xl 
          flex 
          flex-col 
          items-center 
          space-y-12
          text-center
        "
      >
        {!accepted ? (
          <ValentinePrompt
            onAccept={() => setAccepted(true)}
            onNoHover={handleNoHover}
            noButtonPos={noButtonPos}
          />
        ) : !showItinerary ? (
          <ItineraryPreview onShowItinerary={() => setShowItinerary(true)} />
        ) : (
          <ItineraryList activities={activities} />
        )}
      </div>
    </div>
  );
}
