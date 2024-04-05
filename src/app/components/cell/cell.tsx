import React from "react";
import styles from "./cell.module.css";
import Fruit from "../fruit/fruit";

type CellProps = {
  otherColor: boolean;
  isFruitOnCell: boolean;
  isSelected?: boolean;
  isHead: boolean;
};

const getCellStyles = (isHead: boolean, isSelected?: boolean) => {
  if (isHead) {
    return styles.snakeHead;
  }
  if (isSelected) {
    return styles.selectedCell;
  }
};

function Cell({ otherColor, isFruitOnCell, isSelected, isHead }: CellProps) {
  return (
    <div
      className={`${styles.baseCell} ${
        otherColor && styles.differentColorCell
      }`}
    >
      <div className={` ${getCellStyles(isHead, isSelected)}`}></div>
      {isFruitOnCell && <Fruit />}
    </div>
  );
}

export default Cell;
