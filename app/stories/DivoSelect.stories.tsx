import type { Meta, StoryObj } from "@storybook/react";
import { DivoSelect as Select } from "../components";

const meta: Meta<typeof Select> = {
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const DivoSelect: Story = {
  args: {
    options: [
      { value: "all", label: "All" },
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
    defaultValue: "Active",
  },
};
