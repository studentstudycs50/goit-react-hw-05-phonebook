import React from "react";
import FilterStyled from '../Filter/FilterStyled';


const Filter = ({ value, onChangeFilter }) => {
  return (
      <FilterStyled>
        <label className="filter-title">
          Find contact by name
          <input
            type="text"
            name="filter"
            value={value}
          onChange={onChangeFilter}
          className="filter-input"
          />
        </label>
    </FilterStyled>
  );
};

export default Filter;

