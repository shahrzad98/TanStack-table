import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { AbilityContext, defineAbilitiesFor } from "./config/ability";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import userStore from "./stores/userStore";
import { IUserResponse } from "./types/user";
import { PureAbility } from "@casl/ability";
import { notification } from "./components";
import { theme } from "./styles";
import { IError } from "./types/global";
import { MetaFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import { ClerkProvider } from "@clerk/clerk-react";

import globalStyles from "~/styles/global.scss?url";
import variables from "~/styles/_variables.scss?url";
import createCache from "@emotion/cache";
import { useEffect, useState } from "react";
import useLayoutStore from "~/stores/layoutStore";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export function links() {
  return [
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: variables },
  ];
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>An error occurred!</title>
      </head>
      <body>
        <ScrollRestoration />
        <Scripts />

        <main>
          {isRouteErrorResponse(error) ? (
            <>
              <h1>
                {error.status} {error.statusText}
              </h1>
              <p>{error.data}</p>
            </>
          ) : error instanceof Error ? (
            <>
              <p>{error.message}</p>
              <p>The stack trace is:</p>
              <pre>{error.stack}</pre>
            </>
          ) : null}
        </main>
      </body>
    </html>
  );
}

export const meta: MetaFunction = () => [
  {
    title: "Div Operation",
  },
  {
    name: "viewport",
    content: "width=device-width,initial-scale=1",
  },
];

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (e) =>
        notification.error((e as IError)?.message || "Something went wrong!"),
    },
  },
});

const App = () => {
  const setBreadcrumbs = useLayoutStore((state) => state.setBreadcrumbs);
  const location = useLocation();
  useEffect(() => {
    setBreadcrumbs(undefined);
  }, [location]);

  function fieldMatcher(field, subject: string) {
    if (typeof field === "function") {
      return field(subject);
    }
    return field === subject;
  }

  const currentUser = userStore((state) => state.currentUser);
  const rules = defineAbilitiesFor(currentUser?.data as IUserResponse);
  // @ts-ignore
  const ability = new PureAbility(rules, { fieldMatcher, conditionsMatcher });

  function conditionsMatcher(
    conditions: { [key: string]: string },
    subject: { [key: string]: string },
  ) {
    if (!conditions || !subject) return false;
    return Object.keys(conditions).every((key) => {
      return conditions[key as string] === subject[key];
    });
  }

  const cache = createCache({
    key: "custom-css",
  });

  const [rendered, setRendered] = useState<number>();

  useEffect(() => {
    setRendered(Date.now());
  }, []);

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <CacheProvider value={cache}>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <QueryClientProvider client={client}>
              <ThemeProvider theme={theme}>
                <AbilityContext.Provider value={ability}>
                  {rendered && <Outlet />}
                  <Scripts />
                  <ScrollRestoration />
                </AbilityContext.Provider>
              </ThemeProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ClerkProvider>
        </CacheProvider>
      </body>
    </html>
  );
};

export default App;
