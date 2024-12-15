import { api } from "~/api/apiClient";
import { IJiraUserResponse } from "~/types/jiraUser";

export const getJiraUsers = () => api.get<IJiraUserResponse>("/jira/users");
