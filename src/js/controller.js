import * as model from "./model";
import recipeView from "./views/recipeView";
import "core-js/stable";
import "regenerator-runtime/runtime";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import bookmarksView from "./views/bookmarksView";
import paginationView from "./views/paginationView";

const controlRecipes = async function() {
 try {
  const id = window.location.hash.slice(1);

  if(!id) return;

  recipeView.renderSpinner();

  //update results viw to mark selected search

  resultsView.update(model.getSearchResultsPage());

  await model.loadRecipe(id);

  //rendering recipe
  recipeView.render(model.state.recipe);

  bookmarksView.update(model.state.bookmarks);

 } catch(err) {
  recipeView.renderError();
 }
}

const controlSearchResults = async function() {
try {

  resultsView.renderSpinner();
  const query = searchView.getQuery();
  if (!query) return;
  await model.loadSearchResults(`${query}`);
  resultsView.render(model.getSearchResultsPage());
  paginationView.render(model.state.search);

} catch (error) {
  console.log(error);

}

}

const controlPagination = function(nextPage) {
console.log(nextPage);
resultsView.render(model.getSearchResultsPage(nextPage));
  paginationView.render(model.state.search);

}
const controlAddBookmark = function() {
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  //render bookmarks
  bookmarksView.render(model.state.bookmarks);

}


const controlServings = function(newServings) {
//Update recipe servings (in state)
model.updateServings(newServings);
recipeView.update(model.state.recipe);

//update the recipe view

}
const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
}


const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);


}



init();



// window.addEventListener("hashchange", show);
// window.addEventListener("load", show);
