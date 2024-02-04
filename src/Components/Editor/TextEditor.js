import React, { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
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

  const onChange = (newState) => {
    let updatedEditorState = newState;

    const contentState = newState.getCurrentContent();
    const blocks = contentState.getBlocksAsArray();

    blocks.forEach((block) => {
      const text = block.getText();
      const blockKey = block.getKey();

      if (text.startsWith("# ")) {
        updatedEditorState = RichUtils.toggleBlockType(
          updatedEditorState,
          "header-one"
        );

        const newContentState = contentState.merge({
          blockMap: contentState
            .getBlockMap()
            .set(blockKey, block.set("text", text.substring(2))),
        });

        updatedEditorState = EditorState.push(
          updatedEditorState,
          newContentState,
          "change-block-data"
        );
      } else if (text.startsWith("* ")) {
        updatedEditorState = RichUtils.toggleInlineStyle(
          updatedEditorState,
          "BOLD"
        );

        const newContentState = contentState.merge({
          blockMap: contentState
            .getBlockMap()
            .set(blockKey, block.set("text", text.substring(2))),
        });

        updatedEditorState = EditorState.push(
          updatedEditorState,
          newContentState,
          "change-block-data"
        );
      } else if (text.startsWith("** ")) {
        updatedEditorState = RichUtils.toggleInlineStyle(
          updatedEditorState,
          "STRIKETHROUGH"
        );

        const newContentState = contentState.merge({
          blockMap: contentState
            .getBlockMap()
            .set(blockKey, block.set("text", text.substring(3))),
        });

        updatedEditorState = EditorState.push(
          updatedEditorState,
          newContentState,
          "change-block-data"
        );
      } else if (text.startsWith("*** ")) {
        updatedEditorState = RichUtils.toggleInlineStyle(
          updatedEditorState,
          "UNDERLINE"
        );

        const newContentState = contentState.merge({
          blockMap: contentState
            .getBlockMap()
            .set(blockKey, block.set("text", text.substring(4))),
        });

        updatedEditorState = EditorState.push(
          updatedEditorState,
          newContentState,
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
        <Editor editorState={editorState} onChange={onChange} />
      </div>
    </div>
  );
};

export default TextEditor;
