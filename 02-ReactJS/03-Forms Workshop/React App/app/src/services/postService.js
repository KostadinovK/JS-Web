const baseUrl = 'http://localhost:9999/api/';

function getAll(){
    const url = baseUrl + 'origami/';
    
    return fetch(url).then(resp => resp.json());
}

function create(description) {
    const url = baseUrl + 'origami/';
    
    return fetch(url, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({description})
    }).then(resp => resp.json());
}

export default { getAll, create };