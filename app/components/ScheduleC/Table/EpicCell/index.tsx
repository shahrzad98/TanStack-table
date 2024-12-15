import { AutoComplete, Input, Row } from "antd";
import { FC, memo, useState } from "react";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { FaPlus as PlusIcon } from "react-icons/fa";

import { epicOptions } from "../mockData";
import { CellWrapperStyled } from "../cellWrrapper";
import { CellContext } from "@tanstack/table-core";
import { IRow } from "../../../../types/dataGrid";

export const EpicCell: FC<CellContext<IRow, any>> = memo(() => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [optionsState, setOptionsState] = useState(epicOptions);

  const handleSearch = (value: string) => {
    setOptionsState(epicOptions);
    setOptionsState((prev) => prev.filter((el) => el.value.includes(value)));
  };

  return (
    <CellWrapperStyled>
      {!searchValue ? (
        <PlusIcon onClick={() => setSearchVisible(true)} className="epicIcon" />
      ) : null}
      {searchValue ? (
        // todo: correct data types based on api
        <Row className="assigneeLabel" justify="space-between">
          <div>
            {
              optionsState.find((el) => el.value == searchValue)?.["label"]
                .props.children[2]
            }
          </div>
        </Row>
      ) : null}
      <div
        style={{
          display: searchVisible ? "block" : "none",
        }}
        className="searchWrapper"
      >
        <AutoComplete
          onSearch={handleSearch}
          onSelect={(value) => {
            setSearchValue(value);
            setSearchVisible(false);
          }}
          listHeight={131}
          options={optionsState}
          size="large"
        >
          <Input
            size="large"
            placeholder="Search"
            prefix={<SearchIcon />}
            addonAfter={<CloseIcon onClick={() => setSearchVisible(false)} />}
          />
        </AutoComplete>
      </div>
    </CellWrapperStyled>
  );
});

EpicCell.displayName = "EpicCell";
