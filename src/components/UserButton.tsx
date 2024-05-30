"use client";
import { UserCircle } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function UserButton() {
  const { isLoading, user } = useUser();

  if (isLoading) {
    return (
      <Button size={"sm"} variant={"ghost"}>
        <Skeleton className="h-6 w-20 rounded-full" />
      </Button>
    );
  }

  if (user) {
    return (
      <Button size={"sm"} variant={"ghost"}>
        <a className="flex items-center space-x-2" href="/api/auth/logout">
          <Avatar className="w-6 h-6 inline-block">
            <AvatarImage src={user.picture!} alt={user.name!} />
            <AvatarFallback>{user.name?.substring(0, 2)}</AvatarFallback>
          </Avatar>{" "}
          <p>Logout</p>
        </a>
      </Button>
    );
  }

  return (
    <>
      <Button asChild size={"sm"} className="rounded-full text-black" variant={"outline"}>
        <a className="flex items-center space-x-2" href={`/api/auth/login`}>
          <p>Login</p>
        </a>
      </Button>
    </>
  );
}
