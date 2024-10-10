import { useState, useEffect } from 'react';
import { UniversityData } from '@/lib/universityData';

export const useUniversityRanking = (universityName: string) => {
  const [universityData, setUniversityData] = useState<UniversityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUniversityData = async () => {
      if (!universityName) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/university-ranking?name=${encodeURIComponent(universityName)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch university data');
        }
        const data: UniversityData = await response.json();
        setUniversityData(data);
      } catch (error) {
        console.error('Error fetching university data:', error);
        setError('Failed to fetch university data');
        setUniversityData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversityData();
  }, [universityName]);

  return { universityData, loading, error };
};