import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

const ProgressBars = ({ count = 5, colors = ['#40D6D9', '#D376FF'], interval = 1000 }) => {

    return (
        <div className={styles.progressContainer}>
            <Bar tooltipText={'Round 1'} isAnimated={false} isActive={true} isFilled={true} color={colors[1]} />
            <Bar tooltipText={'Round 2'} isAnimated={false} isActive={true} isFilled={true} color={colors[0]} />
            <Bar tooltipText={'Round 3'} isAnimated={true} isActive={true} isFilled={false} color={colors[0]} />
            <Bar tooltipText={'Round 4'} isAnimated={false} isActive={false} isFilled={false} color={colors[0]} />
            <Bar tooltipText={'Round 5'} isAnimated={false} isActive={false} isFilled={false} color={colors[1]} />
        </div>
    );
};

const Bar = ({ index, isActive, isFilled, color, tooltipText, isAnimated }) => {
    let barClass = `${styles.ract}`;
    if (isActive) {
        barClass += ` ${styles.fill}`;
    } else {
        barClass += ` ${styles.inactive}`;
    }
    if (isFilled) {
        barClass += ` ${styles.filled}`;
    }
    if (isAnimated) {
        barClass += ` ${styles.animate}`; // Add a new class for animation
    }

    return (
        <div className={styles.progressBar}>
            <div className={styles.underline} style={{ borderColor: color }}>
                <div
                    className={barClass} // Add isAnimated to class name here
                    style={{
                        '--active-color': color,
                        backgroundColor: isActive ? color : isFilled ? color : '#d3d3d3',
                    }}
                ></div>
            </div>
            {tooltipText && (
                <div className={styles.tooltip}>{tooltipText}</div>
            )}
        </div>
    );
};


export default ProgressBars;
