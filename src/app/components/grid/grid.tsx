"use client";
import React, { useEffect } from "react";
import styles from "./grid.module.css";
import Cell from "../cell/cell";

type GridProps = {
  index: number;
  isSelected?: boolean;
};

function Grid({ index, isSelected }: GridProps) {
  useEffect(() => {
    const downHandler = ({ key }) => {
      //ArrowUp
      //ArrowDown

      console.log(key);
    };

    window.addEventListener("keydown", downHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);

  const cells = Array.from({ length: 121 }, (e, i) => i);
  console.log(cells);
  return (
    <div className={styles.grid}>
      {cells.map((cell, index) => (
        <Cell
          key={cell}
          index={index}
          isFruitOnCell={false}
          otherColor={index % 2 === 0}
        />
      ))}
    </div>
  );
}

export default Grid;
