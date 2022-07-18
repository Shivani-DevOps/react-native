/**
 * It is used to define pagination class.
 */
class Pagination {
  iPageNumber = 0;
  iLimit = 20;
  isAllLoaded = false;
  isLoading = false;

  constructor(pageNumber = 0, limit = 20) {
    this.iPageNumber = pageNumber;
    this.iLimit = limit;
  }

  getNextPage = () => {
    return this.iPageNumber * this.iLimit;
  };

  getRequestParameters = (params = {}) => {
    return Object.assign(params, {
      offset: this.getNextPage(),
      limit: this.iLimit,
    });
  };
}

export default Pagination;
