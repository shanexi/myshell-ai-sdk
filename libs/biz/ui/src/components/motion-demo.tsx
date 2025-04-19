import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const MotionDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [visibleItems, setVisibleItems] = useState([true, true, true, true]);

  const toggleBottomSheet = () => setIsOpen(!isOpen);

  const toggleHeight = (index: number) => {
    const newExpandedItems = [...expandedItems];
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
  };

  const toggleVisibility = (index: number) => {
    const newVisibleItems = [...visibleItems];
    newVisibleItems[index] = !newVisibleItems[index];
    setVisibleItems(newVisibleItems);
  };

  const isAnyItemVisible = visibleItems.some((item) => item);

  return (
    <div className="relative h-[400px] w-full flex flex-col items-center p-4 border rounded-md">
      <div className="flex gap-2 mb-4">
        <button
          onClick={toggleBottomSheet}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {isOpen ? 'Close Bottom Sheet' : 'Open Bottom Sheet'}
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={`height-${index}`}
            onClick={() => toggleHeight(index)}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            {expandedItems[index]
              ? `Shrink ${index + 1}`
              : `Expand ${index + 1}`}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={`visibility-${index}`}
            onClick={() => toggleVisibility(index)}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            {visibleItems[index] ? `Hide ${index + 1}` : `Show ${index + 1}`}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && isAnyItemVisible && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl overflow-hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <AnimatePresence>
              {visibleItems.map(
                (isVisible, index) =>
                  isVisible && (
                    <motion.div
                      key={`item-${index}`}
                      className="border-b last:border-b-0"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: expandedItems[index] ? 100 : 50,
                        opacity: 1,
                      }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        type: 'spring',
                        damping: 20,
                        stiffness: 200,
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        Item {index + 1} -{' '}
                        {expandedItems[index] ? 'Expanded' : 'Collapsed'}
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
