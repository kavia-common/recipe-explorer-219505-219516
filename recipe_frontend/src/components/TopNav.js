import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TopNav.module.css';

// PUBLIC_INTERFACE
function TopNav({
  categories,
  selectedCategoryId,
  onSelectCategory,
  searchValue,
  onSearchChange,
}) {
  /** Top navigation with category pills and search bar. */
  return (
    <header className={styles.header}>
      <div className={styles.brandRow}>
        <Link to="/" className={styles.brand}>
          Recipe Explorer
        </Link>
        <div className={styles.tagline}>retro bites • modern search</div>
      </div>

      <div className={styles.controls}>
        <nav className={styles.categoryNav} aria-label="Recipe categories">
          <button
            type="button"
            className={`${styles.catPill} ${selectedCategoryId == null ? styles.catPillActive : ''}`}
            onClick={() => onSelectCategory(null)}
          >
            All
          </button>

          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`${styles.catPill} ${selectedCategoryId === c.id ? styles.catPillActive : ''}`}
              onClick={() => onSelectCategory(c.id)}
            >
              {c.name}
            </button>
          ))}
        </nav>

        <div className={styles.searchWrap}>
          <label className={styles.searchLabel} htmlFor="recipeSearch">
            Search
          </label>
          <input
            id="recipeSearch"
            className={styles.searchInput}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="title or ingredient…"
          />
          <Link to="/favorites" className={styles.favLink}>
            Favorites
          </Link>
        </div>
      </div>
    </header>
  );
}

export default TopNav;
