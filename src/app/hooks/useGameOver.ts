import { useEffect, useState } from "react";

export const useGameOver = (currentCells: number[]) => {
  const [isGameOver, setIsGameOver] = useState(false);
  useEffect(() => {}, [currentCells]);
  return isGameOver;
};
