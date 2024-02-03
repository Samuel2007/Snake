// grid 10x10

import Cell from "./components/cell/cell";

// arr = [1,2,3] ->  arr.map(() => <Cell />)

export default function Home() {
  return (
    <div className="grid">
      <Cell index={1} />
    </div>
  );
}
