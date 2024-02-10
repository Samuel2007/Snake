import React from "react";
import styles from "./cell.module.css";
import Fruit from "../fruit/fruit";

type CellProps = {
  index: number;
  otherColor: boolean;
  isFruitOnCell: boolean;
  isSelected?: boolean;
};

function Cell({ index, otherColor, isFruitOnCell, isSelected }: CellProps) {
  return (
    <div className={otherColor ? styles.cell : styles.differentColorCell}>
      {isFruitOnCell && <Fruit />}
    </div>
  );
}

export default Cell;
