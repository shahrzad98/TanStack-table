import { Form, Formik, FormikProps } from "formik";
import { ClientSchema } from "~/validation";
import { DivoFormItem, DivoModal, notification } from "~/components";
import { Col, Row } from "antd";
import styled from "@emotion/styled";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createClient,
  editClient,
  getRemoteProjects,
} from "~/api/handler/client";
import {
  clientsKey,
  jiraRemoteClientsKey,
  togglRemoteClientsKey,
} from "~/utils/queryKeys";
import { IClientRequest, IRemoteTogglProject } from "~/types/client";
import { useLocation } from "@remix-run/react";

const StyledWrapper = styled("div")(() => ({
  ".ant-upload .ant-upload-select": {
    width: 126,
  },
  ".w-100": {
    width: "100%",
  },
}));

interface AddClientProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isEdit?: boolean;
  clientId?: string;
  initialData?: IClientRequest;
}

export const AddClient = ({
  open,
  setOpen,
  isEdit,
  clientId,
  initialData,
}: AddClientProps) => {
  const [isDirty, setIsDirty] = useState(false);
  const location = useLocation();
  const formRef = useRef<FormikProps<IClientRequest> | null>(null);

  const queryClient = useQueryClient();
  const initialValues = {
    name: "",
    code: "",
    color: "",
    is_active: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    issue_tracker_account_id: "",
    time_tracker_account_id: "",
  };
  const { data: jiraProjects, isLoading: jiraProjectsLoading } = useQuery(
    [jiraRemoteClientsKey],
    () => getRemoteProjects("jira"),
    {
      select: (data) => data?.data,
      enabled: !!location,
    },
  );
  const { data: togglProjects, isLoading: togglProjectsLoading } = useQuery(
    [togglRemoteClientsKey],
    () => getRemoteProjects("toggl"),
    {
      select: (data) => data?.data,
      enabled: !!location,
    },
  );
  const { mutate: handleCreateClient, isLoading: createClientLoading } =
    useMutation({
      mutationFn: (values: IClientRequest) => createClient(values),
      onSuccess: () => {
        void queryClient.invalidateQueries([clientsKey]);
        notification.success("Client created successfully!");
      },
      onSettled: () => setOpen(false),
    });
  const { mutate: handleUpdateClient, isLoading: updateClientLoading } =
    useMutation({
      mutationFn: (values: IClientRequest) =>
        editClient(clientId as string, values),
      onSuccess: () => {
        void queryClient.invalidateQueries([clientsKey]);
        notification.success("Client updated successfully!");
      },
      onSettled: () => setOpen(false),
    });

  function handleSubmitForm(values: IClientRequest) {
    isEdit ? handleUpdateClient(values) : handleCreateClient(values);
  }

  return (
    <DivoModal
      destroyOnClose
      width={700}
      open={open}
      onCancel={() => setOpen(false)}
      title={`${isEdit ? "Edit" : "Add"} Client`}
      okText="save"
      cancelText="cancel"
      okDisabled={!isDirty}
      onOk={() => formRef?.current?.handleSubmit()}
      confirmLoading={createClientLoading || updateClientLoading}
    >
      <StyledWrapper>
        <Formik
          innerRef={formRef}
          initialValues={
            isEdit
              ? ({
                  ...initialData,
                  is_active: initialData?.is_active.toString(),
                } as IClientRequest)
              : initialValues
          }
          validationSchema={ClientSchema}
          onSubmit={handleSubmitForm}
          enableReinitialize
        >
          {(props) => {
            setIsDirty(props.dirty);

            return (
              <Form>
                <Row>
                  <Col className="gutter-row" span={6}>
                    <DivoFormItem
                      name="logo"
                      inputType="upload"
                      uploadTitle="a logo"
                      uploadSize={{ width: 126, height: 126 }}
                    />
                  </Col>
                  <Col span={18}>
                    <DivoFormItem name="name" required label="Client Name" />
                    <Row justify="end" gutter={20}>
                      <Col span={7}>
                        <DivoFormItem
                          name="code"
                          label="Client Code"
                          required
                        />
                      </Col>
                      <Col span={10}>
                        <DivoFormItem
                          name="color"
                          label="Client Color"
                          required
                          options={[{ value: "#8413D0FF", label: "#8413D0FF" }]}
                          inputType="colorPicker"
                        />
                      </Col>
                      <Col span={7}>
                        <DivoFormItem
                          name="is_active"
                          label="Status"
                          inputType="select"
                          options={[
                            { value: "true", label: "Active" },
                            { value: "false", label: "Inactive" },
                          ]}
                          required
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row justify="end" gutter={20}>
                  <Col span={8}>
                    <DivoFormItem
                      name="contact_name"
                      label="Contact Name"
                      required
                    />
                  </Col>
                  <Col span={8}>
                    <DivoFormItem
                      name="contact_email"
                      label="Contact Email"
                      required
                    />
                  </Col>
                  <Col span={8}>
                    <DivoFormItem
                      name="contact_phone"
                      label="Contact Phone"
                      required
                    />
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={12}>
                    <DivoFormItem
                      name="issue_tracker_client_name"
                      label="Jira Project"
                      inputType="select"
                      loading={jiraProjectsLoading}
                      options={jiraProjects?.map((J) => ({
                        value: JSON.stringify({
                          time_tracker_client_id: J.id,
                          time_tracker_account_id: J.account_id,
                        }),
                        label: J.name,
                      }))}
                      required
                    />
                  </Col>
                  <Col span={12}>
                    <DivoFormItem
                      name="time_tracker_client_name"
                      label="Toggl Client"
                      inputType="select"
                      loading={togglProjectsLoading}
                      options={(togglProjects as IRemoteTogglProject[])?.map(
                        (T) => ({
                          value: JSON.stringify({
                            time_tracker_client_id: T.id,
                            time_tracker_account_id: T.account_id,
                            time_tracker_workspace_id: T.workspace_id,
                          }),
                          label: T.name ?? "-",
                        }),
                      )}
                      required
                    />
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </StyledWrapper>
    </DivoModal>
  );
};
