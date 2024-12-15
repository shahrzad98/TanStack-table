import { DivoLayout } from "@components";
import { ConfigTable } from "./ConfigTable";
import { AttributeTable } from "./AttributeTable";
import { useState } from "react";

export const Settings = () => {
  const [currentTab, setCurrentTab] = useState("1");

  const tabs = [
    {
      label: "Configuration",
      key: "1",
      children: <ConfigTable />,
    },
    {
      label: "Attributes",
      key: "2",
      children: <AttributeTable />,
    },
  ];
  return (
    <DivoLayout
      activeRoute="/clients"
      tabs={tabs}
      activeTab={currentTab}
      onTabClick={(value) => setCurrentTab(value)}
    />
  );
};
