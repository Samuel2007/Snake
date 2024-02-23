"use client";
import React, { useEffect, useState } from "react";
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

function mapNewSnake(snakeArray: number[], firstCellOffset: number) {
  return snakeArray.map((value, index) => {
    if (index === 0) {
      return value + firstCellOffset;
    } else {
      return snakeArray[index - 1];
    }
  });
}

function Grid({ index, isSelected }: GridProps) {
  const [currentCells, setCurrentCells] = useState([60, 61, 62]);
  const [cellWithFruit, setCellWithFruit] = useState(generateRandom());

  const inputHandler = ({ key }: KeyHandlerType) => {
    switch (key) {
      case "ArrowDown":
        setCurrentCells((currentValues) => {
          if (currentValues[0] >= 110) {
            return [60];
          }
          return mapNewSnake(currentValues, 11);
        });
        break;
      case "ArrowUp":
        setCurrentCells((currentValues) => {
          if (currentValues[0] <= 10) {
            return [60];
          }

          return mapNewSnake(currentValues, -11);
        });
        break;
      case "ArrowLeft":
        setCurrentCells((currentValues) => {
          if (leftBoundry.includes(currentValues[0])) {
            return [60];
          }
          return mapNewSnake(currentValues, -1);
        });
        break;
      case "ArrowRight":
        setCurrentCells((currentValues) => {
          if (rightBoundry.includes(currentValues[0])) {
            return [60];
          }
          return mapNewSnake(currentValues, 1);
        });
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
