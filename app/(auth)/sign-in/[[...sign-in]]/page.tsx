import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <p>HIII</p>
      <SignIn />
    </div>
  );
}