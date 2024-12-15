import { Skeleton } from "antd";
import styled from "@emotion/styled";

const StyledWrapper = styled("div")(() => ({
  ".ant-skeleton-input": {
    marginBottom: 20,
  },
}));
export const TableSkeleton = () => {
  return (
    <StyledWrapper>
      <Skeleton.Input active size="large" block />
      <Skeleton.Input active size="large" block />
      <Skeleton.Input active size="large" block />
      <Skeleton.Input active size="large" block />
      <Skeleton.Input active size="large" block />
      <Skeleton.Input active size="large" block />
      <Skeleton.Input active size="large" block />
      <Skeleton.Input active size="large" block />
      <Skeleton.Input active size="large" block />
    </StyledWrapper>
  );
};
