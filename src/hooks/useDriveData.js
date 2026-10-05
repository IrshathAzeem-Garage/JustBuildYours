import { useState, useEffect } from 'react';
import { fetchDriveJson } from '../services/externalData';

export function useDriveData(key) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchDriveJson(key)
      .then((json) => {
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error(`Error loading external data for ${key}:`, err);
          setError(err.message || 'Failed to load content');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [key]);

  return { data, loading, error };
}
