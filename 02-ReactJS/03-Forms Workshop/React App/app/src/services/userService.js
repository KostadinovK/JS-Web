const baseUrl = 'http://localhost:9999/api/user';

function register(username, password){
    const url = baseUrl + '/register';

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({username, password})
    }).then(resp => resp.json());
}

function login(username, password){
    const url = baseUrl + '/login';

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({username, password})
    }).then(resp => resp.json());
}

export default { register, login };