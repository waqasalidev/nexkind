const { syncMsLearnCourses } = require('./msLearnService');
const { syncExternalJobs } = require('./jobSyncService');
const { syncScholarships } = require('./scholarshipSyncService');
const { syncExternalEvents } = require('./eventSyncService');

/**
 * Data Sync Orchestrator
 * Runs background synchronization for Microsoft Learn Courses, Jobs, Scholarships, and Events.
 */

let syncState = {
  isRunning: false,
  lastSyncCompletedAt: null,
  lastSyncStatus: 'Idle',
  details: {}
};

const runAllSyncs = async () => {
  if (syncState.isRunning) {
    console.log('[SYNC-MANAGER] Synchronization is already in progress...');
    return { isRunning: true, message: 'Sync in progress' };
  }

  syncState.isRunning = true;
  syncState.lastSyncStatus = 'Running';
  console.log('[SYNC-MANAGER] Starting full data synchronization batch...');

  try {
    const courseRes = await syncMsLearnCourses(40);
    const jobRes = await syncExternalJobs();
    const scholarshipRes = await syncScholarships();
    const eventRes = await syncExternalEvents();

    syncState.isRunning = false;
    syncState.lastSyncCompletedAt = new Date();
    syncState.lastSyncStatus = 'Success';
    syncState.details = {
      courses: courseRes,
      jobs: jobRes,
      scholarships: scholarshipRes,
      events: eventRes
    };

    console.log('[SYNC-MANAGER] Full data synchronization batch completed successfully!');
    return { success: true, state: syncState };
  } catch (error) {
    syncState.isRunning = false;
    syncState.lastSyncStatus = 'Failed';
    syncState.details = { error: error.message };
    console.error('[SYNC-MANAGER] Data sync batch encountered error:', error.message);
    return { success: false, error: error.message };
  }
};

const getSyncStatus = () => syncState;

module.exports = {
  runAllSyncs,
  getSyncStatus
};
