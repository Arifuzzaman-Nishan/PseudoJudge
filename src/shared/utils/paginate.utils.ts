export const paginateCalculate = (
  total: number,
  page: number,
  limit: number,
) => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;
  const nextPage = hasNextPage ? page + 1 : null;
  const previousPage = hasPreviousPage ? page - 1 : null;
  const skip = (page - 1) * limit;

  return {
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    skip,
  };
};
