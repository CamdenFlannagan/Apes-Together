import React from "react";
import NavBar from "./NavBar";
import { useState } from "react";
import { Editor, EditorState } from "draft-js";
import 'draft-js/dist/Draft.css';

function MakeNewPost() {
    const [titleEditorState, setTitleEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    const [authorEditorState, setAuthorEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    const [chapterEditorState, setChapterEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    const [bodyEditorState, setBodyEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    const handleSubmit = () => {
        // do the stuff
    }

    return (
        <div>
            <NavBar />
            <div className="TitleEditorContainer">
                <div className="TitleEditor">
                    <Editor placeholder="title" editorState={titleEditorState} onChange={setTitleEditorState} />
                </div>
            </div>
            <div className="AuthorAndChapterEditorContainer">
                <div className="AuthorEditorContainer">
                    <div className="AuthorEditor">
                        <Editor placeholder="author" editorState={authorEditorState} onChange={setAuthorEditorState} />
                    </div>
                </div>
                <div className="ChapterEditorContainer">
                    <div className="ChapterEditor">
                        <Editor placeholder="chapter" editorState={chapterEditorState} onChange={setChapterEditorState} />
                    </div>
                </div>
            </div>
            <div className="BodyEditorContainer">
                <div className="BodyEditor">
                    <Editor placeholder="write your post here..." editorState={bodyEditorState} onChange={setBodyEditorState} />
                </div>
            </div>
            <div className="SubmitButton" onClick={handleSubmit}>Submit</div>
        </div>
    );
}

export default MakeNewPost;