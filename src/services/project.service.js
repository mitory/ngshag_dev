import makeRequest from './base_request';


const API = 'projects/'

export const projectService = {
    getProjects, getProject, createNewProject, getStages, getCategories
};

async function getProjects() {
    return makeRequest('get', `${API}view_all/`, null, false);
}

async function getStages() {
    return makeRequest('get', `${API}project_stages/`, null, false);
}

async function getCategories() {
    return makeRequest('get', `${API}category/`, null, false);
}

async function getProject(id) {
    return makeRequest('get', `${API}detail/${id}/`, null, false);
}

async function createNewProject(data) {
    return makeRequest('get', `${API}create/`, data);
}