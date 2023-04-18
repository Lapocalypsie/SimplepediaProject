/*
  Editor.js

  This provides a basic editor with space for entering a title and a body.

  The interface has two buttons. If "Cancel" is clicked, the `complete` callback
  is called with no arguments. If the "Save" button is clicked, the `complete` callback
  is called with a new article object with `title`, `contents`, and `date`. 

  If the optional `article` prop is set, the `title` and `contents` fields of the component
  are pre-loaded with the values. In addition, all other properties of the object are 
  included in the returned article object. 

  props:
    article - object with `title` and `contents` properties at minimum
    complete - function to call on completion (required)
*/

import ArticleShape from "./ArticleShape";
import styles from "../styles/Editor.module.css";
import propTypes from "prop-types";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
export default function Editor({ article, complete }) {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const enterTitle = (event) => {
    setTitle(event.target.value);
  };

  const enterContent = (event) => {
    setContents(event.target.value);
  };

  const saveClick = () => {
    if (title) {
      const date = new Date().toISOString();

      const newArticle = {
        ...article,
        title: title,
        contents: contents,
        edited: date,
      };
      complete(newArticle);
    }
  };

  function cancelClick() {
    complete();
  }

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContents(article.contents);
    }
  }, [article]);
  //If we add title and contents to the dependency array then we can't change them anymore

  return (
    <div>
      <div>
        <TextField
          required
          fullWidth
          margin="normal"
          id="title"
          value={title}
          onChange={enterTitle}
          label="Title"
          error={!title}
          helperText={!title ? "Title can't be blank" : " "}
        />
      </div>
      <div>
        <TextField
          fullWidth
          multiline
          rows={10}
          margin="normal"
          id="contents"
          value={contents}
          onChange={enterContent}
          label="Contents"
        />
      </div>
      <div className={styles.button}>
        <Stack spacing={2} direction="row">
          <button onClick={cancelClick}>Cancel</button>
          <button onClick={saveClick} disabled={!title}>
            Save
          </button>
        </Stack>
      </div>
    </div>
  );
}

Editor.propTypes = {
  article: ArticleShape,
  complete: propTypes.func.isRequired,
};
