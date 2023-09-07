import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const [productData, setProductData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    price: 0,
    rating: { rate: 0, count: 0 },
  });

  useEffect(() => {
    // setLoading(true);
    // setError(undefined);

    // fetch(url)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         setProductData(data);
    //         setLoading(false);
    //     })
    //     .catch((error) => {
    //         console.error('Error fetching product data', error);
    //         setError('An Error occurred while fetching product data.');
    //         setLoading(false);
    //     });
    axios
      .get(url) // Use axios instead of fetch
      .then((response) => {
        setProductData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data", error);
        setError("An Error occurred while fetching product data.");
        setLoading(false);
      });
  }, [url]);

  return { productData, loading, error };
};
