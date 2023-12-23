const url = `/api/v1`;

export function makeHTTPRequest(route, method){
    return new Promise( async (resolve, reject) => {
        let response = await fetch(`${url}/${route}`, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors',
            credentials: 'include',
            
        })   
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}

export function makeHTTPRequestWithJSON(route, method, body){
    console.log(body)
    return new Promise( async (resolve, reject) => {
        let response = await fetch(`${url}/${route}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include',
            body: body
        })   
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}

export function makeHTTPRequestWithForm(route, method, body){
    return new Promise( async (resolve, reject) => {
        let response = await fetch(`${url}/${route}`, {
            method: method,
            mode: 'cors',
            credentials: 'include',
            body: body
        })   
        
        const data = await response.json();
        if(data?.msg){
            reject(data.msg)
        }
        
        resolve(data);
    })
}

