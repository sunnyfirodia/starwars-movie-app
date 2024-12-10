import React, { ChangeEvent } from 'react';
import '../styles/filterSort.css';

interface FilterSortProps {
  onFilter: (filterText: string) => void;
  onSort: (sortOption: string) => void;
}

const FilterSort: React.FC<FilterSortProps> = ({ onFilter, onSort }) => {
  const [filter, setFilter] = React.useState<string>('');
  const [sortOption, setSortOption] = React.useState<string>('');

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    onFilter(value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOption(value);
    onSort(value);
  };

  return (
    <div className="filter-sort-container">
    <div className="filter-sort-controls">
      <select
        value={sortOption}
        onChange={handleSortChange}
        className="filter-sort-select"
      >
        <option value="">Sort By</option>
        <option value="year">Release Year</option>
        <option value="episode">Episode</option>
      </select>
      <div className="filter-sort-input-container">
        <input
          type="text"
          placeholder="Filter by title..."
          className="filter-sort-input"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
    </div>
  </div>
  );
};

export default FilterSort;
