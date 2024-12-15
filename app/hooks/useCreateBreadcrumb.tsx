import { useQuery } from "@tanstack/react-query";
import useLayoutStore from "../stores/layoutStore";
import { clientKey, projectKey, SOWKey } from "~/utils/queryKeys";
import { getClient, getProject } from "~/api/handler/client";
import { getSOW } from "~/api/handler/SOW";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "@remix-run/react";
import { capitalize } from "~/utils/capitalize";

export const useCreateBreadcrumb = () => {
  const params = useParams();
  const location = useLocation();
  const clientId = params.clientId;
  const projectId = params.projectId;
  const SOWId = params.SOWId;
  const addBreadcrumb = useLayoutStore((state) => state.addBreadcrumb);
  const hasClient = Object.keys(params).includes("clientId");
  const hasProject = Object.keys(params).includes("projectId");
  const hasSOW = Object.keys(params).includes("SOWId");

  const { data: client } = useQuery({
    queryKey: [clientKey(clientId as string)],
    queryFn: () => getClient(clientId as string),
    enabled: params && hasClient,
    select: (data) => data.data,
  });

  const { data: project } = useQuery(
    [projectKey(projectId as string)],
    () => getProject(clientId as string, projectId as string),
    {
      enabled: !!location,
      select: (data) => data.data,
    },
  );

  const { data: SOW } = useQuery(
    [SOWKey(SOWId as string)],
    () => getSOW(projectId as string, SOWId as string),
    {
      enabled: !!location && !!params,
      select: (data) => data.data,
    },
  );
  useEffect(() => {
    if (hasClient && client) {
      addBreadcrumb({
        title: (
          <Link to={`/clients/${clientId}`}>{capitalize(client.name)}</Link>
        ),
      });
    }
    if (hasProject && project) {
      addBreadcrumb({
        title: (
          <Link to={`/clients/${clientId}/${projectId}`}>
            {capitalize(project.name)}
          </Link>
        ),
      });
    }
    if (hasSOW && SOW) {
      addBreadcrumb({
        title: (
          <Link to={`/clients/${clientId}/${projectId}/${SOWId}`}>
            {capitalize(SOW.phase_title)}
          </Link>
        ),
      });
    }
  }, [SOW, addBreadcrumb, client, hasClient, hasProject, hasSOW, project]);
};
