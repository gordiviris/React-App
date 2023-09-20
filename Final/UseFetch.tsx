import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (id: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const [eventData, setEventData] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    venue: "",
    address: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get(id.toString()) 
      .then((response) => {
        setEventData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data", error);
        setError("An Error occurred while fetching product data.");
        setLoading(false);
      });
  }, [id]);

  return { eventData, loading, error };
};
