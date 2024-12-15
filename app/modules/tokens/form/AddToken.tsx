import { Form, Formik, FormikProps } from "formik";
import { DivoFormItem, DivoModal, notification } from "~/components";
import { Col, Row } from "antd";
import styled from "@emotion/styled";
import { capitalize } from "~/utils/capitalize";
import { Dispatch, SetStateAction, useRef, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tokensKey } from "~/utils/queryKeys";
import { createToken, editToken } from "~/api/handler/token";
import { TokenSchema } from "~/validation/token.schema";
import { ITokenRequest } from "~/types/token";
import { useLocation } from "@remix-run/react";

const StyledWrapper = styled("div")(() => ({
  ".ant-upload .ant-upload-select": {
    width: 126,
  },
  ".w-100": {
    width: "100%",
  },
}));

interface AddTokenProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isEdit?: boolean;
  tokenId?: string;
  initialData?: ITokenRequest;
}

export const AddToken = ({
  open,
  setOpen,
  tokenId,
  initialData,
  isEdit,
}: AddTokenProps) => {
  const [isDirty, setIsDirty] = useState(false);
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);
  const formRef = useRef<FormikProps<ITokenRequest> | null>(null);

  const queryClient = useQueryClient();

  const initialValues = {
    name: "",
    kind: "",
    email: "",
    token: "",
    domain: "",
  };

  const { mutate: handleCreateToken, isLoading: createTokenLoading } =
    useMutation({
      mutationFn: (values: ITokenRequest) => createToken(values),
      onSuccess: () => {
        void queryClient.invalidateQueries([tokensKey]);
        notification.success("Token created successfully!");
      },
      onSettled: () => setOpen(false),
    });

  const { mutate: handleUpdateToken, isLoading: updateTokenLoading } =
    useMutation({
      mutationFn: (values: ITokenRequest) =>
        editToken(tokenId as string, values),
      onSuccess: () => {
        notification.success("Token updated successfully!");
        void queryClient.invalidateQueries([tokensKey]);
      },
      onSettled: () => setOpen(false),
    });

  function handleSubmitForm(values: ITokenRequest) {
    isEdit ? handleUpdateToken(values) : handleCreateToken(values);
  }

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
      confirmLoading={createTokenLoading || updateTokenLoading}
    >
      <StyledWrapper>
        <Formik
          innerRef={formRef}
          initialValues={
            isEdit ? (initialData as ITokenRequest) : initialValues
          }
          validationSchema={TokenSchema}
          onSubmit={handleSubmitForm}
          enableReinitialize
        >
          {(props) => {
            setIsDirty(props.dirty);

            return (
              <Form>
                <DivoFormItem name="name" required />
                <Row justify="end" gutter={20}>
                  <Col span={8}>
                    <DivoFormItem
                      name="kind"
                      label="Accout Type"
                      required
                      inputType="select"
                      options={[
                        { value: "toggle", label: "Toggl" },
                        { value: "jira", label: "Jira" },
                      ]}
                    />
                  </Col>
                  <Col span={16}>
                    <DivoFormItem name="token" required />
                  </Col>
                </Row>
                <Row justify="end" gutter={20}>
                  <Col span={12}>
                    <DivoFormItem
                      name="email"
                      label="Token Owner Email"
                      required
                    />
                  </Col>
                  <Col span={12}>
                    <DivoFormItem name="domain" />
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
