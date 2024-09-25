import makeRequest from '../base_request';

export const eventUserService = {
    getTeams, getTasks, getTask,
    postTaskFile, getTaskStatus, putTaskFile, getFile, postUserNomination,
    deleteUserNomination, getUserNomination, getUserEventStageList, getTasksFromNomination,
    getUserNominations, getTaskStatusAll
};

async function getUserNomination(id_nom) {
    const param = id_nom ? `?nomination_id=${id_nom}`: '';
    return makeRequest('get', `event_user/${param}`);
}

async function getUserNominations(event_id) {
    const param = event_id ? `?event=${event_id}`: '';
    return makeRequest('get', `event_all/${param}`);
}

async function getTeams() {
    return makeRequest('get', `view_teams`);
}

async function getTasks() {
    return makeRequest('get', `task`);
}

async function getTask(id_task) {
    return makeRequest('get', `task/${id_task}/`);
}

async function getFile(id_task) {
    return makeRequest('get', `download-file/${id_task}/`);
}

async function getTaskStatusAll() {
    return makeRequest('get', `task_status_all/`);
}

async function getTaskStatus(id_task) {
    return makeRequest('get', `task_status/${id_task}/`);
}

async function postTaskFile(formData) {
    return makeRequest('post', `task/`, formData);
}


async function postUserNomination(id_nom) {
    return makeRequest('post', `event_user/`, { nomination: id_nom });
}

async function getUserEventStageList() {
    return makeRequest('get', `event_stage/`);
}

async function deleteUserNomination(id_nom) {
    return makeRequest('delete', `event_user/`, { nomination: id_nom });
}


async function putTaskFile(formData) {
    return makeRequest('put', `task/`, formData);
}


async function getTasksFromNomination(id, stage) {
    return makeRequest('get', `nomination_programs/${id}/${stage}/`, null, false);
}
