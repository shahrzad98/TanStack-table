import { Row, Typography } from "antd";
import TrashBinIcon from "../../icons/TrashBinIcon";

interface DeleteProps {
  setDeleteModalOpen: (value: boolean) => void;
}
export const Delete = ({ setDeleteModalOpen }: DeleteProps) => {
  const { Text } = Typography;

  return (
    <Row
      onClick={(e) => {
        e.stopPropagation();
        return setDeleteModalOpen(true);
      }}
      style={{ width: "100%" }}
    >
      <TrashBinIcon />
      <Text>Delete</Text>
    </Row>
  );
};
