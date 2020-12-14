import React from "react";
import Tag from "../Tag/Tag";

function Tags({ editing, tags }) {
  return (
    <div className="tags">
      {tags &&
        Object.entries(tags).map((tag,key) => {
          return tag[1] && <Tag editing={editing} tag={tag[1]} key={key}/>;
        })}
    </div>
  );
}

export default Tags;
