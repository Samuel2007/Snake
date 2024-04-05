"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./grid.module.css";
import Cell from "../cell/cell";
import { useGameOver } from "@/app/hooks/useGameOver";
import GameOverUi from "../gameOverUi/gameOverUi";

type KeyHandlerType = {
  key: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
};

function generateRandom() {
  return Math.floor(Math.random() * 121);
}

function mapNewSnake(
  snakeArray: number[],
  firstCellOffset: number,
  cellWithFruit: number
) {
  const updatedSnakeArray = snakeArray.map((value, index) => {
    if (index === 0) {
      return value + firstCellOffset;
    } else {
      return snakeArray[index - 1];
    }
  });
  if (cellWithFruit === snakeArray[0] + firstCellOffset) {
    return [...updatedSnakeArray, ...snakeArray.slice(-1)];
  }
  return updatedSnakeArray;
}

function Grid() {
  const [currentCells, setCurrentCells] = useState([60, 61, 62]);
  const [cellWithFruit, setCellWithFruit] = useState(generateRandom());

  const temporaryCellWithFruit = useRef(cellWithFruit);
  temporaryCellWithFruit.current = cellWithFruit;

  const currentIntervalRef: { current: NodeJS.Timeout | null } = useRef(null);
  const lastPressedArrow: { current: string | null } = useRef(null);

  const { isGameOver, setIsGameOver } = useGameOver(
    currentCells,
    lastPressedArrow.current
  );

  const inputHandler = ({ key }: KeyHandlerType) => {
    function setCellsDirection(firstCellOffset: number) {
      setCurrentCells((currentValues) => {
        return mapNewSnake(
          currentValues,
          firstCellOffset,
          temporaryCellWithFruit.current
        );
      });
    }

    switch (key) {
      case "ArrowDown":
        console.log("currentIntervalRef.current", currentIntervalRef.current);
        if (
          lastPressedArrow.current === "Down" ||
          lastPressedArrow.current === "Up"
        ) {
          break;
        }

        if (currentIntervalRef.current) {
          clearInterval(currentIntervalRef.current);
        }

        setCellsDirection(11);
        currentIntervalRef.current = setInterval(() => {
          setCellsDirection(11);
        }, 300);
        lastPressedArrow.current = "Down";
        break;

      case "ArrowUp":
        if (
          lastPressedArrow.current === "Up" ||
          lastPressedArrow.current === "Down"
        ) {
          break;
        }

        if (currentIntervalRef.current) {
          clearInterval(currentIntervalRef.current);
        }

        setCellsDirection(-11);
        currentIntervalRef.current = setInterval(() => {
          setCellsDirection(-11);
        }, 300);
        lastPressedArrow.current = "Up";
        break;

      case "ArrowLeft":
        if (
          lastPressedArrow.current === "Left" ||
          lastPressedArrow.current === "Right"
        ) {
          break;
        }

        if (currentIntervalRef.current) {
          clearInterval(currentIntervalRef.current);
        }

        setCellsDirection(-1);
        currentIntervalRef.current = setInterval(() => {
          setCellsDirection(-1);
        }, 300);
        lastPressedArrow.current = "Left";
        break;

      case "ArrowRight":
        if (
          lastPressedArrow.current === "Right" ||
          lastPressedArrow.current === "Left" ||
          !lastPressedArrow.current
        ) {
          break;
        }

        if (currentIntervalRef.current) {
          clearInterval(currentIntervalRef.current);
        }

        setCellsDirection(1);
        currentIntervalRef.current = setInterval(() => {
          setCellsDirection(1);
        }, 300);
        lastPressedArrow.current = "Right";
        break;
    }
  };

  useEffect(() => {
    // @ts-ignore
    window.addEventListener("keydown", inputHandler);

    return () => {
      // @ts-ignore
      window.removeEventListener("keydown", inputHandler);
    };
  }, []);

  const cells = Array.from({ length: 121 }, (e, i) => i);

  useEffect(() => {
    if (currentCells.includes(cellWithFruit)) {
      setCellWithFruit(generateRandom());
    }
  }, [currentCells, cellWithFruit]);

  const handlePlayAgin = () => {
    setIsGameOver(false);
    setCurrentCells([60, 61, 62]);
    setCellWithFruit(generateRandom());
    lastPressedArrow.current = null;
    if (currentIntervalRef.current) {
      clearInterval(currentIntervalRef.current);
    }
  };

  return (
    <div className={styles.grid}>
      {cells.map((cell, index) => (
        <Cell
          key={cell}
          otherColor={index % 2 === 0}
          isHead={cell === currentCells[0] && !isGameOver}
          isSelected={currentCells.includes(cell) && !isGameOver}
          isFruitOnCell={cell === cellWithFruit}
        />
      ))}
      <GameOverUi
        isGameOver={isGameOver}
        handlePlayAgin={handlePlayAgin}
        snakeLength={currentCells.length}
      />
    </div>
  );
}

export default Grid;
