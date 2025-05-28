import { useState } from 'react';
import styles from './SearchBar.module.css';
import { FiSearch, FiMapPin } from 'react-icons/fi';

export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={`${styles.searchContainer} ${isFocused ? styles.focused : ''}`}>
        <FiMapPin className={styles.locationIcon} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for a city..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <FiSearch className={styles.searchIcon} />
          <span>Search</span>
        </button>
      </div>
    </form>
  );
};