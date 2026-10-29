import Header from "@/components/header/Header";
import Workspace from "@/components/Workspace";
import { initialGenerations } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Header />
      <Workspace initialGenerations={initialGenerations} />
    </>
  );
}
