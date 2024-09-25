import makeRequest from './base_request';

export const generalService = {
    getNews
};

async function getNews(page_size = 1, page = 1) {
    return makeRequest('get', `news/?page=${page}&page_size=${page_size}`, null, false);
}