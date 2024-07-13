"use client";
import React from "react";
import styles from "./style.module.scss";

const ProfileTabs = () => {
  return (
    <>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.tabs}`}>
          <div className={`${styles.tab}`}>
            <input
              type="radio"
              name="css-tabs"
              id="tab-1"
              checked
              className={`${styles["tab-switch"]}`}
            />
            <label htmlFor="tab-1" className={`${styles["tab-label"]}`}>
              Settings
            </label>
            <div className={`${styles["tab-content"]}`}>
              My father had a small estate in Nottinghamshire: I was the third
              of five sons. He sent me to Emanuel College in Cambridge at
              fourteen years old, where I resided three years, and applied
              myself close to my studies; but the charge of maintaining me,
              although I had a very scanty allowance, being too great for a
              narrow fortune, I was bound apprentice to Mr. James Bates, an
              eminent surgeon in London, with whom I continued four years.
            </div>
          </div>
          <div className={`${styles.tab}`}>
            <input
              type="radio"
              name="css-tabs"
              id="tab-2"
              className={`${styles["tab-switch"]}`}
            />
            <label htmlFor="tab-2" className={`${styles["tab-label"]}`}>
              Security
            </label>
            <div className={`${styles["tab-content"]}`}>
              My father now and then sending me small sums of money, I laid them
              out in learning navigation, and other parts of the mathematics,
              useful to those who intend to travel, as I always believed it
              would be, some time or other, my fortune to do.
            </div>
          </div>
          <div className={`${styles.tab}`}>
            <input
              type="radio"
              name="css-tabs"
              id="tab-3"
              className={`${styles["tab-switch"]}`}
            />
            <label htmlFor="tab-3" className={`${styles["tab-label"]}`}>
              Activity
            </label>
            <div className={`${styles["tab-content"]}`}>
              When I left Mr. Bates, I went down to my father: where, by the
              assistance of him and my uncle John, and some other relations, I
              got forty pounds, and a promise of thirty pounds a year to
              maintain me at Leyden: there I studied physic two years and seven
              months, knowing it would be useful in long voyages.
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles["warpper"]}>
        <input
          className={`${styles["radio"]}`}
          id="one"
          name="group"
          type="radio"
          defaultChecked
        />
        <input
          className={`${styles["radio"]}`}
          id="two"
          name="group"
          type="radio"
        />
        <input
          className={`${styles["radio"]}`}
          id="three"
          name="group"
          type="radio"
        />

        <div className={`${styles["tabs"]}`}>
          <label className={`${styles["tab"]}`} id="one-tab" htmlFor="one">
            Tab1
          </label>
          <label className={`${styles["tab"]}`} id="two-tab" htmlFor="two">
            Tab2
          </label>
          <label className={`${styles["tab"]}`} id="three-tab" htmlFor="three">
            Tab3
          </label>
        </div>

        <div className={`${styles["panels"]}`}>
          <div className={`${styles["panel"]}`} id="one-panel">
            <div className={`${styles["panel-title"]}`}>Title1</div>
            <p>Content1</p>
          </div>
          <div className={`${styles["panel"]}`} id="two-panel">
            <div className={`${styles["panel-title"]}`}>Title2</div>
            <p>Content2</p>
          </div>
          <div className={`${styles["panel"]}`} id="three-panel">
            <div className={`${styles["panel-title"]}`}>Title3</div>
            <p>Content3</p>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ProfileTabs;
