import React from "react";
import styles from "./cell.module.css";

type CellProps = {
  index: number;
  isSelected?: boolean;
};

function Cell({ index, isSelected }: CellProps) {
  return <div className={styles.cell}>{index}</div>;
}

export default Cell;
