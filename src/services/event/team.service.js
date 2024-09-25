import makeRequest from '../base_request';


export const teamService = {
    registerTeam, invitingTeam, getTeam, leaveTeam
};

async function leaveTeam(team_id) {
    return makeRequest('delete', `team_leave/${team_id}/`);
}

async function invitingTeam(code) {
    return makeRequest('post', `team_join/`, { invitation_code: code });
}

async function getTeam(id_team) {
    return makeRequest('get', `team_detail/${id_team}/`);
}

async function registerTeam(team, event_id) {
    return makeRequest('post', `team_create/`, {
        name: team.team_name,
        team_password: team.team_password,
        event_id: event_id
    });
}