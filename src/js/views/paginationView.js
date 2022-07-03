import View from "./View";
import icons from "../../img/icons.svg";

class PaginationView extends View {

  _parentElement = document.querySelector(".pagination");

  _generateMarkUp() {
    const curPage = this._data.page;

    const numberPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    console.log(numberPages);
      //page 1 and there are other pages
      if (curPage === 1 && numberPages > 1) {


        return `<button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`

      }

      //page 1 and no other pages

      //middle page
      if (curPage < numberPages) {

        return `<button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      <button data-goto="${curPage + 1}"class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`

      }

       //last page

       if (curPage === numberPages && numberPages > 1) {

        return `<button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>`;

       }

       return ``;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(ev) {

      const btn = ev.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn);
      const goTo = +btn.dataset.goto;
      handler(goTo);
    });

  }
}

export default new PaginationView();
