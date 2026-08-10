const Scholarship = require('../../models/Scholarship');

/**
 * Scholarship Ingestion & Verification Hybrid Service
 * Validates deadlines, updates verification statuses, and prevents displaying expired financial aid.
 */

const syncScholarships = async () => {
  try {
    console.log('[SCHOLARSHIP-SYNC] Verifying scholarship deadlines and statuses...');
    const scholarships = await Scholarship.find({});
    let expiredCount = 0;
    const now = new Date();

    for (const item of scholarships) {
      if (!item.deadline) continue;

      let isExpired = false;
      const parsedDate = new Date(item.deadline);

      // Check if deadline is a valid date object and passed
      if (!isNaN(parsedDate.getTime()) && parsedDate < now) {
        isExpired = true;
      }

      if (isExpired && item.verificationStatus !== 'Expired') {
        item.verificationStatus = 'Expired';
        item.lastVerifiedAt = now;
        await item.save();
        expiredCount++;
      }
    }

    console.log(`[SCHOLARSHIP-SYNC] Verified ${scholarships.length} scholarships. Updated ${expiredCount} expired listings.`);
    return { success: true, totalVerified: scholarships.length, expiredCount };
  } catch (error) {
    console.error('[SCHOLARSHIP-SYNC] Error verifying scholarships:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { syncScholarships };
