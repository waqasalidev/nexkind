const Job = require('../../models/Job');

/**
 * Job Synchronization Integration Service
 * Ingests external jobs, normalizes regional fields (Pakistan, India, Bangladesh, UAE, Remote),
 * prevents duplicates via (source + externalJobId), and archives expired positions.
 */

const syncExternalJobs = async () => {
  try {
    console.log('[JOB-SYNC] Synchronizing external job feeds...');
    let syncedCount = 0;

    // 1. Fetch RemoteOK Developer & Tech Jobs API
    try {
      const response = await fetch('https://remoteok.com/api');
      if (response.ok) {
        const remoteJobs = await response.json();
        // First item in RemoteOK JSON is legal disclaimer object, slice from 1
        const jobList = Array.isArray(remoteJobs) ? remoteJobs.slice(1, 30) : [];

        for (const item of jobList) {
          if (!item.id || !item.position || !item.company) continue;

          const externalJobId = `remoteok_${item.id}`;
          const isRemote = true;
          const country = 'Global';
          const city = 'Remote';

          const normalizedJob = {
            title: item.position,
            description: item.description || `${item.position} role at ${item.company}. Apply on official company board.`,
            company: item.company,
            country,
            city,
            location: item.location || 'Remote / Worldwide',
            category: (item.tags && item.tags.length) ? (item.tags[0].charAt(0).toUpperCase() + item.tags[0].slice(1)) : 'Technology',
            experienceLevel: item.position.toLowerCase().includes('senior') ? 'Senior' :
                             item.position.toLowerCase().includes('intern') ? 'Internship' :
                             item.position.toLowerCase().includes('lead') ? 'Senior' : 'Mid-level',
            type: 'Full-time',
            workMode: 'Remote',
            companyLogo: item.company_logo || item.logo || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80',
            salary: item.salary_min ? `$${item.salary_min} - $${item.salary_max || item.salary_min * 1.3}` : 'Competitive',
            currency: 'USD',
            responsibilities: [
              'Develop scalable tech infrastructure and maintain high code quality',
              'Collaborate with global distributed software engineering teams',
              'Participate in code reviews and architecture design meetings'
            ],
            requirements: item.tags || ['JavaScript', 'React', 'Node.js'],
            skills: item.tags || ['Remote Work', 'Software Engineering'],
            companyLink: item.company_url || item.url,
            applyLink: item.apply_url || item.url,
            applicationUrl: item.apply_url || item.url,
            source: 'RemoteOK API',
            sourceUrl: item.url || 'https://remoteok.com',
            externalJobId,
            status: 'active',
            fetchedAt: new Date(),
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days active window
            lastSyncedAt: new Date()
          };

          await Job.findOneAndUpdate(
            { source: 'RemoteOK API', externalJobId },
            normalizedJob,
            { upsert: true, new: true }
          );
          syncedCount++;
        }
      }
    } catch (err) {
      console.warn('[JOB-SYNC] RemoteOK fetch warning:', err.message);
    }

    // 2. Archive Expired Jobs (where deadline or expiresAt has passed)
    const now = new Date();
    const archivedResult = await Job.updateMany(
      {
        status: 'active',
        $or: [
          { expiresAt: { $lt: now } },
          { deadline: { $lt: now } }
        ]
      },
      { status: 'archived' }
    );

    if (archivedResult.modifiedCount > 0) {
      console.log(`[JOB-SYNC] Automatically archived ${archivedResult.modifiedCount} expired job listings.`);
    }

    console.log(`[JOB-SYNC] Successfully synchronized ${syncedCount} external jobs.`);
    return { success: true, syncedCount, archivedCount: archivedResult.modifiedCount || 0 };
  } catch (error) {
    console.error('[JOB-SYNC] Error synchronizing job feeds:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { syncExternalJobs };
