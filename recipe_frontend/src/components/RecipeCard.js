import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RecipeCard.module.css';

// PUBLIC_INTERFACE
function RecipeCard({ recipe, onFavorite }) {
  /** Recipe summary card for grid display. */
  return (
    <article className={styles.card}>
      <Link to={`/recipes/${recipe.id}`} className={styles.imageLink} aria-label={`View ${recipe.title}`}>
        <div className={styles.imageFrame}>
          {recipe.image_url ? (
            <img className={styles.image} src={recipe.image_url} alt={recipe.title} />
          ) : (
            <div className={styles.imageFallback}>No image</div>
          )}
        </div>
      </Link>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>
            <Link to={`/recipes/${recipe.id}`} className={styles.titleLink}>
              {recipe.title}
            </Link>
          </h3>
          <button type="button" className={styles.favBtn} onClick={() => onFavorite(recipe.id)}>
            + Fav
          </button>
        </div>

        <p className={styles.desc}>{recipe.description}</p>
      </div>
    </article>
  );
}

export default RecipeCard;
