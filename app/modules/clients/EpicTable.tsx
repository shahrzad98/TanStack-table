import { useEffect, useRef } from "react";
import {
  Input as AntdInput,
  InputProps as AntdInputProps,
  InputRef,
  Table,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "@remix-run/react";

import { IEpicResponse } from "../../types/epic";

import PencilIcon from "../../modules/assets/pencil-icon.svg";
import TrashBinIcon from "../../modules/icons/TrashBinIcon";
import DivNotesLogo from "../../modules/icons/DivnotesIcon";
import JiraLogo from "../../modules/assets/jira.svg";

interface InputProps extends AntdInputProps {
  onClickOutside: (value: string) => void;
}

const Input = ({ onClickOutside, ...props }: InputProps) => {
  const ref = useRef<InputRef>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && ref.current.input !== event.target) {
        onClickOutside && onClickOutside(ref.current?.input?.value as string);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return <AntdInput ref={ref} {...props} />;
};

interface IEpicTable {
  data: IEpicResponse[];
  onCellUpdate: (
    is_local: boolean,
    index: number,
    value: string,
    column: string,
  ) => void;
  onRowDelete: (id: string) => void;
  currentInput: {
    id: string | null;
    column: string | null;
  };
  updateCurrentInput: (id: string | null, column: string | null) => void;
}

export const EpicTable = ({
  data,
  onCellUpdate,
  onRowDelete,
  currentInput,
  updateCurrentInput,
}: IEpicTable) => {
  const columns: ColumnsType<IEpicResponse> = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      className: styles.indexColumn,
      render: (_, epic, index) => <p>{index + 1}</p>,
    },
    {
      title: "Epic",
      dataIndex: ["id", "key"],
      key: "key",
      render: (_, { id, key, is_local }, index) => (
        <div
          className={styles.tableCell}
          onClick={() => {
            if (is_local) {
              updateCurrentInput(id, "key");
            }
          }}
          data-cy={`epic-table-key-edit-${index + 1}`}
        >
          <div>
            <span>{is_local ? <DivNotesLogo /> : <JiraLogo />}</span>
            {currentInput.id === id && currentInput.column === "key" ? (
              <Input
                data-cy={`epic-table-key-input-${index + 1}`}
                bordered={false}
                autoFocus
                defaultValue={key}
                onPressEnter={(e) =>
                  onCellUpdate(
                    is_local,
                    index,
                    (e.target as HTMLInputElement).value,
                    "key",
                  )
                }
                onClickOutside={(value) =>
                  onCellUpdate(is_local, index, value, "key")
                }
              />
            ) : !is_local ? (
              <Link
                legacyBehavior
                href={`https://divnotes.atlassian.net/browse/${key?.toUpperCase()}`}
              >
                <a
                  className={styles.epicTitle}
                  data-cy={`epic-table-key-text-${index + 1}`}
                >
                  {key}
                </a>
              </Link>
            ) : (
              <p
                className={styles.epicTitle}
                data-cy={`epic-table-key-text-${index + 1}`}
              >
                {key}
              </p>
            )}
          </div>
          <div className={styles.epicTitle__buttons}>
            {is_local &&
              !(currentInput.id === id && currentInput.column === "key") && (
                <PencilIcon />
              )}
          </div>
        </div>
      ),
      ellipsis: true,
    },
    {
      title: "Display As",
      dataIndex: ["id", "title"],
      key: "title",
      render: (_, { id, title, is_local }, index) => (
        <div
          className={styles.tableCell}
          onClick={() => updateCurrentInput(id, "title")}
          data-cy={`epic-table-title-edit-${index + 1}`}
        >
          {currentInput.id === id && currentInput.column === "title" ? (
            <div>
              <Input
                data-cy={`epic-table-title-input-${index + 1}`}
                bordered={false}
                autoFocus
                defaultValue={title || ""}
                onPressEnter={(e) =>
                  onCellUpdate(
                    is_local,
                    index,
                    (e.target as HTMLInputElement).value,
                    "title",
                  )
                }
                onClickOutside={(value) =>
                  onCellUpdate(is_local, index, value, "title")
                }
              />
            </div>
          ) : (
            <div>
              <p
                className={`${styles.displayAs} ${
                  !title ? styles.displayAs__default : ""
                }`}
                data-cy={`epic-table-title-text-${index + 1}`}
              >
                {title}
              </p>
            </div>
          )}
          {!(currentInput.id === id && currentInput.column === "title") && (
            <PencilIcon />
          )}
        </div>
      ),
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, { id, description, is_local }, index) => (
        <div
          className={styles.tableCell}
          onClick={() => updateCurrentInput(id, "description")}
          data-cy={`epic-table-description-edit-${index + 1}`}
        >
          {currentInput.id === id && currentInput.column === "description" ? (
            <div>
              <Input
                data-cy={`epic-table-description-input-${index + 1}`}
                bordered={false}
                autoFocus
                defaultValue={description || ""}
                placeholder="Enter Description"
                onPressEnter={(e) =>
                  onCellUpdate(
                    is_local,
                    index,
                    (e.target as HTMLInputElement).value,
                    "description",
                  )
                }
                onClickOutside={(value) =>
                  onCellUpdate(is_local, index, value, "description")
                }
              />
            </div>
          ) : (
            <div>
              <p
                className={styles.description}
                data-cy={`epic-table-description-text-${index + 1}`}
              >
                {description}
              </p>
            </div>
          )}
          {!(
            currentInput.id === id && currentInput.column === "description"
          ) && <PencilIcon />}
        </div>
      ),
      ellipsis: true,
    },
    {
      title: "",
      dataIndex: ["id", "is_local"],
      key: "delete",
      render: (_, { id, is_local }, index) => {
        if (!is_local) {
          // if is_local is false, it means its not a local Epic
          // so we don't want to show the trash bin icon in that scenario
          return;
        } else {
          return (
            <span>
              <TrashBinIcon
                onClick={() => onRowDelete(id)}
                data-cy={`epic-table-delete-${index + 1}`}
              />
            </span>
          );
        }
      },
      className: styles.deleteColumn,
    },
  ];
  return data ? (
    <Table
      className={styles.table}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  ) : null;
};
