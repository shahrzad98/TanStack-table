import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    remix({
      ssr: false,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      routes: async (defineRoutes) => {
        // If you need to do async work, do it before calling `defineRoutes`, we use
        // the call stack of `route` inside to set nesting.

        return defineRoutes((route) => {
          route("clients/:clientId", "routes/projects.tsx");
          route("clients/:clientId/:projectId/", "routes/SOWs.tsx");
          route(
            "clients/:clientId/:projectId/:SOWId/",
            "routes/scheduleCs.tsx",
          );
          route(
            "clients/:clientId/:projectId/:SOWId/:scheduleCId/",
            "routes/datagrid.tsx",
          );
        });
      },
    }),
    tsconfigPaths(),
  ],
});

export default config;
