import React from "react";
import styles from "./style.module.scss"; // Assume you have a corresponding SASS/SCSS file for styles

const TagList = ({ tags, onRemoveTag }) => {
  return (
    <div className={styles.tag_list}>
      {tags.map((tag, index) => (
        <div key={index} className={styles.tag}>
          <span className={styles.tag_text}>{tag}</span>
          <button
            className={styles.remove_tag_button}
            onClick={() => onRemoveTag(tag)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default TagList;
