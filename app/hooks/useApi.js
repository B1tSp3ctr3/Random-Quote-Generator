import React from "react";
import { useState } from "react";

export default useAPI = (apiFunc) => {
  const [data, setData] = React.useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) {
      setError(true);
      return response;
    }
    setError(false);
    setData(response.data);
    return response;
  };
  return { data, error, loading, request };
};
