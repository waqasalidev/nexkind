const Course = require('../../models/Course');

/**
 * Microsoft Learn Catalog API Integration Service
 * Documentation: https://learn.microsoft.com/en-us/training/support/catalog-api
 */

const mapMsLevelToNexkind = (levels = []) => {
  if (!levels || levels.length === 0) return 'Beginner';
  const primary = levels[0].toLowerCase();
  if (primary.includes('beginner') || primary.includes('introductory')) return 'Beginner';
  if (primary.includes('intermediate')) return 'Intermediate';
  if (primary.includes('advanced') || primary.includes('expert')) return 'Expert';
  return 'All Levels';
};

const mapMsCategory = (products = [], roles = []) => {
  const combined = [...products, ...roles].map(item => (typeof item === 'string' ? item.toLowerCase() : ''));
  if (combined.some(c => c.includes('design') || c.includes('media'))) return 'Design';
  if (combined.some(c => c.includes('business') || c.includes('management'))) return 'Business & Career';
  if (combined.some(c => c.includes('ai') || c.includes('data') || c.includes('machine'))) return 'Academic & General';
  return 'Technology';
};

const syncMsLearnCourses = async (limit = 40) => {
  try {
    console.log('[MS-LEARN-SYNC] Fetching catalog from Microsoft Learn API...');
    const response = await fetch('https://learn.microsoft.com/api/catalog');
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const modules = data.modules || [];
    const learningPaths = data.learningPaths || [];
    const catalogItems = [...learningPaths.slice(0, limit / 2), ...modules.slice(0, limit / 2)];

    let syncedCount = 0;

    for (const item of catalogItems) {
      if (!item.uid || !item.title) continue;

      const level = mapMsLevelToNexkind(item.levels);
      const category = mapMsCategory(item.products, item.roles);
      const skills = Array.isArray(item.products) ? item.products.slice(0, 5) : ['Cloud', 'Microsoft'];

      const normalizedCourse = {
        title: item.title,
        shortDescription: item.summary || (item.title + ' — Official Microsoft Learn training course.'),
        description: item.summary || item.title,
        instructor: 'Microsoft Certified Trainers',
        provider: 'Microsoft',
        platform: 'Microsoft Learn',
        rating: 4.9,
        duration: item.duration_in_minutes ? `${Math.ceil(item.duration_in_minutes / 60)} Hours` : '4 Hours',
        totalLectures: item.units ? item.units.length : 8,
        language: 'English',
        price: 0,
        category,
        skillLevel: level,
        skills,
        prerequisites: ['Basic familiarity with technology concepts'],
        certificateEligible: true,
        status: 'published',
        image: item.icon_url || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
        source: 'Microsoft Learn',
        sourceUrl: item.url || `https://learn.microsoft.com/training/modules/${item.uid}`,
        externalCourseId: item.uid,
        isExternal: true,
        enrollLink: item.url || `https://learn.microsoft.com/training/modules/${item.uid}`,
        lastSyncedAt: new Date(),
        modules: (item.units || []).map((u, idx) => ({
          title: `Module ${idx + 1}: ${u}`,
          description: `Learn core skills in ${u}`,
          duration: '30 mins',
          lessons: [{
            title: `Lesson ${idx + 1}.1: Interactive Guidance on ${u}`,
            description: `Hands-on module hosted on Microsoft Learn platform.`,
            duration: '30 mins',
            videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
            preparationMaterial: 'Review prerequisites on Microsoft Learn site.'
          }]
        }))
      };

      await Course.findOneAndUpdate(
        { source: 'Microsoft Learn', externalCourseId: item.uid },
        normalizedCourse,
        { upsert: true, new: true }
      );
      syncedCount++;
    }

    console.log(`[MS-LEARN-SYNC] Successfully synchronized ${syncedCount} courses from Microsoft Learn API.`);
    return { success: true, syncedCount };
  } catch (error) {
    console.error('[MS-LEARN-SYNC] Error synchronizing Microsoft Learn catalog:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { syncMsLearnCourses };
