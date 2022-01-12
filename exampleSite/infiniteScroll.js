/* Modified from: https://sentamal.in/articles/infinite-scrolling-on-hugo-list-pages/
 *
 * Reload is triggered when footer is reached */

async function loadNextListPage() {
  let currentPagePaginationContainer = document.querySelector("main");
  let currentPageNextLink = document.querySelector(".paginator-next-page");
  let nextPage = currentPageNextLink.getAttribute("href");

  /* Try to get the next page asynchronously */
  /* console.log("pagination: Fetching next page..."); */
  try {

    let response = await fetch(nextPage);

    if (response.ok) {

      let data = await response.text();
      /* console.log("pagination: Next page fetched!"); */

      /* Get the new Pagination items of the next page and append */
      let parser = new DOMParser();
      let nextPageDom = parser.parseFromString(data, "text/html");
      /* console.log("pagination: Data parsed into temporary DOM!"); */
      let newPaginatorItems = nextPageDom.querySelector("main").children;
      newPaginatorItems[0].removeAttribute("open");
      for (i = 0; i < newPaginatorItems.length; i++) {
        currentPagePaginationContainer.append(newPaginatorItems[i].cloneNode(true));
      }
      /* console.log("pagination: New items added!"); */

      /* Update the history to the last page loaded */
      let state = { 
        "status": "pagination: New list items added",
        "previousPage": window.location.pathname + window.location.search,
        "currentPage": nextPage };
      history.replaceState(state, "", nextPage);
      /* console.log("pagination: History state replaced - ", state); */

      /* Update the next page link on the current page */
      let newNextLink = nextPageDom.querySelector(".paginator-next-page");
      if (newNextLink) { // When there is no next page, newNextLink is 'null'
        currentPageNextLink.setAttribute("href", newNextLink.getAttribute("href"));
        /* console.log("pagination: Updated next page link!"); */
      } else { // When there are no other pages, remove the next page link
        if (currentPageNextLink.parentNode) currentPageNextLink.parentNode.removeChild(currentPageNextLink);
        /* console.log("pagination: Removed next page anchor!"); */
      }

    } else throw "response.ok was unsuccessful with status '" + response.statusText + " (" + response.status + ")'";

  } catch (error) {
    console.error("pagination: Caught a Fetch API exception loading the next page! - ", error);
  }
}

/* Use the Intersection Observer API to get new items when scrolled down */
function observeForInfiniteScroll() {
  let nextPageObserver = new IntersectionObserver((entries, observer) => {
    let firstEntry = entries[0];
    if (firstEntry.isIntersecting) {
      if (!document.querySelector(".paginator-next-page")) {
        observer.disconnect();
        /* console.log("pagination: IntersectionObserver disconnected!"); */
      }
      else loadNextListPage();
    }
  }, {
    rootMargin: "0px 0px 80px 0px"
  });
  
  nextPageObserver.observe(document.querySelector("footer"));
}
if (("IntersectionObserver" in window) && ("fetch" in window)) {
  /* console.log("pagination: IntersectionObserver and Fetch API available") */
  addLoadEvent(observeForInfiniteScroll);
}

/* The onclick event for '.paginator-next-page' */
function manuallyLoadNextPage() {
  event.preventDefault(); // Disable the default href click event
  loadNextListPage();
}

/* Add onclick to '.paginator-next-page' if Fetch API is available */
function checkForFetchSupport() {
  if (("fetch" in window) && (document.querySelector(".paginator-next-page"))) {
    /* console.log("pagination: Fetch API available"); */
    document.querySelector(".paginator-next-page").setAttribute("onclick", "manuallyLoadNextPage();");
  }
}
addLoadEvent(checkForFetchSupport);

/* From: https://www.htmlgoodies.com/beyond/javascript/article.php/3724571/Using-Multiple-JavaScript-Onload-Functions.htm
 *
 * Create a way to add multiple functions to load events */

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}
