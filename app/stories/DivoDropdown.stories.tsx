import type { Meta, StoryObj } from "@storybook/react";
import { DivoDropdown as Dropdown } from "../components";
import { FiPlus } from "react-icons/fi";

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const DivoDropdown: Story = {
  render: () => (
    <div style={{ width: 143 }}>
      <Dropdown
        open
        menu={{
          items: [
            {
              key: 1,
              label: <p>Add new</p>,
              icon: <FiPlus />,
            },
            {
              key: 2,
              label: <p>Add new</p>,
              icon: <FiPlus />,
            },
            {
              key: 3,
              label: <p>Add new</p>,
              icon: <FiPlus />,
            },
          ],
        }}
      >
        <p>...</p>
      </Dropdown>
    </div>
  ),
};
