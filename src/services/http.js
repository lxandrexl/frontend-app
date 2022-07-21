const headers = {
   'Content-Type': 'application/json',
   'Accept': 'application/json'
}

function joinURL(baseURL, url) {
    return `${baseURL}/${url}`;
}

class Service {
    
    constructor(domain) {
        this.domain = domain;
    }

    request(url, method = 'POST', data=null) {
        url = joinURL(this.domain, url);

        const options = {
            headers,
            method
        }

        if(data) {
          options.body = JSON.stringify({ ...data });   
        }

        return fetch(url, options);
    }

    post(url, data) {
        const method = 'POST';

        return this.request(url, method, data).then( res => res.json());
    }

    get(url) {
        const method = 'GET';

        return this.request(url, method).then(res => res.json());
    }

}

export default Service;