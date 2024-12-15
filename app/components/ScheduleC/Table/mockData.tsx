import { Row } from "antd";
import EpicIcon from "../../../modules/icons/EpicIcon";
import Avatar1 from "../../../modules/assets/avatar1.png";
import Avatar2 from "../../../modules/assets/avatar2.png";
import Avatar3 from "../../../modules/assets/avatar3.png";

export const assigneeOptions = [
  {
    value: "Name 1",
    label: (
      <div
        style={{
          display: "flex ",
          justifyContent: "space-between",
        }}
      >
        Name 1
        <img alt="Avatar " src={Avatar1} width={20} height={20} />
      </div>
    ),
  },
  {
    value: "Name 2",
    label: (
      <div
        style={{
          display: "flex ",
          justifyContent: "space-between",
        }}
      >
        Name 2
        <img alt="Avatar " src={Avatar2} width={20} height={20} />
      </div>
    ),
  },
  {
    value: "Name 3",
    label: (
      <div
        style={{
          display: "flex ",
          justifyContent: "space-between",
        }}
      >
        Name 3
        <img alt="Avatar" src={Avatar3} width={20} height={20} />
      </div>
    ),
  },
];
export const epicOptions = [
  {
    value: "Search",
    label: (
      <Row>
        <div className="round">
          <input type="radio" className="optionCheckbox" />
          <label htmlFor="checkbox" />
        </div>
        <EpicIcon />
        <span style={{ marginLeft: 10 }}>Search</span>
      </Row>
    ),
  },
  {
    value: "Paywall",
    label: (
      <Row>
        <div className="round">
          <input type="radio" className="optionCheckbox" />
          <label htmlFor="checkbox" />
        </div>
        <EpicIcon />
        <span style={{ marginLeft: 10 }}>Paywall</span>
      </Row>
    ),
  },
  {
    value: "Home",
    label: (
      <Row className="searchOption">
        <div className="round">
          <input type="radio" className="optionCheckbox" />
          <label htmlFor="checkbox" />
        </div>
        <EpicIcon />
        <span style={{ marginLeft: 10 }}>Home</span>
      </Row>
    ),
  },
];
export const issueTypeOptions = [
  {
    value: "Epic",
    label: (
      <Row>
        <div className="round">
          <input type="radio" className="optionCheckbox" />
          <label htmlFor="checkbox"> </label>
        </div>
        <EpicIcon />
        <span style={{ marginLeft: 10 }}>Search</span>
      </Row>
    ),
  },
  {
    value: "Paywall",
    label: (
      <Row>
        <div className="round">
          <input type="radio" className="optionCheckbox" />
          <label htmlFor="checkbox"> </label>
        </div>
        <EpicIcon />
        <span style={{ marginLeft: 10 }}>Paywall</span>
      </Row>
    ),
  },
  {
    value: "Home",
    label: (
      <Row className="searchOption">
        <div className="round">
          <input type="radio" className="optionCheckbox" />
          <label htmlFor="checkbox"> </label>
        </div>
        <EpicIcon />
        <span style={{ marginLeft: 10 }}>Home</span>
      </Row>
    ),
  },
];
