import React, { FC, lazy, Suspense, useRef } from "react";
import { IconX } from "@tabler/icons-react";
import { DivoButton } from "~/components";
import SaveIcon from "../../../modules/icons/Save";
import styled from "@emotion/styled";
import { Row } from "antd";

interface EditorComponentProps {
  height?: number;
  setEditorVisible: (value: boolean) => void;
}

const WrapperStyled = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  ".ql-toolbar": {
    borderBottom: "none",
  },
  ".ql-editor": {
    minHeight: 200,
    backgroundColor: "#fff",
  },
  ".quill": {
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  ".saveButton": {
    placeContent: "center",
    padding: 0,
    position: "relative",
    width: 100,
    height: 41,
    fontSize: 14,
    bottom: 25,
    margin: "auto",
    svg: {
      fill: "#fff",
      marginRight: 8,
    },
  },
  ".closeEditor": {
    position: "absolute",
    top: 10,
    right: 10,
    cursor: "pointer",
    color: theme.primaryColor,
  },
}));

export const Editor: FC<EditorComponentProps> = ({
  height,
  setEditorVisible,
}) => {
  const editorValue = useRef("");
  const ReactQuill = lazy(() => import("react-quill"));
  return (
    <WrapperStyled>
      <IconX className="closeEditor" onClick={() => setEditorVisible(false)} />
      <Suspense fallback={<div>Loading...</div>}>
        <ReactQuill
          value={editorValue.current}
          onChange={(value) => (editorValue.current = value)}
          style={{
            height: (height as number) < 290 ? 240 : (height as number) - 50,
          }}
        />
      </Suspense>
      <Row justify="center">
        <DivoButton
          variant="secondary"
          className="saveButton"
          onClick={() => setEditorVisible(false)}
        >
          <SaveIcon />
          Save
        </DivoButton>
      </Row>
    </WrapperStyled>
  );
};
