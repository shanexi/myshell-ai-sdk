import { useState, useRef } from 'react';
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
  // This flag is used to determine if the parent container is being animated
  const isParentAnimatingRef = useRef(false);

  const toggleBottomSheet = () => {
    isParentAnimatingRef.current = true;
    setIsOpen(!isOpen);
  };

  const toggleHeight = (index: number) => {
    isParentAnimatingRef.current = false;
    const newExpandedItems = [...expandedItems];
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
  };

  const toggleVisibility = (index: number) => {
    isParentAnimatingRef.current = false;
    const newVisibleItems = [...visibleItems];
    newVisibleItems[index] = !newVisibleItems[index];
    setVisibleItems(newVisibleItems);
  };

  const isAnyItemVisible = visibleItems.some((item) => item);

  return (
    <div className="relative flex h-[600px] w-full flex-col items-center rounded-md border p-4">
      <div className="mb-4 flex gap-2">
        <button
          onClick={toggleBottomSheet}
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          {isOpen ? 'Close Bottom Sheet' : 'Open Bottom Sheet'}
        </button>
      </div>

      <div className="mb-4 flex gap-2">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={`height-${index}`}
            onClick={() => toggleHeight(index)}
            className="rounded-md bg-green-500 px-4 py-2 text-white"
          >
            {expandedItems[index]
              ? `Shrink ${index + 1}`
              : `Expand ${index + 1}`}
          </button>
        ))}
      </div>

      <div className="mb-4 flex gap-2">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={`visibility-${index}`}
            onClick={() => toggleVisibility(index)}
            className="rounded-md bg-red-500 px-4 py-2 text-white"
          >
            {visibleItems[index] ? `Hide ${index + 1}` : `Show ${index + 1}`}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && isAnyItemVisible && (
          <motion.div
            className="absolute right-0 bottom-0 left-0 overflow-hidden rounded-t-xl bg-white shadow-lg"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'tween',
              ease: 'easeInOut',
              duration: 0.4,
            }}
            onAnimationStart={() => {
              isParentAnimatingRef.current = true;
            }}
            onAnimationComplete={() => {
              isParentAnimatingRef.current = false;
            }}
          >
            <AnimatePresence>
              {visibleItems.map(
                (isVisible, index) =>
                  isVisible && (
                    <motion.div
                      key={`item-${index}`}
                      className="border-b last:border-b-0"
                      initial={
                        !isParentAnimatingRef.current
                          ? { height: 0, opacity: 0 }
                          : {
                              height: expandedItems[index] ? 100 : 50,
                              opacity: 1,
                            }
                      }
                      animate={{
                        height: expandedItems[index] ? 100 : 50,
                        opacity: 1,
                      }}
                      exit={
                        !isParentAnimatingRef.current
                          ? { height: 0, opacity: 0 }
                          : {
                              height: expandedItems[index] ? 100 : 50,
                              opacity: 1,
                            }
                      }
                      transition={
                        !isParentAnimatingRef.current
                          ? {
                              type: 'tween',
                              ease: 'easeInOut',
                              duration: 0.4,
                            }
                          : { duration: 0 }
                      }
                    >
                      <div className="flex h-full w-full items-center justify-center bg-gray-100">
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
