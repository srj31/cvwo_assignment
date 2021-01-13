import React, { useState } from "react";
import "./Tag.css";
import { Tag } from "../types";

interface TagProps {
  editing: boolean;
  tag: Tag;
}

const Tag: React.FC<TagProps> = ({ editing, tag }) => {
  const [newTag, setNewTag] = useState<Tag>(tag);
  const [toDelete, setToDelete] = useState(false);

  const handleChangeTag = (event: React.FormEvent<HTMLInputElement>) => {
    setNewTag({
      ...newTag,
      name: event.currentTarget.value,
    });
  };

  const deleteTag = (e?: React.MouseEvent<HTMLDivElement>) => {
    const url = `/api/v1/tasks/${tag.task_id}/tags/${tag.id}`;
    const metaElement = document.querySelector(
      'meta[name="csrf-token"]'
    ) as HTMLMetaElement;
    const token = metaElement.content;
    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        console.log(response);
        setToDelete(true);
        // window.location.reload(false);
      })
      .catch(() => "Error occurred while deleting the task");
  };

  const handleSubmit = async (
    e?: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e?.preventDefault();
    const url = `api/v1/tasks/${tag.task_id}/tags/${tag.id}`;
    const metaElement = document.querySelector(
      'meta[name="csrf-token"]'
    ) as HTMLMetaElement;
    const token = metaElement.content;
    console.log(tag);
    await fetch(url, {
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
      .then((response) => {})
      .catch(() => "Error occurred while editing the tag");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="tag">
      {editing ? (
        <form onSubmit={handleSubmit} style={{ display: "flex" }}>
          <input
            type="text"
            className="form-control-plaintext"
            value={newTag.name}
            onChange={handleChangeTag}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className="btn btn-info" style={{ margin: 10, fontSize: 10 }}>
            {" "}
            Update{" "}
          </button>
        </form>
      ) : (
        <>
          {!toDelete && (
            <div className="tag__body">
              {newTag.name}
              <div className="tag__delete" onClick={deleteTag}>
                x
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tag;
