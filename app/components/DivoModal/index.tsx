import styled, { StyledComponent } from "@emotion/styled";
import { Modal, ModalProps, Typography } from "antd";
import { DivoButton } from "../DivoButton";

interface DivoModalProps extends ModalProps {
  DeleteItemName?: string;
  okDisabled?: boolean;
  isDeleteLoading?: boolean;
}

const ModalStyled: StyledComponent<DivoModalProps> = styled(Modal)(
  ({ width }) => ({
    ".ant-modal-content": {
      minWidth: 378,
      width: width,
      padding: "30px 20px 20px",
      borderRadius: 10,
    },
    ".ant-modal-header": {
      padding: 0,
      textAlign: "left",
      marginBottom: 24,
    },
    ".ant-modal-footer": {
      display: "flex",
      justifyContent: "right",
      padding: 0,
      margin: 0,
    },
    ".ant-typography": {
      marginBottom: 0,
    },
    "&& .ant-modal-footer .customOkButton": {
      marginLeft: 16,
    },
  }),
);
export const DivoModal = ({ children, ...props }: DivoModalProps) => {
  const { Paragraph } = Typography;
  return (
    <ModalStyled
      closable={false}
      {...props}
      footer={() => (
        <>
          <DivoButton variant="secondary" onClick={props.onCancel}>
            {props.cancelText}
          </DivoButton>
          <DivoButton
            onClick={props.onOk}
            variant="primary"
            disabled={props.okDisabled}
            loading={props.isDeleteLoading || props.confirmLoading}
            className="customOkButton"
          >
            {props.okText}
          </DivoButton>
        </>
      )}
    >
      {props.DeleteItemName ? (
        <>
          <Paragraph>
            You are about to delete this {props.DeleteItemName}.
          </Paragraph>
          <Paragraph>This cannot be undone.</Paragraph>
        </>
      ) : (
        children
      )}
    </ModalStyled>
  );
};
