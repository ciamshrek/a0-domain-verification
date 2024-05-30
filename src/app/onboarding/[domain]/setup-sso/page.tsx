import {
  AppRouterPageRoute,
  WithPageAuthRequiredAppRouterOptions,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";

async function WorkInProgress() {
  return (
    <main className="container max-w-screen-lg space-y-4">
      <h1 className="text-2xl">Work in Progress</h1>
      <p>Unfortunately, this is where the demo ends. For now!</p>
    </main>
  );
}

export default withPageAuthRequired(
  WorkInProgress as AppRouterPageRoute,
  {
    returnTo({ params }: { params: { domain: string } }) {
      return `/onboarding/${params.domain}/setup-sso`;
    },
  } as WithPageAuthRequiredAppRouterOptions
);
