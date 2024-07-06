import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { FaCode } from "react-icons/fa";
import Link from "next/link";

const Actions = async () => {
  const user = await currentUser();

  return (
    <div className={"flex items-center justify-end gap-x-2 ml-4 lg:ml-0"}>
      {!user && (
        <SignInButton>
          <Button>Login</Button>
        </SignInButton>
      )}
      {!!user && (
        <div className={"flex items-center gap-x-4"}>
          <Button size={"sm"} variant={"ghost"} className={"bg-gray-50 foreground hover:bg-gray-100"} asChild>
            <Link href={`/dashboard/${user.id}`}>
              <FaCode className={"h-5 w-5 mr-2"} />
              <span className={"hidden lg:block"}>Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl={"/"} />
        </div>
      )}
    </div>
  );
};

export default Actions;