// api.ts
export interface Recommendation {
  id: string;
  title: string;
  instructor_name: string;
  skills: string[];
  avg_rating: number;
  num_reviews: number;
  content_length_min: number;
  category: string;
  price: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All';
  trending: boolean;
  provider: string;
  tags: string[];
  rating: number;
  reviews: number;
  enrolled: number;
  duration: string;
}

export const fetchRecommendations = async (query: string): Promise<Recommendation[]> => {
  try {
    const response = await fetch(`http://192.168.43.155:10000/recommend?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json() as Recommendation[];
    return data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
};