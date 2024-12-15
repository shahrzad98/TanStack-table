import type { Meta, StoryObj } from "@storybook/react";
import { DivoInput as Input } from "../components";
import { FiTrash } from "react-icons/fi";

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => <Input style={{ width: 380 }} placeholder="Input here..." />,
};
export const Error: Story = {
  render: () => (
    <Input style={{ width: 380 }} placeholder="Input here..." status="error" />
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Input
      style={{ width: 380 }}
      placeholder="Input here..."
      inputType="withIcon"
      icon={<FiTrash />}
    />
  ),
};

export const Select: Story = {
  render: () => (
    <Input
      style={{ width: 380 }}
      placeholder="Input here..."
      inputType="select"
    />
  ),
};

export const Upload: Story = {
  render: () => (
    <Input
      style={{ width: 380 }}
      placeholder="Input here..."
      inputType="upload"
    />
  ),
};

export const Textarea: Story = {
  render: () => (
    <Input
      style={{ width: 380 }}
      placeholder="Input here..."
      inputType="textArea"
    />
  ),
};
