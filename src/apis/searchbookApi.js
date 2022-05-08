import axios from "axios";

export function searchbookApi(keyword, currentPage, itemsPerPage) {
  console.log(keyword, currentPage, itemsPerPage);
  return axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${keyword}&startIndex=${
        (currentPage - 1) * itemsPerPage
      }&maxResults=${itemsPerPage}`
    )
    .then((res) => {
      return res;
    });
}
