import makeRequest from './base_request';

export const publicService = {
    getMainMessge, getPageContent
};

async function getPageContent(name) {
    return makeRequest('get', `page_static/${name}/`, null, false);
}

async function getMainMessge() {
    return (await makeRequest('get', `main_message/`, null, false))[0];
}
