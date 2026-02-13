const API_BASE_URL = 'http://localhost:3001';

async function handleJson(res) {
  if (!res.ok) {
    let detail = 'Request failed';
    try {
      const data = await res.json();
      detail = data?.detail || JSON.stringify(data);
    } catch (e) {
      // ignore json parse errors
    }
    throw new Error(detail);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function fetchCategories() {
  /** Fetch all recipe categories. */
  const res = await fetch(`${API_BASE_URL}/categories`);
  return handleJson(res);
}

// PUBLIC_INTERFACE
export async function fetchRecipes({ categoryId, q } = {}) {
  /** Fetch recipes with optional categoryId and q filters. */
  const params = new URLSearchParams();
  if (categoryId) params.set('category_id', String(categoryId));
  if (q) params.set('q', q);

  const url = `${API_BASE_URL}/recipes${params.toString() ? `?${params.toString()}` : ''}`;
  const res = await fetch(url);
  return handleJson(res);
}

// PUBLIC_INTERFACE
export async function fetchRecipeById(id) {
  /** Fetch recipe details by id. */
  const res = await fetch(`${API_BASE_URL}/recipes/${id}`);
  return handleJson(res);
}

// PUBLIC_INTERFACE
export async function addFavorite({ userId, recipeId }) {
  /** Add a recipe to favorites (demo user supported). */
  const res = await fetch(`${API_BASE_URL}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, recipe_id: recipeId }),
  });
  return handleJson(res);
}

// PUBLIC_INTERFACE
export async function fetchFavorites(userId) {
  /** Fetch favorites for a given userId. */
  const res = await fetch(`${API_BASE_URL}/favorites?user_id=${encodeURIComponent(String(userId))}`);
  return handleJson(res);
}
