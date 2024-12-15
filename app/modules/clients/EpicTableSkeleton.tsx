import { Skeleton, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import PencilIcon from "../../modules/icons/PencilIcon";
import TrashBinIcon from "../../modules/icons/TrashBinIcon";

export const EpicTableSkeleton = ({ length = 10 }: { length?: number }) => {
  const columns: ColumnsType<object> = [
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
      render: () => (
        <div className={styles.tableCell}>
          <div>
            <span>
              <Skeleton.Avatar active />
            </span>
            <p className={styles.epicTitle}>
              <Skeleton.Input active style={{ marginLeft: 10 }} />
            </p>
          </div>
          <div className={styles.epicTitle__buttons}>
            <PencilIcon />
          </div>
        </div>
      ),
      ellipsis: true,
    },
    {
      title: "Display As",
      key: "title",
      render: () => (
        <div className={styles.tableCell}>
          <div>
            <p className={`${styles.displayAs} ${styles.displayAs__default}`}>
              <Skeleton.Input active />
            </p>
          </div>
          <PencilIcon />
        </div>
      ),
      ellipsis: true,
    },
    {
      title: "Description",
      key: "description",
      render: () => (
        <div className={styles.tableCell}>
          <div>
            <p className={styles.description}>
              <Skeleton.Input active />
            </p>
          </div>
          <PencilIcon />
        </div>
      ),
      ellipsis: true,
    },
    {
      title: "",
      key: "delete",
      render: () => (
        <span>
          <TrashBinIcon />
        </span>
      ),
      className: styles.deleteColumn,
    },
  ];

  return (
    <Table
      className={styles.table}
      columns={columns}
      dataSource={Array.from({ length }, (_, i) => ({ key: i }))}
      pagination={false}
    />
  );
};
