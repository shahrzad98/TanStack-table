import type { Meta, StoryObj } from "@storybook/react";
import { DivoButton as Button } from "../components";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const DivoButton: Story = {
  args: {
    variant: "primary",
    children: "Button",
    disabled: false,
  },
};
