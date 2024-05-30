import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container max-w-screen-lg space-y-4">
      <p>
        This demo shows domain verification, once you have verified the domain 
        ownership you can then setup a Federated Enterprise Connection with Home
        Realm Discovery.
      </p>
      <div>
        <Link href="/onboarding/start">
          <Button>Get Started</Button>
        </Link>
      </div>
    </main>
  );
}
