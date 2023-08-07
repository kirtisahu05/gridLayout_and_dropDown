import "./styles.css";
import React, { useEffect, useRef, useState } from "react";
import { numInWords } from "../../Utils";

const ReactGridLayout = ({ columns, numOfBoxes }) => {
  const containerRef = useRef(null);
  const [visibleBoxes, setVisibleBoxes] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const { scrollTop } = containerRef.current;
    setScrollPosition(scrollTop);
  };

  useEffect(() => {
    const calculateVisibleBoxes = () => {
      const containerHeight = containerRef.current.clientHeight;
      const boxHeight = containerHeight / Math.ceil(numOfBoxes / columns);
      const startIndex = Math.floor(scrollPosition / boxHeight) * columns;
      const endIndex = Math.min(startIndex + columns * 2, numOfBoxes); // 2 rows at a time

      setVisibleBoxes((prevVisibleBoxes) => {
        const newVisibleBoxes = [];
        for (let i = startIndex; i < endIndex; i++) {
          if (!prevVisibleBoxes.includes(i)) {
            console.log(`${i + 1} WAS CALLED`);
            newVisibleBoxes.push(i);
          }
        }
        return [...prevVisibleBoxes, ...newVisibleBoxes];
      });
    };

    calculateVisibleBoxes();
  }, [numOfBoxes, columns, scrollPosition]);

  return (
    <div
      className="grid-container"
      ref={containerRef}
      style={{ "--grid-columns": columns }}
      onScroll={handleScroll}
    >
      {Array.from({ length: numOfBoxes }, (val, index) => (
        <div className="grid-card" key={index}>
          {numInWords(index + 1).toUpperCase()}
          {val}
        </div>
      ))}
    </div>
  );
};

export default ReactGridLayout;
