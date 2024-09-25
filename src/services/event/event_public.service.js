import makeRequest from '../base_request';

export const eventService = {
  getSchedule, getActualEventsList, getNominations, getNominationsFromEvent,
  getEvent
};

async function getSchedule() {
  return makeRequest('get', 'schedule/', null, false);
}

async function getActualEventsList() {
  return makeRequest('get', `event_actual/`, null, false);
}

async function getNominations() {
  return makeRequest('get', `nomination/`, null, false);
}

async function getNominationsFromEvent(id_event) {
  return makeRequest('get', `nomination/${id_event}/`, null, false);
}

async function getEvent(id_event) {
  return makeRequest('get', `event/${id_event}/`, null, false);
}