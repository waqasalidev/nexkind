const Event = require('../../models/Event');

/**
 * Events Synchronization Service
 * Integrates Ticketmaster Discovery API (where API Key is available) while preserving
 * local NexKind NGO events (workshops, career counseling, resume sessions).
 */

const syncExternalEvents = async () => {
  try {
    console.log('[EVENT-SYNC] Synchronizing event feeds...');
    let syncedCount = 0;
    const apiKey = process.env.TICKETMASTER_API_KEY;

    if (apiKey) {
      try {
        const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&classificationName=technology,education&size=20`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          const events = data._embedded ? data._embedded.events : [];

          for (const item of events) {
            if (!item.id || !item.name) continue;

            const externalEventId = `tm_${item.id}`;
            const eventDate = item.dates && item.dates.start ? item.dates.start.localDate : '2026-10-15';
            const eventTime = item.dates && item.dates.start && item.dates.start.localTime ? item.dates.start.localTime : '10:00 AM';

            const normalizedEvent = {
              title: item.name,
              description: item.info || item.pleaseNote || `${item.name} — Global technology & educational event.`,
              date: eventDate,
              time: `${eventTime} EST`,
              startTime: eventTime,
              location: item._embedded && item._embedded.venues ? `${item._embedded.venues[0].name}, ${item._embedded.venues[0].city?.name || ''}` : 'Global Venue',
              eventMode: 'hybrid',
              meetingUrl: item.url || '',
              registrationUrl: item.url || '',
              organizer: item._embedded && item._embedded.attractions ? item._embedded.attractions[0].name : 'Ticketmaster Partner',
              category: 'Conference',
              image: item.images && item.images[0] ? item.images[0].url : 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80',
              capacity: 500,
              status: 'published',
              source: 'Ticketmaster API',
              sourceUrl: item.url,
              externalEventId,
              online: false,
              lastSyncedAt: new Date()
            };

            await Event.findOneAndUpdate(
              { source: 'Ticketmaster API', externalEventId },
              normalizedEvent,
              { upsert: true, new: true }
            );
            syncedCount++;
          }
        }
      } catch (err) {
        console.warn('[EVENT-SYNC] Ticketmaster fetch warning:', err.message);
      }
    } else {
      console.log('[EVENT-SYNC] No TICKETMASTER_API_KEY configured. Serving local NexKind NGO events & cached external events.');
    }

    console.log(`[EVENT-SYNC] Successfully processed event synchronization (${syncedCount} Ticketmaster events updated).`);
    return { success: true, syncedCount };
  } catch (error) {
    console.error('[EVENT-SYNC] Error synchronizing events:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { syncExternalEvents };
