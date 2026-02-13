import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RecipeDetailPage.module.css';

// PUBLIC_INTERFACE
function RecipeDetailPage({ recipe, onFavorite, isLoading, error }) {
  /** Recipe detail page with ingredients and instructions. */
  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.loading}>Loading recipe…</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.main}>
        <div className={styles.error}>{error}</div>
        <Link to="/" className={styles.backLink}>
          ← Back
        </Link>
      </main>
    );
  }

  if (!recipe) return null;

  return (
    <main className={styles.main}>
      <Link to="/" className={styles.backLink}>
        ← Back
      </Link>

      <section className={styles.card}>
        <div className={styles.media}>
          {recipe.image_url ? (
            <img className={styles.image} src={recipe.image_url} alt={recipe.title} />
          ) : (
            <div className={styles.imageFallback}>No image</div>
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.titleRow}>
            <h1 className={styles.h1}>{recipe.title}</h1>
            <button type="button" className={styles.favBtn} onClick={() => onFavorite(recipe.id)}>
              + Favorite
            </button>
          </div>

          <p className={styles.desc}>{recipe.description}</p>

          <div className={styles.columns}>
            <div>
              <h2 className={styles.h2}>Ingredients</h2>
              <ul className={styles.list}>
                {recipe.ingredients.map((i) => (
                  <li key={i} className={styles.listItem}>
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={styles.h2}>Instructions</h2>
              <p className={styles.instructions}>{recipe.instructions}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RecipeDetailPage;
