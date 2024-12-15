import { Form, Formik, FormikProps } from "formik";
import { DivoFormItem, DivoModal, notification } from "~/components";
import { Col, Row } from "antd";
import styled from "@emotion/styled";
import { capitalize } from "~/utils/capitalize";
import { Dispatch, SetStateAction, useRef, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generalSettingsKey } from "~/utils/queryKeys";
import { IGeneralSetting } from "~/types/token";
import { createGeneralSetting, editGeneralSetting } from "~/api/handler/token";
import { useLocation } from "@remix-run/react";

const StyledWrapper = styled("div")(() => ({}));

interface AddGeneralSettingProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isEdit?: boolean;
  settingId?: string;
  initialData?: IGeneralSetting;
}

export const AddGeneralSetting = ({
  open,
  setOpen,
  settingId,
  initialData,
  isEdit,
}: AddGeneralSettingProps) => {
  const [isDirty, setIsDirty] = useState(false);
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);
  const formRef = useRef<FormikProps<IGeneralSetting> | null>(null);

  const queryClient = useQueryClient();

  const initialValues = {
    key: "",
    value: "",
  };

  const {
    mutate: handleCreateGeneralSetting,
    isLoading: createGeneralSettingLoading,
  } = useMutation({
    mutationFn: (values: IGeneralSetting) =>
      createGeneralSetting({ general_setting: values }),
    onSuccess: () => {
      void queryClient.invalidateQueries([generalSettingsKey]);
      notification.success("General Setting created successfully!");
    },
    onSettled: () => setOpen(false),
  });

  const {
    mutate: handleUpdateGeneralSetting,
    isLoading: updateGeneralSettingLoading,
  } = useMutation({
    mutationFn: (values: IGeneralSetting) =>
      editGeneralSetting(settingId as string, { general_setting: values }),
    onSuccess: () => {
      notification.success("General Setting created successfully!");
      void queryClient.invalidateQueries([generalSettingsKey]);
    },
    onSettled: () => setOpen(false),
  });

  function handleSubmitForm(values: IGeneralSetting) {
    isEdit
      ? handleUpdateGeneralSetting(values)
      : handleCreateGeneralSetting(values);
  }

  return (
    <DivoModal
      width={700}
      open={open}
      onCancel={() => setOpen(false)}
      title={pathNames.length && `Add ${capitalize(pathNames[0].slice(0, -1))}`}
      okText="save"
      cancelText="cancel"
      okDisabled={!isDirty}
      onOk={() => formRef?.current?.handleSubmit()}
      confirmLoading={
        createGeneralSettingLoading || updateGeneralSettingLoading
      }
    >
      <StyledWrapper>
        <Formik
          innerRef={formRef}
          initialValues={
            isEdit ? (initialData as IGeneralSetting) : initialValues
          }
          onSubmit={handleSubmitForm}
          enableReinitialize
        >
          {(props) => {
            setIsDirty(props.dirty);
            return (
              <Form>
                <Row justify="end" gutter={20}>
                  <Col span={24}>
                    <DivoFormItem name="key" />
                  </Col>
                  <Col span={24}>
                    <DivoFormItem name="value" />
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
