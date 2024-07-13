import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

const PositionContext = createContext();

export const usePositionContext = () => useContext(PositionContext);

export const PositionProvider = ({ children }) => {
  const activeStreakRef = useRef(null);

  const [targetX, setTargetX] = useState(0);
  const [targetY, setTargetY] = useState(0);

  const calculateTargetPosition = (dailyTaskRef) => {
    console.log('---before if', activeStreakRef, dailyTaskRef)

    console.log('---calculateTargetPosition', activeStreakRef, dailyTaskRef)
    if (activeStreakRef.current && dailyTaskRef) {
      console.log('---inside if', activeStreakRef, dailyTaskRef)

      const activeStreakRect = activeStreakRef.current.getBoundingClientRect();
      const dailyTaskRect = dailyTaskRef.getBoundingClientRect();

      const targetX = activeStreakRect.left - dailyTaskRect.left;
      const targetY = activeStreakRect.top - dailyTaskRect.top + 50;

      setTargetX(targetX);
      setTargetY(targetY);

      document.documentElement.style.setProperty('--targetX', `${targetX}px`);
      document.documentElement.style.setProperty('--targetY', `${targetY}px`);
      console.log('---targetPosition', targetX, targetY)
    }

    console.log('---outside if', activeStreakRef, dailyTaskRef)

  };

  useEffect(() => {
    calculateTargetPosition();
  }, []);

  return (
    <PositionContext.Provider value={{ activeStreakRef, calculateTargetPosition }}>
      {children}
    </PositionContext.Provider>
  );
};
