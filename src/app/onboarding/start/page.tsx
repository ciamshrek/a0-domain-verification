import { DomainForm } from "@/components/DomainForm";
import { AppRouterPageRoute, WithPageAuthRequiredAppRouterOptions, withPageAuthRequired } from "@auth0/nextjs-auth0";

async function StartPage(_: { params: {}}) {
  return (
    <main className="container max-w-screen-lg">
      <DomainForm />
    </main>
  );
}

export default withPageAuthRequired(StartPage as AppRouterPageRoute, {
  returnTo({ params }: { params: { domain: string } }) {
    return `/onboarding/start`;
  },
} as WithPageAuthRequiredAppRouterOptions);
