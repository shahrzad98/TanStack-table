import type { Meta, StoryObj } from "@storybook/react";
import { DivoTab as Tab } from "../components";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegBuilding } from "react-icons/fa";

const meta: Meta<typeof Tab> = {
  component: Tab,
};

export default meta;
type Story = StoryObj<typeof Tab>;

export const DivoTab: Story = {
  args: {
    items: [
      {
        label: "Projects",
        key: "1",
        icon: <FiShoppingBag size={20} />,
      },
      {
        label: "Client Info",
        key: "2",
        icon: <FaRegBuilding size={20} />,
      },
    ],
  },
};
