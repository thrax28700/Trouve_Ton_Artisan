import { useState } from 'react';
import './SearchBar.scss';

function SearchBar({ onSearch, initialValue = '', placeholder = 'Rechercher un artisan, un métier, une ville…' }) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <form className="searchbar" role="search" onSubmit={handleSubmit}>
      <label htmlFor="searchbar-input" className="visually-hidden">
        Rechercher un artisan
      </label>
      <div className="searchbar__inner">
        <i className="bi bi-search searchbar__icon" aria-hidden="true" />
        <input
          id="searchbar-input"
          type="search"
          className="searchbar__input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            className="searchbar__clear"
            onClick={handleClear}
            aria-label="Effacer la recherche"
          >
            <i className="bi bi-x-circle-fill" aria-hidden="true" />
          </button>
        )}
        <button type="submit" className="searchbar__btn">
          Rechercher
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
