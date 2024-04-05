import dynamic from "next/dynamic";

const Grid = dynamic(() => import("./components/grid/grid"), { ssr: false });

export default function Home() {
  return (
    <div className="grid">
      <Grid />
    </div>
  );
}
