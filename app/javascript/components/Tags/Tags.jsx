import React from "react";
import Tag from "../Tag/Tag.tsx";

function Tags({ editing, tags }) {
  return (
    <div className="tags">
      {tags &&
        Object.entries(tags).map((tag) => {
          // {console.log(tag)};
          return tag[1] && <Tag editing={editing} tag={tag[1]} key={tag[1].id}/>;
        })}
    </div>
  );
}

export default Tags;
