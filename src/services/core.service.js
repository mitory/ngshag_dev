import makeRequest from './base_request';

export const coreService = {
    getVerificeAcc, sendEducationReport, sendSourse,
    postSendEmailForChangePass,  getEducationType, 
    getUnivers, getFacults, getSpecialty, register,
    genPass
};

async function genPass() {
    return (await makeRequest('get', 'gen_pass/', null, false)).password;
}

async function getVerificeAcc(id, token) {
    return makeRequest('get', `activate/${id}/${token}/`, null, false);
}

async function sendEducationReport(source, category, token) {
    return makeRequest('post', `education_report/`, {
        source: source,
        category: category,
        recaptchaToken: token
    });
}

async function sendSourse(source) {
    return makeRequest('get', `qr/?source=${source}`, null, false);
}

async function postSendEmailForChangePass(email, token) {
    return makeRequest('post', `reset_password/`, {
        email: email,
        recaptchaToken: token
    }, false);
}

async function register(user, token) {
    await makeRequest('post', 'register/', {
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name,
        sex: user.sex,
        birth_date: '1000-01-01',
        institution: user.currentInst,
        faculty: user.currentFacult,
        specialty: user.currentSpec,
        phone_number: user.phone_number,
        year: user.year,
        recaptchaToken: token
    }, false);
    return { message: 'Регистрация прошла успешно' } 
}

async function getEducationType() {
  return makeRequest('get', 'education_type/', null, false);   
}

async function getUnivers(id) {
    return makeRequest('get', `institutions/${id}/`, null, false);
}

async function getFacults(id) {
    return makeRequest('get', `faculties/${id}/`, null, false);
}


async function getSpecialty(id_inst, id_facult) {
    return makeRequest('get', `specialty/${id_inst}/${id_facult}/`, null, false);
}