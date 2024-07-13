import React from "react";
import styles from "./index.module.scss";

const RoundedLegend = ({ data }) => {
    /*
     *  webkitfilter for safari support
     */

    /**
     * 
     * @param {*} backgroundColor will be renderd based on passed dataset
     * @returns 
     */

    const cumuteShadowColor = (backgroundColor) => {
        return `drop-shadow(0px 0px 14.4px ${backgroundColor})
                drop-shadow(0px 0px 28.8px ${backgroundColor})
                drop-shadow(0px 0px 100.8px ${backgroundColor})
                drop-shadow(0px 0px 604.8px ${backgroundColor})
                drop-shadow(0px 0px 50px ${backgroundColor})`;
    };

    return (
        <div className={styles.legend}>
            {data.labels.map((label, index) => (
                <div key={label} className={styles.legendItem}>
                    <div
                        className={styles.legendColor}
                        style={{
                            backgroundColor: data.datasets[0].backgroundColor[index],
                            filter: cumuteShadowColor(data.datasets[0].backgroundColor[index]),
                            WebkitFilter: cumuteShadowColor(data.datasets[0].backgroundColor[index]),
                        }}
                    ></div>
                    <div className={styles.legendTitle}>
                        <span>{label}</span> 
                        <span>-</span>
                        <span>{data.datasets[0].data[index]}%</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RoundedLegend;
