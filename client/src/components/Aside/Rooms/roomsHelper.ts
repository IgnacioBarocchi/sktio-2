export const fetchData = async () => {
  let data;
  let error;
  try {
    const response = await fetch("http://localhost:8585/api/public-rooms");
    data = await response.json();
  } catch (err) {
    error = err;
  } finally {
    return [data, error];
  }
};
