import { Form, Formik, FormikProps } from "formik";
import { DivoFormItem, DivoModal, notification } from "~/components";
import { Col, Row } from "antd";
import styled from "@emotion/styled";
import { capitalize } from "~/utils/capitalize";
import { Dispatch, SetStateAction, useRef, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { employeesKey, jiraUsersKey, rolesKey } from "~/utils/queryKeys";
import { createEmployee, editEmployee } from "~/api/handler/employees";
import { getJiraUsers } from "~/api/handler/jira";
import { getRoles } from "~/api/handler/role";
import { IEmployeeData, IEmployeeRequest } from "~/types/employee";
import { EmployeeSchema } from "~/validation";
import dayjs from "dayjs";
import { useLocation } from "@remix-run/react";

const StyledWrapper = styled("div")(() => ({
  ".ant-upload .ant-upload-select": {
    width: 126,
  },
  ".w-100": {
    width: "100%",
  },
}));

const initialValues = {
  first_name: "",
  email: "",
  personal_email: "",
  phone_number: "",
  active: "true",
  role_id: "",
  jira_account: "",
  birth_date: "",
  date_started: "",
  contract_renewal_date: "",
};
interface AddEmployeeProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isEdit?: boolean;
  employeeId?: string;
  initialData?: Partial<IEmployeeData>;
}

export const AddEmployee = ({
  open,
  setOpen,
  isEdit,
  employeeId,
  initialData,
}: AddEmployeeProps) => {
  const [isDirty, setIsDirty] = useState(false);
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);
  const formRef = useRef<FormikProps<IEmployeeRequest> | null>(null);
  const queryClient = useQueryClient();
  const { data: jiraUsers } = useQuery([jiraUsersKey], () => getJiraUsers(), {
    initialData: queryClient.getQueryData([jiraUsersKey]),
    select: (data) => data.data,
  });

  const { data: userRoles } = useQuery([rolesKey], () => getRoles(), {
    initialData: queryClient.getQueryData([rolesKey]),
    select: (data) => data.data,
  });

  const { mutate: handleCreateEmployee, isLoading: createEmployeeLoading } =
    useMutation({
      mutationFn: (values: IEmployeeRequest) => {
        const newValues = { ...values };
        newValues.jira_account =
          typeof values.jira_account == "string"
            ? JSON.parse(values.jira_account)
            : values.jira_account;

        return createEmployee(newValues);
      },
      onSuccess: () => {
        notification.success("Employee created successfully!");
        void queryClient.invalidateQueries([employeesKey]);
      },
      onSettled: () => {
        setOpen(false);
      },
    });
  const { mutate: handleUpdateEmployee, isLoading: updateEmployeeLoading } =
    useMutation({
      mutationFn: (values: IEmployeeRequest) =>
        editEmployee(employeeId as string, values),
      onSuccess: () => {
        notification.success("Employee updated successfully!");
      },
      onSettled: () => {
        setOpen(false);
        void queryClient.invalidateQueries([employeesKey]);
      },
    });

  function handleSubmitForm(values: IEmployeeRequest) {
    isEdit ? handleUpdateEmployee(values) : handleCreateEmployee(values);
  }

  const localInitialData = {
    ...initialData,
    first_name: initialData?.user?.first_name,
    email: initialData?.user?.email,
    phone_number: initialData?.user?.phone_number,
    role_id: capitalize(initialData?.role?.name ?? ""),
    active: initialData?.active?.toString(),
    birth_date: initialData?.birth_date
      ? dayjs(initialData?.birth_date)
      : undefined,
    date_started: initialData?.date_started
      ? dayjs(initialData?.date_started)
      : undefined,
    contract_renewal_date: initialData?.contract_renewal_date
      ? dayjs(initialData?.contract_renewal_date)
      : undefined,
  };

  return (
    <DivoModal
      destroyOnClose
      width={700}
      open={open}
      onCancel={() => setOpen(false)}
      title={pathNames.length && `Add ${capitalize(pathNames[0].slice(0, -1))}`}
      okText="save"
      cancelText="cancel"
      okDisabled={!isDirty}
      onOk={() => formRef?.current?.handleSubmit()}
      confirmLoading={createEmployeeLoading || updateEmployeeLoading}
    >
      <StyledWrapper>
        <Formik
          innerRef={formRef}
          initialValues={isEdit ? localInitialData : initialValues}
          validationSchema={EmployeeSchema}
          onSubmit={handleSubmitForm}
          enableReinitialize
        >
          {(props) => {
            setIsDirty(props.dirty);
            return (
              <Form>
                <Row>
                  <Col className="gutter-row" span={5}>
                    <DivoFormItem
                      name="avatar"
                      inputType="upload"
                      uploadTitle="Image"
                      uploadSize={{ width: 126, height: 126 }}
                    />
                  </Col>
                  <Col span={19}>
                    <Row justify="end">
                      <Row
                        className="w-100"
                        justify="space-between"
                        gutter={20}
                      >
                        <Col span={24}>
                          <DivoFormItem
                            name="first_name"
                            label="Name"
                            required
                          />
                        </Col>
                      </Row>
                      <Row
                        className="w-100"
                        justify="space-between"
                        gutter={20}
                      >
                        <Col span={12}>
                          <DivoFormItem
                            name="role_id"
                            label="Role"
                            required
                            options={userRoles?.map((el) => ({
                              value: el.id,
                              label: capitalize(el.name.replace("_", " ")),
                            }))}
                            inputType="select"
                          />
                        </Col>
                        <Col span={12}>
                          <DivoFormItem
                            name="active"
                            label="Status"
                            required
                            options={[
                              { label: "Active", value: "true" },
                              { label: "Inactive", value: "false" },
                            ]}
                            inputType="select"
                          />
                        </Col>
                      </Row>
                    </Row>
                  </Col>
                </Row>

                <Row gutter={20}>
                  <Col span={8}>
                    <DivoFormItem name="email" label="Email" required />
                  </Col>
                  <Col span={8}>
                    <DivoFormItem
                      label="Personal Email"
                      name="personal_email"
                      required
                    />
                  </Col>
                  <Col span={8}>
                    <DivoFormItem name="phone_number" label="Phone" required />
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={8}>
                    <DivoFormItem
                      name="birth_date"
                      label="Birthday"
                      inputType="datePicker"
                      required
                    />
                  </Col>
                  <Col span={8}>
                    <DivoFormItem
                      label="Date Started"
                      name="date_started"
                      inputType="datePicker"
                      required
                    />
                  </Col>
                  <Col span={8}>
                    <DivoFormItem
                      name="contract_renewal_date"
                      label="Contract Renewal Date"
                      inputType="datePicker"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <DivoFormItem
                      name="jira_account"
                      label="Jira User"
                      inputType="select"
                      options={jiraUsers?.map((item) => ({
                        value: JSON.stringify({
                          account_id: item.account_id,
                          remote_id: item.remote_id,
                        }),
                        label: item.name,
                      }))}
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
