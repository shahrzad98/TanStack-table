import { Form, Formik, FormikProps } from "formik";
import { ProjectSchema } from "~/validation";
import { DivoFormItem, DivoModal, notification } from "~/components";
import { Col, Row } from "antd";
import styled from "@emotion/styled";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProjects, updateProject } from "~/api/handler/project";
import { projectsKey } from "~/utils/queryKeys";
import { IProject } from "~/types/project";
import { IProjectData } from "~/types/client";
import { useLocation, useSearchParams } from "@remix-run/react";

const StyledWrapper = styled("div")(() => ({
  ".ant-upload .ant-upload-select": {
    width: 126,
  },
  ".w-100": {
    width: "100%",
  },
}));

interface AddProjectProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isEdit?: boolean;
  initialData?: IProjectData;
  projectId?: string;
}

export const AddProject = ({
  open,
  setOpen,
  isEdit,
  initialData,
  projectId,
}: AddProjectProps) => {
  const [isDirty, setIsDirty] = useState(false);
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("clientId");

  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);
  const formRef = useRef<FormikProps<IProject> | null>(null);

  const initialValues = {
    code: "",
    name: "",
    status: null,
  };
  const { mutate: handleUpdateProject, isLoading: updateProjectLoading } =
    useMutation({
      mutationFn: (values: IProject) =>
        updateProject(projectId as string, {
          clientId: clientId as string,
          project: values,
        }),
      onSuccess: () => {
        void queryClient.invalidateQueries([projectsKey]);
        notification.success("Project updated successfully!");
      },
      onSettled: () => setOpen(false),
    });

  const { mutate: handleCreateProject, isLoading: createProjectLoading } =
    useMutation({
      mutationFn: (values: IProject) =>
        createProjects({
          clientId: clientId as string,
          project: values,
        }),
      onSuccess: () => {
        void queryClient.invalidateQueries([projectsKey]);
        notification.success("Project created successfully!");
      },
      onSettled: () => setOpen(false),
    });
  function handleSubmitForm(values: IProject) {
    isEdit ? handleUpdateProject(values) : handleCreateProject(values);
  }

  return (
    <DivoModal
      destroyOnClose
      width={700}
      open={open}
      onCancel={() => setOpen(false)}
      title={pathNames.length && `${isEdit ? "Edit" : "Add"} Project`}
      okText="save"
      cancelText="cancel"
      okDisabled={!isDirty}
      onOk={() => formRef?.current?.handleSubmit()}
      confirmLoading={createProjectLoading || updateProjectLoading}
    >
      <StyledWrapper>
        <Formik
          innerRef={formRef}
          initialValues={isEdit ? (initialData as IProject) : initialValues}
          validationSchema={ProjectSchema}
          onSubmit={handleSubmitForm}
          enableReinitialize
        >
          {(props) => {
            setIsDirty(props.dirty);

            return (
              <Form>
                <Row justify="end" gutter={20}>
                  <Col span={6}>
                    <DivoFormItem name="code" label="Project Code" required />
                  </Col>
                  <Col span={18}>
                    <DivoFormItem name="name" label="Project Name" required />
                  </Col>
                </Row>

                <Row>
                  <Col span={6}>
                    <DivoFormItem
                      name="status"
                      label="Status"
                      inputType="select"
                      options={[
                        { value: "discovery", label: "Discovery" },
                        { value: "lost", label: "Lost" },
                        { value: "sales", label: "Sales" },
                        { value: "won", label: "Won" },
                        { value: "estimation", label: "Estimation" },
                      ]}
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
