import React, { useState } from "react";
import Tag from "../Tag/Tag.tsx";
import "./Tags.css";
function Tags({ editing, tags, task_id, handleAdd }) {
  const [addTag, setAddTag] = useState({ name: "" });
  const [toAdd, setToAdd] = useState(false);
  // const handleKeyDownAdd = (event) => {
  //   if (event.key === "Enter") {
  //     handleAdd();
  //   }
  // };

  const handleChangeAddTag = (event) => {
    setAddTag({
      ...addTag,
      name: event.currentTarget.value,
    });
  };

  const handleClickAdd = () => {
    setToAdd(true);
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
        <form
          onSubmit={(event) => {
            handleAdd(event, addTag), setToAdd(false), setAddTag({ name: "" });
          }}
          style={{ display: "flex" }}
        >
          <input
            type="text"
            className="form-control-plaintext"
            value={addTag.name}
            onChange={handleChangeAddTag}
            // onKeyDown={handleKeyDownAdd}
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
          style={{
            margin: 10,
            fontSize: 17,
            borderRadius: 102,
            padding: "0px 7px",
          }}
        >
          {" "}
          +{" "}
        </button>
      )}
    </div>
  );
}

export default Tags;
