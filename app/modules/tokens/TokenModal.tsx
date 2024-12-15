import JiraIcon from "../../modules/assets/jira.svg";
import TogglIcon from "../../modules/assets/toggl.svg";
import { Form, Formik } from "formik";
import { ITokenData, ITokenRequest } from "../../types/token";
import { TokenSchema } from "../../validation/token.schema";

import {
  DivoButton,
  FormItem,
  Modal,
  DivoSelect,
  DivoInput,
} from "../../components";

const options = [
  {
    label: (
      <>
        <JiraIcon />
        Jira Token
      </>
    ),
    value: "jira",
    key: 0,
  },
  {
    label: (
      <>
        <TogglIcon />
        Toggl Token
      </>
    ),
    value: "toggl",
    key: 1,
  },
];

interface TokenModalProps {
  open: boolean;
  title: string;
  initialData?: ITokenData | null;
  handleClose: () => void;
  onSubmit: (values: ITokenRequest) => void;
}

export const TokenModal = ({
  open = false,
  title = "",
  initialData = null,
  handleClose = () => {},
  onSubmit = () => {},
}: TokenModalProps) => {
  const initialValues: ITokenRequest = initialData
    ? {
        name: initialData?.name,
        account_type: initialData?.account_type,
        token: initialData?.token,
        email: initialData?.email,
        domain: initialData?.domain,
      }
    : {
        name: "",
        account_type: "jira",
        token: "",
        email: "",
        domain: "",
      };

  return (
    <Modal
      title={title}
      open={open}
      width={420}
      onCancel={handleClose}
      footer={null}
      destroyOnClose
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={TokenSchema}
        validateOnMount
        enableReinitialize
      >
        {({ isSubmitting, isValid, values, setFieldValue }) => (
          <Form>
            <DivoInput name="name" placeholder="Manual Input" />
            <FormItem label="Account Type">
              <DivoSelect
                onChange={(type) => setFieldValue("account_type", type)}
                placeholder={
                  values?.account_type === "jira" ? (
                    <>
                      <JiraIcon />
                      Jira Token
                    </>
                  ) : (
                    <>
                      <TogglIcon />
                      Toggl Token
                    </>
                  )
                }
                options={options}
                size="large"
                data-cy="token-account-type"
              />
            </FormItem>
            <DivoInput name="token" placeholder="Manual Input" />
            <DivoInput name="email" placeholder="Manual Input" />
            <DivoInput
              name="domain"
              placeholder="https://divnotes.atlassian.net/"
            />
            <DivoButton
              htmlType="submit"
              disabled={isSubmitting || !isValid}
              variant="primary"
              size="large"
              style={{ width: initialData?.name ? 223 : 82, fontSize: 14 }}
            >
              {initialData?.name ? "Save Token" : "Save"}
            </DivoButton>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
