import View from "./View";
import previewView from "./previewView";
import icons from "../../img/icons.svg";

class BookmarksView extends View {

  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet.";
  _message = "";


  _generateMarkUp() {

    return this._data.map(result => previewView.render(result, false)).join();

  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }


}

export default new BookmarksView();
