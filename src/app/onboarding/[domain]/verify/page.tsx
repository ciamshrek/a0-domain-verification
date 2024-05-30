import { AppRouterPageRoute, WithPageAuthRequiredAppRouterOptions, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { createDomainBodySchema } from "./createDomainBodySchema";
import { isDomainVerified } from "./verifyDns";
import { Button } from "@/components/ui/button";
import { createTxtRecords } from "./createTxtRecords";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function VerificationPage({ params }: { params: { domain: string } }) {
  const session = await getSession();

  // Need to do with page auth required
  if (session?.user === undefined) {
    return redirect("/");
  }

  const parsedParams = createDomainBodySchema.safeParse(params);
  if (!parsedParams.success) {
    return redirect("/start");
  }

  const { domain } = parsedParams.data;

  const result = await isDomainVerified(domain, session.user.sub);

  if (result.status === "verified") {
    return (
      <main className="container max-w-screen-lg space-y-4">
        <h1 className="text-2xl">Congratulations!</h1>
        <p>
          You have successfully verified ownership, of{" "}
          <span className="font-bold">{domain}</span>
          now lets setup Identity Provider Federation and SCIM.
        </p>
        <div>
          <Link href={`/onboarding/${domain}/setup-sso`}>
            <Button>Next</Button>
          </Link>
        </div>
      </main>
    );
  }

  const records = await createTxtRecords(domain, session.user.sub);

  return (
    <main className="container max-w-screen-lg space-y-4">
      <h1 className="text-2xl">Domain Verification Required</h1>
      <p>
        In order to prove that you own{" "}
        <span className="font-bold">{domain}</span> please set the following DNS
        records. Once setup all your users will be able to use their{" "}
        <span className="font-bold">@{domain}</span> emails to login to
        auth101.dev
      </p>

      <div>
        <h3 className="uppercase text-xs font-semibold mb-2">Record Type</h3>
        <p className="bg-black text-white rounded-md p-2 font-mono">TXT</p>
      </div>

      <div>
        <h3 className="uppercase text-xs font-semibold mb-2">Domain Name</h3>
        <p className="bg-black text-white rounded-md p-2 font-mono">
          {records.domain}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Tip: Some DNS vendors only ask for the first part, which would be{" "}
          {records.domain.split(".")[0]}
        </p>
      </div>

      <div>
        <h3 className="uppercase text-xs font-semibold mb-2">Record Value</h3>
        <p className="bg-black text-white rounded-md p-2 break-all font-mono">
          {records.txt}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          We generate a new token each time, you do not need to update the new
          token each time.
        </p>
      </div>

      <div>
        <h3 className="uppercase text-xs font-semibold mb-2">TTL(optional)</h3>
        <p className="bg-black text-white rounded-md p-2 break-all font-mono">
          600
        </p>
      </div>

      <p className="text-xs text-gray-400">
        DNS Changes can take upto 5 minutes to populate
      </p>
      <div className="space-x-4">
        <Link href={`?t=${Date.now()}`} prefetch={false}>
          <Button>Retry</Button>
        </Link>
        <Link href={`/onboarding/start`} prefetch={false}>
          <Button variant={"secondary"}>Change Domain</Button>
        </Link>
      </div>
    </main>
  );
}

export default withPageAuthRequired(VerificationPage as AppRouterPageRoute, {
  returnTo({ params }: { params: { domain: string } }) {
    return `/onboarding/${params.domain}/verify`;
  },
} as WithPageAuthRequiredAppRouterOptions);
