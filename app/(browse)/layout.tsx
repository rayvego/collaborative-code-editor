import React from "react";
import { Navbar } from "@/app/(browse)/_components/navbar";
import { Container } from "@/app/(browse)/_components/container";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className={"flex h-full pt-20"}></div>
      <Container>{children}</Container>
    </>
  );
};

export default BrowseLayout;