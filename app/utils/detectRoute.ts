export const detectRoute = (
  pathNames: string[],
  searchParams?: URLSearchParams,
) => ({
  [pathNames.includes("clients").toString()]: "clients",
  [pathNames.includes("clientId").toString()]: "projects",
  [pathNames.includes("projectId").toString()]: "SOWs",
  [pathNames.includes("SOWId").toString()]: "ScheduleCs",
  [pathNames.includes("employees").toString()]: "employees",
  [pathNames.includes("tokens").toString()]: "tokens",
  [Object.keys(searchParams ?? {})
    .includes("generalSetting")
    .toString()]: "general settings",
});
