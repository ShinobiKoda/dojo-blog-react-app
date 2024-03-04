import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    setTimeout(() => {
      fetch(url, {signal: abortController.signal})
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not fetch data");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setisLoading(false);
          setError(null);
        })
        .catch((err) => {
          if(err.name === "AbortError")
          {
            console.log('fetch aborted');
          }else{
            setisLoading(false);
            setError(err.message);
          }
        });
    }, 1000);

    return () => abortController.abort();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
