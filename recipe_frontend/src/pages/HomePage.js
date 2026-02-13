import React from 'react';
import RecipeCard from '../components/RecipeCard';
import styles from './HomePage.module.css';

// PUBLIC_INTERFACE
function HomePage({ recipes, onFavorite, isLoading, error }) {
  /** Main recipe browsing page. */
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.h1}>Browse recipes</h1>
        <p className={styles.sub}>
          Search by ingredient, filter by category, and save favorites (demo user_id=1).
        </p>
      </div>

      {error ? <div className={styles.error}>{error}</div> : null}
      {isLoading ? <div className={styles.loading}>Loading recipes…</div> : null}

      <section className={styles.grid} aria-label="Recipe list">
        {recipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} onFavorite={onFavorite} />
        ))}
      </section>

      {!isLoading && !error && recipes.length === 0 ? (
        <div className={styles.empty}>No recipes found. Try another search.</div>
      ) : null}
    </main>
  );
}

export default HomePage;
