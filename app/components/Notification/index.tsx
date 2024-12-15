import { notification as antdNotification } from "antd";
import { CgClose as CloseIcon } from "react-icons/cg";
import {
  FiAlertTriangle as AlertIcon,
  FiCheck as SuccessIcon,
  FiInfo as InfoIcon,
  FiXCircle as ErrorIcon,
} from "react-icons/fi";
import styles from "./notification.module.scss";
const config = {
  content: "",
  duration: 3,
  open: true,
};

export const notification = {
  success: (content: string) =>
    antdNotification.success({
      ...config,
      message: "Success",
      className: styles.success,
      icon: <SuccessIcon size={20} />,
      closeIcon: <CloseIcon size={16} />,
      description: content,
    }),
  alert: (content: string) => {
    antdNotification.warning({
      ...config,
      message: "Alert",
      description: content,
      className: styles.alert,
      closeIcon: <CloseIcon size={16} />,
      icon: <AlertIcon size={20} />,
    });
  },
  error: (content: string) => {
    antdNotification.error({
      ...config,
      closeIcon: <CloseIcon size={16} />,
      icon: <ErrorIcon size={20} />,
      message: "Error",
      description: content,
      className: styles.error,
    });
  },
  info: (content: string) => {
    antdNotification.info({
      ...config,
      closeIcon: <CloseIcon size={16} />,
      icon: <InfoIcon size={20} />,
      message: "Info",
      description: content,
      className: styles.info,
    });
  },
};
