/**
 * Shared in-memory stores for offline fallback.
 * These are used when MongoDB is unreachable so the app remains functional.
 * All controllers that need in-memory fallbacks import from this module
 * to avoid circular dependencies.
 */

const memoryEnrollments = [];
const memJobApplications = [];
const memEventRegistrations = [];

module.exports = { memoryEnrollments, memJobApplications, memEventRegistrations };
