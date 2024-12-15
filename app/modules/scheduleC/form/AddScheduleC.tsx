import { Form, Formik, FormikProps } from "formik";
import { DivoFormItem, DivoModal, notification } from "~/components";
import { Col, Row } from "antd";
import styled from "@emotion/styled";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scheduleCsKey } from "~/utils/queryKeys";
import { IScheduleCBody } from "~/types/scheduleC";
import { createScheduleC } from "~/api/handler/scheduleC";
import { useLocation, useParams } from "@remix-run/react";

const StyledWrapper = styled("div")(() => ({
  ".ant-upload .ant-upload-select": {
    width: 126,
  },
  ".w-100": {
    width: "100%",
  },
}));

interface AddScheduleCProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isEdit?: boolean;
  scheduleCId?: string;
  initialData?: IScheduleCBody;
}

export const AddScheduleC = ({
  open,
  setOpen,
  isEdit,
  initialData,
}: AddScheduleCProps) => {
  const [isDirty, setIsDirty] = useState(false);
  const params = useParams();
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);
  const formRef = useRef<FormikProps<IScheduleCBody> | null>(null);

  const queryClient = useQueryClient();

  const initialValues = {
    name: "",
    status: null,
  };

  const { mutate: handleCreateScheduleC, isLoading: createScheduleCLoading } =
    useMutation({
      mutationFn: (values: IScheduleCBody) =>
        createScheduleC(
          params.projectId as string,
          params.SOWId as string,
          values,
        ),
      onSuccess: () => {
        void queryClient.invalidateQueries([scheduleCsKey]);
        notification.success("ScheduleC created successfully!");
      },
      onSettled: () => setOpen(false),
    });

  function handleSubmitForm(values: IScheduleCBody) {
    handleCreateScheduleC(values);
  }

  return (
    <DivoModal
      destroyOnClose
      width={700}
      open={open}
      onCancel={() => setOpen(false)}
      title={pathNames.length && `${isEdit ? "Edit" : "Add"} Version`}
      okText="save"
      cancelText="cancel"
      okDisabled={!isDirty}
      onOk={() => formRef?.current?.handleSubmit()}
      confirmLoading={createScheduleCLoading}
    >
      <StyledWrapper>
        <Formik
          innerRef={formRef}
          initialValues={
            isEdit ? (initialData as IScheduleCBody) : initialValues
          }
          onSubmit={handleSubmitForm}
          enableReinitialize
        >
          {(props) => {
            setIsDirty(props.dirty);

            return (
              <Form>
                <Row>
                  <Col span={24}>
                    <DivoFormItem name="name" label="Version Name" required />
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
