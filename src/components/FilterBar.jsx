import React from 'react';

const FilterBar = ({ filter, setFilter }) => {
  return (
   <div className="filter-bar">
  {['all', 'pending', 'completed'].map((f) => (
    <button
      key={f}
      className={`filter-button ${filter === f ? 'active' : ''}`}
      onClick={() => setFilter(f)}
    >
      {f.charAt(0).toUpperCase() + f.slice(1)}
    </button>
  ))}
</div>

  );
};

export default FilterBar;
