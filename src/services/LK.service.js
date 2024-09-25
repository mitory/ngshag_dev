import makeRequest from './base_request';

export const LKService = { 
    changeUserData, getLkInfo, getSkills, postSkills,
    changePassword
}

async function changeUserData(data) {
    return makeRequest('put', 'personal_cabinet/', data);
}

async function getSkills() {
    return makeRequest('get', `skill/`, null, false);
}

async function postSkills(skills) {
    return makeRequest('post', `skill/`, { categories: skills });
}

async function getLkInfo() {
    const user = await makeRequest('get', `personal_cabinet/`);

    user.skills = [];

    for (let i = 0; i < user.categories.length; ++i) {
        for (let j = 0; j < user.categories[i].skills.length; ++j) {
            user.skills.push(user.categories[i].skills[j])
        }
    }
    localStorage.setItem('user_data', JSON.stringify(user));

    return user;
}

async function changePassword(old_pass, new_pass, token) {
    return makeRequest('put', `change_password/`, {
        current_password: old_pass,
        new_password: new_pass,
        recaptchaToken: token
    });
}