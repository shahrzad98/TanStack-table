import { Form, Formik, FormikProps } from "formik";
import { DivoFormItem, DivoModal, notification } from "~/components";
import { Col, Row } from "antd";
import styled from "@emotion/styled";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SOWsKey, trackersKey } from "~/utils/queryKeys";
import { createSOW, editSOW } from "~/api/handler/SOW";
import { SOWSchema } from "~/validation";
import { ISOWRequest } from "~/types/SOW";
import { getTrackers } from "~/api/handler/client";
import GoogleDriveIcon from "../../icons/GoogleDrive";
import TogglIcon from "../../icons/Toggl";
import JiraIcon from "../../icons/Jira";
import { useLocation, useParams } from "@remix-run/react";

const StyledWrapper = styled("div")(() => ({
  ".tracker": {
    alignItems: "center",
    justifyContent: "start",
    svg: {
      marginRight: 10,
    },
  },
}));

interface AddSOWProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isEdit?: boolean;
  SOWId?: string;
  initialData?: ISOWRequest;
}

export const AddSOW = ({
  open,
  setOpen,
  SOWId,
  initialData,
  isEdit,
}: AddSOWProps) => {
  const [isDirty, setIsDirty] = useState(false);
  const location = useLocation();
  const params = useParams();
  const formRef = useRef<FormikProps<ISOWRequest> | null>(null);

  const queryClient = useQueryClient();

  const initialValues = {
    phase_title: "",
    phase_number: "",
    doc: "",
    status: null,
    kind: null,
    start_date: "",
    end_date: "",
    hour_limit: "",
    price_limit: "",
    trackers: null,
  };

  const { data: trackers } = useQuery(
    [trackersKey],
    () => getTrackers(params.clientId as string),
    {
      initialData: queryClient.getQueryData([trackersKey]),
      select: (data) => data?.data,
      enabled: !!location,
    },
  );
  const { mutate: handleCreateSOW, isLoading: createSOWLoading } = useMutation({
    mutationFn: (values: ISOWRequest) =>
      createSOW(params.projectId as string, values),
    onSuccess: () => {
      void queryClient.invalidateQueries([SOWsKey]);
      notification.success("SOW created successfully!");
    },
    onSettled: () => setOpen(false),
  });

  const { mutate: handleUpdateSOW, isLoading: updateSOWLoading } = useMutation({
    mutationFn: (values: ISOWRequest) =>
      editSOW(params.projectId as string, SOWId as string, values),
    onSuccess: () => {
      notification.success("SOW updated successfully!");
      void queryClient.invalidateQueries([SOWsKey]);
    },
    onSettled: () => setOpen(false),
  });

  function handleSubmitForm(values: ISOWRequest) {
    isEdit ? handleUpdateSOW(values) : handleCreateSOW(values);
  }

  return (
    <DivoModal
      destroyOnClose
      width={700}
      open={open}
      onCancel={() => setOpen(false)}
      title={`${isEdit ? "Edit" : "Add"} SOW`}
      okText="save"
      cancelText="cancel"
      okDisabled={!isDirty}
      onOk={() => formRef?.current?.handleSubmit()}
      confirmLoading={createSOWLoading || updateSOWLoading}
    >
      <StyledWrapper>
        <Formik
          innerRef={formRef}
          initialValues={isEdit ? (initialData as ISOWRequest) : initialValues}
          validationSchema={SOWSchema}
          onSubmit={handleSubmitForm}
          enableReinitialize
        >
          {(props) => {
            setIsDirty(props.dirty);
            return (
              <Form>
                <Row justify="end" gutter={20}>
                  <Col span={10}>
                    <DivoFormItem
                      name="kind"
                      label="Type"
                      required
                      inputType="select"
                      options={[
                        { value: "t_and_m", label: "T & M" },
                        { value: "phase", label: "Phase" },
                      ]}
                    />
                  </Col>
                  <Col span={14}>
                    <DivoFormItem
                      name="phase_title"
                      label="SOW Name"
                      required
                    />
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={14}>
                    <DivoFormItem
                      name="jira"
                      label="Jira Version"
                      inputType="select"
                      options={trackers
                        ?.filter((el) => el.kind === "issue_tracker")
                        .map((item) => ({
                          label: (
                            <Row className="tracker">
                              <JiraIcon />
                              {item.name}
                            </Row>
                          ),
                          value: item.id,
                        }))}
                    />
                  </Col>
                  <Col span={10}>
                    <DivoFormItem
                      name="toggle"
                      label="Toggl Project"
                      inputType="select"
                      options={trackers
                        ?.filter((el) => el.kind === "time_tracker")
                        .map((item) => ({
                          label: (
                            <Row className="tracker">
                              <TogglIcon />
                              {item.name}
                            </Row>
                          ),
                          value: item.id,
                        }))}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <DivoFormItem name="doc" label="Schedule B link" />
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={8}>
                    <DivoFormItem name="services" inputType="select" />
                  </Col>
                  <Col span={8}>
                    <DivoFormItem
                      name="status"
                      inputType="select"
                      options={[
                        { value: "draft", label: "Draft" },
                        { value: "client_review", label: "Client Review" },
                        { value: "approved", label: "Approved" },
                        { value: "rejected", label: "Rejected" },
                        { value: "completed", label: "Completed" },
                      ]}
                    />
                  </Col>
                  <Col span={8}>
                    <DivoFormItem name="substatus" disabled />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <DivoFormItem
                      name="doc"
                      label="Internal Drive link"
                      icon={<GoogleDriveIcon />}
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
