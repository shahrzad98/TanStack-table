import { Row, Typography } from "antd";
import PenIcon from "../../icons/PenIcon";

interface EditProps {
  setEditModalOpen: (value: boolean) => void;
}

export const Edit = ({ setEditModalOpen }: EditProps) => {
  const { Text } = Typography;

  return (
    <Row
      onClick={(e) => {
        e.stopPropagation();
        setEditModalOpen(true);
      }}
    >
      <PenIcon />
      <Text>Edit</Text>
    </Row>
  );
};
