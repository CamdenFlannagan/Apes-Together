import React from "react";
import NavBar from "./NavBar";
import { useState } from "react";
import { Editor, EditorState } from "draft-js";
import 'draft-js/dist/Draft.css';
import { doc, setDoc, addDoc, collection } from "firebase/firestore"; 
import { useAuth } from "../UserContext";
import { db } from "../firebase";

function MakeNewPost() {
    const userId = useAuth();
    if (!userId) console.error("You're not signed in? How did you even get here?");

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

    const handleSubmit = async () => {
        const blogpostRef = await addDoc(collection(db, "blogposts"), {
            author: authorEditorState.getCurrentContent().getPlainText(),
            authorId: userId,
            body: bodyEditorState.getCurrentContent().getPlainText(),
            title: titleEditorState.getCurrentContent().getPlainText()
        });
    }

    return (
        <div>
            <NavBar />
            <div className="TitleEditorContainer">
                <div className="TitleEditor BoxFocusShadow">
                    <Editor placeholder="title" editorState={titleEditorState} onChange={setTitleEditorState} />
                </div>
            </div>
            <div className="AuthorAndChapterEditorContainer">
                <div className="AuthorEditorContainer">
                    <div className="AuthorEditor BoxFocusShadow">
                        <Editor placeholder="author" editorState={authorEditorState} onChange={setAuthorEditorState} />
                    </div>
                </div>
                <div className="ChapterEditorContainer">
                    <div className="ChapterEditor BoxFocusShadow">
                        <Editor placeholder="chapter" editorState={chapterEditorState} onChange={setChapterEditorState} />
                    </div>
                </div>
            </div>
            <div className="BodyEditorContainer">
                <div className="BodyEditor BoxFocusShadow">
                    <Editor placeholder="write your post here..." editorState={bodyEditorState} onChange={setBodyEditorState} />
                </div>
            </div>
            <div className="SubmitButton" onClick={handleSubmit}>Submit</div>
            
        </div>
    );
}

export default MakeNewPost;