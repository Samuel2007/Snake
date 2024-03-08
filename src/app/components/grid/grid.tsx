"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./grid.module.css";
import Cell from "../cell/cell";

const leftBoundry = [0, 11, 22, 33, 44, 55, 66, 77, 88, 99, 110];
const rightBoundry = [10, 21, 32, 43, 54, 65, 76, 87, 98, 109, 120];

type GridProps = {
  index: number;
  isSelected?: boolean;
};

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

function Grid({ index, isSelected }: GridProps) {
  const [currentCells, setCurrentCells] = useState([60, 61, 62]);
  const [cellWithFruit, setCellWithFruit] = useState(generateRandom());

  const temporaryCellWithFruit = useRef(cellWithFruit);
  temporaryCellWithFruit.current = cellWithFruit;

  const currentIntervalRef: { current: NodeJS.Timeout | null } = useRef(null);
  const lastPressedArrow: { current: string | null } = useRef(null);

  // const {isGameOver, setIsGameOver} = useGameOver(currentCells)

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
        if (lastPressedArrow.current === "Down") {
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
        if (lastPressedArrow.current === "Up") {
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
        if (lastPressedArrow.current === "Left") {
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
        if (lastPressedArrow.current === "Right") {
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

  return (
    <div className={styles.grid}>
      {cells.map((cell, index) => (
        <Cell
          key={cell}
          index={index}
          otherColor={index % 2 === 0}
          isSelected={currentCells.includes(cell)}
          isFruitOnCell={cell === cellWithFruit}
        />
      ))}
    </div>
  );
}

export default Grid;
