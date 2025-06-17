export const isFilterEmpty = (filters) => {
  return (
    filters["Experience Level"].length === 0 &&
    filters["Job Type"].length === 0 &&
    filters.Location.length === 0 &&
    filters.Salary.length === 0
  );
};
