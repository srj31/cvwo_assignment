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

  const handleSubmit = (e) => {
    e.preventDefault();
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
        setIsEditing(false)
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
      {editing ? (
        <form onSubmit={handleSubmit} style={{display:'flex'}}>
          <input
            type="text"
            className="form-control-plaintext"
            value={newTag.name}
            onChange={handleChangeTag}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className="btn btn-info" style={{margin:10, fontSize:10}}>{" "}Update{" "}</button>
        </form>
      ) : (
        <div className="tag__body">{newTag.name}</div>
      )}
    </div>
  );
}

export default Tag;
