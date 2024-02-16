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

function Grid({ index, isSelected }: GridProps) {
  const [currentCell, setCurrentCell] = useState(60);
  const [cellWithFruit, setCellWithFruit] = useState(generateRandom());

  const inputHandler = ({ key }: KeyHandlerType) => {
    switch (key) {
      case "ArrowDown":
        setCurrentCell((currentValue) => {
          if (currentValue >= 110) {
            return 60;
          }
          return currentValue + 11;
        });
        break;
      case "ArrowUp":
        setCurrentCell((currentValue) => {
          if (currentValue <= 10) {
            return 60;
          }
          return currentValue - 11;
        });
        break;
      case "ArrowLeft":
        setCurrentCell((currentValue) => {
          if (leftBoundry.includes(currentValue)) {
            return 60;
          }
          return currentValue - 1;
        });
        break;
      case "ArrowRight":
        setCurrentCell((currentValue) => {
          if (rightBoundry.includes(currentValue)) {
            return 60;
          }
          return currentValue + 1;
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
    if (cellWithFruit === currentCell) {
      setCellWithFruit(generateRandom());
    }
  }, [currentCell, cellWithFruit]);

  return (
    <div className={styles.grid}>
      {cells.map((cell, index) => (
        <Cell
          key={cell}
          index={index}
          otherColor={index % 2 === 0}
          isSelected={cell === currentCell}
          isFruitOnCell={cell === cellWithFruit}
        />
      ))}
    </div>
  );
}

export default Grid;
