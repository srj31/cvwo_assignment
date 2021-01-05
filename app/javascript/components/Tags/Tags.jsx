import React from "react";
import Tag from "../Tag/Tag.tsx";

function Tags({ editing, tags }) {
  return (
    <div className="tags">
      {/* {console.log(tags)} */}
      {tags.tag&& tags.tag.map((tag) => {
        // {console.log(tag)}
        return (<Tag editing={editing} tag={tag} key={tag.id} />);
      })}
      {/* {tags &&
        Object.entries(tags).map((tag) => {
          {console.log(tag)};
          return tag[1] && <Tag editing={editing} tag={tag[1]} key={tag[1].id}/>;
        })} */}
    </div>
  );
}

export default Tags;
