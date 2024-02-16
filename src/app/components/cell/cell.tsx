import React from "react";
import styles from "./cell.module.css";
import Fruit from "../fruit/fruit";

type CellProps = {
  index: number;
  otherColor: boolean;
  isFruitOnCell: boolean;
  isSelected?: boolean;
};

const getCellStyles = (otherColor: boolean, isSelected?: boolean) => {
  if (isSelected) {
    return styles.selectedCell;
  }
  if (otherColor) {
    return styles.differentColorCell;
  }
  return styles.cell;
};

function Cell({ index, otherColor, isFruitOnCell, isSelected }: CellProps) {
  return (
    <div
      className={`${styles.baseCell} ${getCellStyles(otherColor, isSelected)}`}
    >
      {index}
      {isFruitOnCell && <Fruit />}
    </div>
  );
}

export default Cell;
