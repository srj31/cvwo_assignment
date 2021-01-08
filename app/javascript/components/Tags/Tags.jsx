import React, { useState } from "react";
import Tag from "../Tag/Tag.tsx";
import './Tags.css'
function Tags({ editing, tags, task_id }) {
  const [addTag, setAddTag] = useState({name: ""});
  const [toAdd, setToAdd] = useState(false);
  const handleKeyDownAdd = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  const handleChangeAddTag = (event) => {
    setAddTag({
      ...addTag,
      name: event.currentTarget.value,
    });
  };

  const handleClickAdd = () => {
    setToAdd(true);
  };

  const handleAdd = async (e) => {
    e?.preventDefault();
    if (addTag.name==="") return ;
    const url = `api/v1/tasks/${task_id}/tags`;
    const metaElement = document.querySelector('meta[name="csrf-token"]');
    const token = metaElement.content;
    await fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addTag),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        setToAdd(false);
      })
      .catch(() => "Error occurred while editing the tag");
  };

  return (
    <div className="tags">
      {/* {console.log(tags)} */}
      {tags.tag &&
        tags.tag.map((tag) => {
          // {console.log(tag)}
          return <Tag editing={editing} tag={tag} key={tag.id} />;
        })}
      {toAdd ? (
        <form onSubmit={handleAdd} style={{ display: "flex" }}>
          <input
            type="text"
            className="form-control-plaintext"
            value={addTag.name}
            onChange={handleChangeAddTag}
            onKeyDown={handleKeyDownAdd}
            autoFocus
          />
          <button
            className="btn btn-success"
            style={{ margin: 10, fontSize: 10 }}
          >
            {" "}
            Add{" "}
          </button>
        </form>
      ) : (
        <button
          className="btn btn-success"
          onClick={handleClickAdd}
          style={{ margin: 10, fontSize: 10 }}
        >
          {" "}
          Add Tag{" "}
        </button>
      )}
    </div>
  );
}

export default Tags;
