import { ErrorMessage, FieldHookConfig, useField } from "formik";
import { DivoInput } from "~/components";
import styled from "@emotion/styled";
import { capitalize } from "~/utils/capitalize";
import { InputType } from "~/types/global";
import { InputProps, SelectProps, Space } from "antd";
import { ReactNode } from "react";
import dayjs from "dayjs";

const StyledWrapper = styled("div")(({ theme }) => ({
  marginBottom: 24,
  ".errorMessage": {
    color: theme.error,
    margin: 0,
    fontSize: 10,
  },
  "&& .ant-space": {
    width: "100%",
  },
}));

interface DivoFormItemProps extends SelectProps {
  name?: string;
  label?: string;
  required?: boolean;
  inputType?: InputType;
  uploadSize?: { width: number | string; height: number | string };
  uploadTitle?: string;
  placeholder?: string;
  hasError?: boolean;
  icon?: ReactNode;
}

export const DivoFormItem = (props: DivoFormItemProps) => {
  const [field, meta, helpers] = useField(
    props as string | FieldHookConfig<any>,
  );
  const { error, touched } = meta;
  return (
    <StyledWrapper>
      <Space direction="vertical">
        <div>
          <label htmlFor={props.name}>
            {props.label ?? capitalize(props.name ?? "")}
          </label>
          {props.required && <span> *</span>}
        </div>
        <DivoInput
          uploadTitle={props.uploadTitle}
          hasError={!!error && touched}
          inputType={props.inputType}
          uploadSize={props.uploadSize}
          placeholder={props.placeholder}
          {...field}
          {...(props as InputProps)}
          onChange={(e, date?) => {
            const isValueDate = dayjs(e).isValid();
            helpers.setValue(
              isValueDate
                ? dayjs(date as string)
                : e?.metaColor
                ? e.toHexString()
                : typeof e === "string"
                ? e
                : e.target.value,
            );
          }}
        />
      </Space>
      <ErrorMessage
        name={props.name ?? ""}
        component="p"
        className="errorMessage"
      />
    </StyledWrapper>
  );
};
