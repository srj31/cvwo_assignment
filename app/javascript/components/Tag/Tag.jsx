import React, { useState } from "react";
import "./Tag.css";

function Tag({ editing, tag }) {
  const [newTag, setNewTag] = useState(tag);

  const handleChangeTag = (event) => {
    setNewTag({
      ...newTag,
      name: event.target.value,
    });
  };

  const handleSubmit = () => {
    const url = `api/v1/tasks/${tag.task_id}/tags/${tag.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    console.log(tag);
    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTag),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        // console.log(response);
      })
      .catch(() => "Error occurred while editing the tag");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="tag">
      {/* {console.log(newTag)} */}
      {editing ? (
        <input
          type="text"
          className="form-control-plaintext"
          id="staticEmail2"
          value={newTag.name}
          onChange={handleChangeTag}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div className="tag__body">{tag.name}</div>
      )}
    </div>
  );
}

export default Tag;
