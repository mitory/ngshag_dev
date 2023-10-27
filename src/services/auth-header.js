export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.access) {
        return {
            Authorization: 'Bearer ' + user.access,
            'ngrok-skip-browser-warning': '69420',
            "Cache-Control": "no-cache, no-store, must-revalidate"
        };
    } else {
        return {};
    }
}