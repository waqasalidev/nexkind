import { useState, useEffect, useCallback } from 'react';
import { getCourses } from '../api';
import { fallbackCourses } from '../data/fallbackCourses';

const TIMEOUT_MS = 8000; // 8 Seconds Timeout

const normalizeCourse = (item) => {
  if (!item || typeof item !== 'object') return null;

  return {
    _id: item._id || item.id || `course-${Math.random()}`,
    id: item._id || item.id || `course-${Math.random()}`,
    title: item.title || 'Untitled Course',
    shortDescription: item.shortDescription || item.description || 'Master key skills with interactive lessons and practical exercises.',
    description: item.description || item.shortDescription || '',
    category: item.category || 'Technology',
    skillLevel: item.skillLevel || 'Beginner',
    duration: item.duration || 'Self-paced',
    instructor: item.instructor || 'NexKind Instructor',
    provider: item.provider || item.source || 'NexKind Academy',
    rating: item.rating ? Number(item.rating) : 4.8,
    studentsEnrolled: item.studentsEnrolled ? Number(item.studentsEnrolled) : 0,
    image: item.image || item.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    thumbnail: item.thumbnail || item.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    sourceUrl: item.sourceUrl || item.enrollLink || '',
    isExternal: Boolean(item.isExternal || item.source === 'Microsoft Learn'),
    skills: Array.isArray(item.skills) ? item.skills : ['Skills Training'],
    createdAt: item.createdAt ? new Date(item.createdAt) : null,
    updatedAt: item.updatedAt ? new Date(item.updatedAt) : null,
    isFallback: false
  };
};

/**
 * Balance selection of courses across Beginner, Intermediate, and Expert
 */
const getBalancedCourses = (rawCourses = []) => {
  const normalized = rawCourses.map(normalizeCourse).filter(Boolean);
  if (!normalized.length) return [];

  // Sort by latest created/updated
  normalized.sort((a, b) => {
    const timeA = a.updatedAt || a.createdAt || new Date(0);
    const timeB = b.updatedAt || b.createdAt || new Date(0);
    return timeB - timeA;
  });

  const beginners = normalized.filter(c => c.skillLevel === 'Beginner');
  const intermediates = normalized.filter(c => c.skillLevel === 'Intermediate');
  const experts = normalized.filter(c => c.skillLevel === 'Expert' || c.skillLevel === 'Advanced');
  const others = normalized.filter(c => !['Beginner', 'Intermediate', 'Expert', 'Advanced'].includes(c.skillLevel));

  const result = [];

  // Take up to 2 from each level
  result.push(...beginners.slice(0, 2));
  result.push(...intermediates.slice(0, 2));
  result.push(...experts.slice(0, 2));

  // If less than 6, fill from remaining
  const filledIds = new Set(result.map(c => c._id));
  const remaining = [...normalized].filter(c => !filledIds.has(c._id));

  while (result.length < 6 && remaining.length > 0) {
    result.push(remaining.shift());
  }

  return result.slice(0, 6);
};

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [errorNotice, setErrorNotice] = useState(null);

  const fetchCoursesData = useCallback(async () => {
    setLoading(true);
    setErrorNotice(null);
    let isMounted = true;

    // Timeout Promise
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), TIMEOUT_MS)
    );

    try {
      // Race API request against timeout
      const response = await Promise.race([getCourses(), timeoutPromise]);

      if (!isMounted) return;

      const rawData = response.data;
      const courseList = Array.isArray(rawData)
        ? rawData
        : (rawData && Array.isArray(rawData.courses))
        ? rawData.courses
        : [];

      const balanced = getBalancedCourses(courseList);

      if (balanced.length > 0) {
        setCourses(balanced);
        setIsFallback(false);
      } else {
        // Empty data fallback
        console.warn('[USE-COURSES] API returned zero valid courses. Serving fallback data.');
        setCourses(fallbackCourses);
        setIsFallback(true);
        setErrorNotice('Showing featured courses while live catalog is initializing.');
      }
    } catch (err) {
      if (!isMounted) return;
      console.warn('[USE-COURSES] API fetch error or timeout:', err.message);
      setCourses(fallbackCourses);
      setIsFallback(true);
      setErrorNotice('Live catalog temporarily unavailable. Showing featured courses.');
    } finally {
      if (isMounted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoursesData();
  }, [fetchCoursesData]);

  return {
    courses,
    loading,
    isFallback,
    errorNotice,
    retry: fetchCoursesData
  };
};
