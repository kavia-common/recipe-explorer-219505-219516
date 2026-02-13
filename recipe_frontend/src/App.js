import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';

import { addFavorite, fetchCategories, fetchFavorites, fetchRecipeById, fetchRecipes } from './apiClient';
import TopNav from './components/TopNav';
import FavoritesPage from './pages/FavoritesPage';
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import './App.css';

const DEMO_USER_ID = 1;

function RecipeDetailRoute({ onFavorite }) {
  const { id } = useParams();
  const recipeId = Number(id);

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setIsLoading(true);
      setError('');
      try {
        const data = await fetchRecipeById(recipeId);
        if (!cancelled) setRecipe(data);
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load recipe');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    if (Number.isFinite(recipeId)) load();
    return () => {
      cancelled = true;
    };
  }, [recipeId]);

  return <RecipeDetailPage recipe={recipe} isLoading={isLoading} error={error} onFavorite={onFavorite} />;
}

// PUBLIC_INTERFACE
function App() {
  /** Main app component for Recipe Explorer UI. */
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const [recipes, setRecipes] = useState([]);
  const [recipesLoading, setRecipesLoading] = useState(true);
  const [recipesError, setRecipesError] = useState('');

  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);
  const [favoritesError, setFavoritesError] = useState('');

  const debouncedSearch = useMemo(() => searchValue.trim(), [searchValue]);

  useEffect(() => {
    let cancelled = false;
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        if (!cancelled) setCategories(data);
      } catch (e) {
        // categories are non-blocking; ignore for minimal slice
      }
    }
    loadCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadRecipes() {
      setRecipesLoading(true);
      setRecipesError('');
      try {
        const data = await fetchRecipes({
          categoryId: selectedCategoryId,
          q: debouncedSearch ? debouncedSearch : undefined,
        });
        if (!cancelled) setRecipes(data);
      } catch (e) {
        if (!cancelled) setRecipesError(e.message || 'Failed to load recipes');
      } finally {
        if (!cancelled) setRecipesLoading(false);
      }
    }
    loadRecipes();
    return () => {
      cancelled = true;
    };
  }, [selectedCategoryId, debouncedSearch]);

  async function refreshFavorites() {
    setFavoritesLoading(true);
    setFavoritesError('');
    try {
      const data = await fetchFavorites(DEMO_USER_ID);
      setFavorites(data);
    } catch (e) {
      setFavoritesError(e.message || 'Failed to load favorites');
    } finally {
      setFavoritesLoading(false);
    }
  }

  useEffect(() => {
    refreshFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleFavorite(recipeId) {
    try {
      await addFavorite({ userId: DEMO_USER_ID, recipeId });
      await refreshFavorites();
    } catch (e) {
      // keep minimal: surface via recipesError banner
      setRecipesError(e.message || 'Failed to add favorite');
    }
  }

  return (
    <BrowserRouter>
      <div className="AppShell">
        <TopNav
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                recipes={recipes}
                isLoading={recipesLoading}
                error={recipesError}
                onFavorite={handleFavorite}
              />
            }
          />
          <Route
            path="/recipes/:id"
            element={<RecipeDetailRoute onFavorite={handleFavorite} />}
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                isLoading={favoritesLoading}
                error={favoritesError}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
