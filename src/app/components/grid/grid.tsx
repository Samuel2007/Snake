import React from "react";
import styles from "./grid.module.css";

type GridProps = {
  index: number;
  isSelected?: boolean;
};

function Grid({ index, isSelected }: GridProps) {
  return <div className={styles.cell}>{index}</div>;
}

export default Grid;
