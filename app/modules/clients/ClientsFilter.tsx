import { DivoDropdown } from "../../components";
import styled from "@emotion/styled";
import { useState } from "react";
import { HiChevronDown, HiOutlineX } from "react-icons/hi";
import CheckboxCheckedIcon from "../../modules/assets/checkbox-checked.svg";
import CheckboxUnCheckedIcon from "../../modules/assets/checkbox-unchecked.svg";
import { Global, css } from "@emotion/react";

const ClientsFilterWrapped = styled.div`
  display: flex;
`;

const ClientsFilterTrigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 10px;
  padding: 10px;
  height: 43.5px;
  min-width: 118px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #5d6671;
  cursor: pointer;

  svg {
    height: 16px;
    width: 16px;
    margin: 0 6px 0 10px;
  }

  &.ant-dropdown-open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const ClearFilterButton = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  padding: 0 16px;
  height: 43.5px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #2684ff;
  cursor: pointer;
  margin-left: 10px;

  svg {
    height: 16px;
    width: 16px;
    margin: 0 10px 0 0;
  }
`;

interface IFilterOptions {
  label: string;
  value: boolean | undefined;
}

const filterOptions: IFilterOptions[] = [
  {
    label: "Active",
    value: true,
  },
  {
    label: "Inactive",
    value: false,
  },
  {
    label: "All Clients",
    value: undefined,
  },
];

export const ClientsFilter = ({
  setCurrentFilter,
}: {
  setCurrentFilter: (filter: boolean | undefined) => void;
}) => {
  const [activeFilter, setActiveFilter] = useState<boolean | undefined>(
    filterOptions[2].value,
  );

  return (
    <ClientsFilterWrapped>
      <Global
        styles={css`
          .filter-options {
            .ant-dropdown-menu-item {
              padding-left: 10px !important;
              min-width: 118px !important;
              .ant-dropdown-menu-item-icon {
                margin-inline-end: 16px !important;
              }
            }
          }
        `}
      />
      <DivoDropdown
        overlayClassName="filter-options"
        menu={{
          items: filterOptions.map((item) => ({
            key: 0,
            label: item.label,
            icon:
              item.value === activeFilter ? (
                <CheckboxCheckedIcon />
              ) : (
                <CheckboxUnCheckedIcon style={{ marginLeft: 2 }} />
              ),
            onClick: () => {
              setActiveFilter(item.value);
              setCurrentFilter(item.value);
            },
          })),
        }}
        trigger={["click"]}
      >
        <ClientsFilterTrigger>
          {filterOptions?.find((item) => item.value === activeFilter)?.label}{" "}
          <HiChevronDown color="2684FF" />
        </ClientsFilterTrigger>
      </DivoDropdown>
      <ClearFilterButton
        onClick={() => {
          setActiveFilter(undefined);
          setCurrentFilter(undefined);
        }}
      >
        <HiOutlineX />
        Clear Filter
      </ClearFilterButton>
    </ClientsFilterWrapped>
  );
};
