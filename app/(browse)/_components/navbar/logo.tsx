import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <Link href={"/"}>
      <div className={"flex items-center gap-x-4 hover:opacity-75 transition pl-10"}>
        <div>
          <p className={"text-lg font-semibold"}>Raycode</p>
          <p className={"text-xs text-muted-foreground"}>Code Together!</p>
        </div>
      </div>
    </Link>
  );
};