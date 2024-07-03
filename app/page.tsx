import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Hello World!</h1>
      <Button>Test!!</Button>
    </main>
  );
}