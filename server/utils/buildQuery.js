/**
 * Build MongoDB query from request query params for list endpoints.
 */
const buildSearchFilter = (search, fields) => {
  if (!search || !search.trim()) return null;
  const regex = { $regex: search.trim(), $options: 'i' };
  return { $or: fields.map((field) => ({ [field]: regex })) };
};

const buildScholarshipQuery = (query) => {
  const filter = {};
  const searchFilter = buildSearchFilter(query.search, [
    'title',
    'provider',
    'university',
    'country',
    'description',
  ]);
  if (searchFilter) Object.assign(filter, searchFilter);
  if (query.country) filter.country = { $regex: query.country, $options: 'i' };
  if (query.degreeLevel) filter.degreeLevel = query.degreeLevel;
  if (query.fundingType) filter.fundingType = query.fundingType;
  if (query.category) filter.category = { $regex: query.category, $options: 'i' };
  return filter;
};

const buildCourseQuery = (query) => {
  const filter = {};
  const searchFilter = buildSearchFilter(query.search, [
    'title',
    'description',
    'instructor',
    'category',
  ]);
  if (searchFilter) Object.assign(filter, searchFilter);
  if (query.category) filter.category = { $regex: query.category, $options: 'i' };
  if (query.skillLevel) filter.skillLevel = query.skillLevel;
  return filter;
};

const buildJobQuery = (query) => {
  const filter = {};
  const searchFilter = buildSearchFilter(query.search, [
    'title',
    'company',
    'description',
    'location',
    'category',
  ]);
  if (searchFilter) Object.assign(filter, searchFilter);
  if (query.type) filter.type = query.type;
  if (query.category) filter.category = { $regex: query.category, $options: 'i' };
  if (query.workMode) filter.workMode = query.workMode;
  if (query.remote === 'true') filter.workMode = 'Remote';

  if (query.includeExpired !== 'true') {
    filter.status = { $ne: 'archived' };
    filter.$or = [
      { deadline: { $exists: false } },
      { deadline: null },
      { deadline: { $gte: new Date() } }
    ];
  }

  return filter;
};

const buildEventQuery = (query) => {
  const filter = {};
  const searchFilter = buildSearchFilter(query.search, [
    'title',
    'description',
    'location',
    'organizer',
    'category',
  ]);
  if (searchFilter) Object.assign(filter, searchFilter);
  if (query.category) filter.category = { $regex: query.category, $options: 'i' };
  if (query.status) filter.status = query.status;

  return filter;
};

module.exports = { buildScholarshipQuery, buildCourseQuery, buildJobQuery, buildEventQuery };
