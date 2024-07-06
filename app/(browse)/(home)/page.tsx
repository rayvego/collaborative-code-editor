import Image from "next/image";
import { Button } from "@/components/ui/button";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="flex h-screen flex-col items-center justify-evenly p-20">
      <div className={"flex flex-col items-center justify-between gap-y-2"}>
        <h1 className="text-4xl font-bold">Welcome to Raycode!</h1>
        <h3 className={"text-xl font-bold"}>Code Together</h3>
      </div>
      <div className={"w-full flex flex-row justify-evenly"}>
        <Card className={"w-[350px] pb-5"}>
          <CardHeader>
            <CardTitle>Start right away!</CardTitle>
            <CardDescription>Create a new file</CardDescription>
          </CardHeader>
          <div className={"flex items-center flex-col "}>
            <Link href={`/${user?.username}/editor`}>
              <Button>Go to Editor</Button>
            </Link>
          </div>
        </Card>

        <Card className={"w-[350px] pb-5"}>
          <CardHeader>
            <CardTitle>Join a Room</CardTitle>
            <CardDescription>Code together</CardDescription>
          </CardHeader>
          <div className={"flex items-center flex-col "}>
            <Link href={"/somewhere"}>
              <Button>Enter Room Code</Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}