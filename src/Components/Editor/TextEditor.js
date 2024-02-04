import React, { useState } from "react";
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  Modifier,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./TextEditor.css";

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      const contentState = convertFromRaw(JSON.parse(savedContent));
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  });

  const applyStyleToBlock = (block, prefix, styleClass) => {
    const text = block.getText();
    const blockKey = block.getKey();

    if (text.startsWith(prefix) && text.length + 1 > prefix.length) {
      const currentClasses = block.getData().get("classes", new Set());
      const newClasses = new Set([...currentClasses, styleClass]);

      return block
        .set("text", text.slice(prefix.length))
        .setIn(["data", "classes"], newClasses);
    }

    return block;
  };

  const updateBlockWithStyle = (contentState, block, prefix, styleClass) => {
    const blockKey = block.getKey();

    const updatedBlock = applyStyleToBlock(block, prefix, styleClass);

    const newContentState = contentState.merge({
      blockMap: contentState.getBlockMap().set(blockKey, updatedBlock),
    });

    return newContentState;
  };

  const onChange = (newState) => {
    const contentState = newState.getCurrentContent();
    const blocks = contentState.getBlocksAsArray();

    let updatedEditorState = newState;

    blocks.forEach((block) => {
      if (block.getText().startsWith("# ")) {
        updatedEditorState = EditorState.push(
          updatedEditorState,
          updateBlockWithStyle(contentState, block, "# ", "header-one"),
          "change-block-data"
        );
      } else if (block.getText().startsWith("* ")) {
        updatedEditorState = EditorState.push(
          updatedEditorState,
          updateBlockWithStyle(contentState, block, "* ", "BOLD"),
          "change-block-data"
        );
      } else if (block.getText().startsWith("** ")) {
        updatedEditorState = EditorState.push(
          updatedEditorState,
          updateBlockWithStyle(contentState, block, "** ", "RED_LINE"),
          "change-block-data"
        );
      } else if (block.getText().startsWith("*** ")) {
        updatedEditorState = EditorState.push(
          updatedEditorState,
          updateBlockWithStyle(contentState, block, "*** ", "UNDERLINE"),
          "change-block-data"
        );
      }
    });

    setEditorState(updatedEditorState);
  };

  const handleSave = () => {
    localStorage.setItem(
      "editorContent",
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
  };

  return (
    <div className="h-5/6 mx-16 pt-14">
      <div className="flex flex-row">
        <div className="text-right pt-6 w-1/2">Demo Editor by Kipmurkor</div>
        <div className="text-right pt-4 w-1/2">
          <button
            className="text-black border-2 border-black border-b-8 border-r-8 px-4 py-2"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
      <div className="h-3/4 border-4 border-blue-300 p-3 mt-2">
        <Editor
          editorState={editorState}
          onChange={onChange}
          blockStyleFn={(block) => {
            const classes = [...block.getData().get("classes", [])];
            return classes.length > 0 ? `header-one ${classes.join(" ")}` : "";
          }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
