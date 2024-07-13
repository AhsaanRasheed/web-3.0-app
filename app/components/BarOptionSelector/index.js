import React, { useState, useEffect } from 'react';
import styles from './index.module.scss'; // Import CSS styles

const ValueSelector = ({ values, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  // Set the default selected value to the first option
  useEffect(() => {
    if (values.length > 0 && !selectedValue) {
      setSelectedValue(values[0]);
      onSelect(values[0]);
    }
  }, [values, onSelect, selectedValue]);

  const handleSelect = (value) => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <div className={styles.itemSelector}>
      {values.map((value) => (
        <div
          key={value}
          className={`${styles.item} ${selectedValue === value ? styles.active : ''}`}
          onClick={() => handleSelect(value)}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default ValueSelector;
