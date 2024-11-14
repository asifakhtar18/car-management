import React, { memo } from "react";
import { m, motion } from "framer-motion";

const Loading = memo(() => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center">
        <motion.h1
          className="text-5xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Car Management
        </motion.h1>
        <div className="flex justify-center space-x-4 mb-12">
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="w-16 h-16 bg-white rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                times: [0, 0.6, 1],
                repeat: Infinity,
                repeatDelay: 0.5,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
        <motion.div
          className="w-64 h-2 bg-white/30 rounded-full mx-auto overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: 256 }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        >
          <motion.div
            className="w-full h-full bg-white rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>
        <motion.p
          className="text-white mt-8 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Loading your inventory...
        </motion.p>
      </div>
    </div>
  );
});

export default Loading;
