import {
  ColorPicker,
  ColorPickerProps,
  DatePicker,
  Input,
  InputProps,
  Row,
  Select,
  SelectProps,
  Upload,
  UploadProps,
} from "antd";
import styled, { StyledComponent } from "@emotion/styled";
import { ReactNode, useState } from "react";
import { InputType } from "~/types/global";
import { HiChevronDown as ChevronDownIcon } from "react-icons/hi2";
import { TextAreaProps } from "antd/es/input";

interface DivoInputProps extends InputProps {
  inputType?: InputType;
  icon?: ReactNode;
  uploadSize?: { width: number | string; height: number | string };
  uploadTitle?: string;
  hasError?: boolean;
  color?: string | undefined;
}

const StyledWrapper: StyledComponent<DivoInputProps> = styled("div")(({
  theme,
  uploadSize,
  hasError,
}) => {
  return {
    ".chevronDown": {
      alignSelf: "center",
    },
    "& .ant-select , textArea": {
      height: 38,
      borderColor: theme.secondaryColor,
    },
    "&& .ant-select-selector": {
      minWidth: 40,
      borderRadius: 10,
      borderColor: hasError ? theme.error : theme.secondaryColor,
    },
    "&& .ant-picker-outlined ": {
      borderColor: hasError ? theme.error : theme.secondaryColor,
    },
    ".ant-select-arrow": {
      color: theme.secondaryColor,
    },
    "&& .ant-select.disabled": {
      backgroundColor: theme.disabled,
      "& .ant-select-arrow": {
        color: theme.disabledColor,
      },
    },
    "&& .uploadFile .ant-upload-select": {
      backgroundColor: theme.white,
      width: uploadSize?.width,
      height: uploadSize?.height,
      border: "none",
      backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23B5B5B5FF' stroke-width='3' stroke-dasharray='4%2c 10' stroke-dashoffset='35' stroke-linecap='round'/%3e%3c/svg%3e")`,
    },
    ".withIcon ": {
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
      backgroundColor: theme.white,
    },
    ".uploadButton": {
      border: 0,
      background: "none",
    },
    ".customSelect": {
      width: "100%",
    },
    ".ant-color-picker-trigger-text": {
      width: "90%",
    },
    ".ant-color-picker-trigger": {
      padding: "9px 10px",
      justifyContent: "space-between",
      width: "100%",
      height: 38,
      borderRadius: 10,
      borderColor: theme.secondaryColor,
    },
    ".ant-color-picker-color-block": {
      borderRadius: 100,
      width: 12,
      height: 12,
    },
    ".ant-picker": {
      height: 38,
      borderRadius: 10,
      width: "100%",
      borderColor: theme.secondaryColor,
    },
  };
});

const InputStyled: StyledComponent<DivoInputProps> = styled(Input)(
  ({ theme, hasError }) => ({
    padding: 10,
    borderRadius: 10,
    height: 38,
    borderColor: hasError ? theme.error : theme.secondaryColor,
    "&.disabled": {
      borderColor: theme.disabledColor,
      backgroundColor: theme.disabled,
    },
  }),
);

const StyledSelect: StyledComponent<SelectProps & { hasError?: boolean }> =
  styled(Select)(({ theme, disabled, hasError }) => ({
    "&& .ant-select-selector": {
      padding: 10,
      borderColor: disabled
        ? theme.disabledColor
        : hasError
        ? theme.error
        : theme.secondaryColor,
    },
  }));

export const DivoInput = (props: DivoInputProps & SelectProps) => {
  const { TextArea } = Input;
  const [open, setOpen] = useState(false);
  return (
    <StyledWrapper {...props}>
      {props.inputType === "select" ? (
        <StyledSelect
          {...props}
          className={props.disabled ? "disabled" : "customSelect"}
        />
      ) : props.inputType === "colorPicker" ? (
        <ColorPicker
          defaultValue="#1677ff"
          open={open}
          format="hex"
          onOpenChange={setOpen}
          showText={(value) => {
            return (
              <Row justify="space-between">
                <p>{value.toHexString()}</p>
                <ChevronDownIcon
                  className="chevronDown"
                  rotate={open ? 180 : 0}
                />
              </Row>
            );
          }}
          {...(props as ColorPickerProps)}
        />
      ) : props.inputType === "datePicker" ? (
        <DatePicker
          picker="date"
          name={props.name}
          value={props.value}
          onBlur={props.onBlur}
          onChange={props.onChange}
        />
      ) : props.inputType === "textArea" ? (
        <TextArea {...(props as TextAreaProps)} />
      ) : props.inputType === "upload" ? (
        <Upload
          {...(props as UploadProps)}
          rootClassName="uploadFile"
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        >
          <button className="uploadButton" type="button">
            <div>
              Upload <br /> {props.uploadTitle}
            </div>
          </button>
        </Upload>
      ) : (
        <InputStyled
          variant={props.inputType === "withIcon" ? "borderless" : "outlined"}
          suffix={props.icon}
          rootClassName={
            props.disabled
              ? "disabled"
              : props.inputType === "withIcon"
              ? "withIcon"
              : ""
          }
          {...props}
        />
      )}
    </StyledWrapper>
  );
};
