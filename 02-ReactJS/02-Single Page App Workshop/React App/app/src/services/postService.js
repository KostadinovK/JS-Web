const baseUrl = 'http://localhost:9999/api/';

function getAll(){
    const url = baseUrl + 'origami/';
    
    return fetch(url).then(resp => resp.json());
}

export default { getAll };