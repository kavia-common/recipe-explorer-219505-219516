import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FavoritesPage.module.css';

// PUBLIC_INTERFACE
function FavoritesPage({ favorites, isLoading, error }) {
  /** Favorites list for demo user. */
  return (
    <main className={styles.main}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.h1}>Favorites</h1>
          <p className={styles.sub}>Saved recipes for demo user_id=1.</p>
        </div>
        <Link to="/" className={styles.backLink}>
          ← Back
        </Link>
      </div>

      {error ? <div className={styles.error}>{error}</div> : null}
      {isLoading ? <div className={styles.loading}>Loading favorites…</div> : null}

      <section className={styles.list} aria-label="Favorite recipes">
        {favorites.map((f) => (
          <Link key={f.id} to={`/recipes/${f.recipe_id}`} className={styles.item}>
            <div className={styles.thumb}>
              {f.recipe_image_url ? (
                <img className={styles.thumbImg} src={f.recipe_image_url} alt={f.recipe_title} />
              ) : (
                <div className={styles.thumbFallback}>No image</div>
              )}
            </div>
            <div className={styles.title}>{f.recipe_title}</div>
          </Link>
        ))}
      </section>

      {!isLoading && !error && favorites.length === 0 ? (
        <div className={styles.empty}>No favorites yet. Add some from the recipe list.</div>
      ) : null}
    </main>
  );
}

export default FavoritesPage;
