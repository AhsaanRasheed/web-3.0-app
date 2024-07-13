import React, { useState, Children, cloneElement } from 'react';
import styles from './index.module.scss';
import NewsDropdown from '../../../components/Lobby/_components/Dropdown';

const TabView = ({ children, onOptionChange }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [sortByType, setSortByType] = useState("desc");
    const [sortBy, setSortBy] = useState({
        lbl: "Round 1",
        value: "released_at",
        disable: false,
    });



    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className={styles.tabView}>
            <div className={styles.tabButtons}>
                {Children.map(children, (child, index) => (
                    <div
                        key={index}
                        className={`${styles.tabButton} ${activeTab === index ? styles.active : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {child.props.label}
                    </div>
                ))}
                {activeTab === 1 && (
                    <NewsDropdown
                        label={""}
                        sortValue={sortByType}
                        onSortChange={(e) => {
                            setSortByType(e);
                        }}
                        customWidth={"170px"}
                        options={[
                            { lbl: "Round 1", value: "released_at", disable: false },
                            { lbl: "Round 2", value: "released_at", disable: false },
                            { lbl: "Round 3", value: "released_at", disable: false },
                            { lbl: "Round 4", value: "released_at", disable: false },
                            { lbl: "Round 5", value: "released_at", disable: true },
                        ]}
                        onChange={(e) => {
                            setSortBy(e);
                            if (onOptionChange) {
                                onOptionChange(e);
                            }
                        }}
                        selectedOtp={sortBy}
                    />
                )}
            </div>
            <div className={styles.tabContent}>
                {cloneElement(children[activeTab], { active: true })}
            </div>
        </div>
    );
};

export default TabView;
