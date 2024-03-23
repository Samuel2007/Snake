import { useEffect, useState } from "react";

const leftBoundry = [0, 11, 22, 33, 44, 55, 66, 77, 88, 99, 110];
const rightBoundry = [10, 21, 32, 43, 54, 65, 76, 87, 98, 109, 120];

export const useGameOver = (
  currentCells: number[],
  lastPressedArrow: string | null
) => {
  const [isGameOver, setIsGameOver] = useState(false);
  useEffect(() => {
    currentCells.every((cell) => {
      if (currentCells.filter((item) => item === cell).length > 1) {
        setIsGameOver(true);
      }
    });
    if (
      currentCells[0] > 120 ||
      currentCells[0] < 0 ||
      (leftBoundry.includes(currentCells[0]) && lastPressedArrow === "Right") ||
      (rightBoundry.includes(currentCells[0]) && lastPressedArrow === "Left")
    ) {
      setIsGameOver(true);
    }
  }, [currentCells, lastPressedArrow]);

  return { isGameOver, setIsGameOver };
};
