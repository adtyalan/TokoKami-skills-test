"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroButton() {
  const Router = useRouter();
  return (
    <Button
      onClick={() => {
        Router.push("/products");
      }}
      className="text-sm p-4 cursor-pointer"
      variant={"default"}
    >
      Jelajahi
      <ShoppingBag />
    </Button>
  );
}
