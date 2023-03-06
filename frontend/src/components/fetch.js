const { REACT_APP_API } = process.env;

/*
    Méthodes de fetch
*/

export const fetchJson = async(url) => {
    let responseJson;

    await fetch(url, { credentials: "include" , mode: "cors" })
        .then(response => response.json())
        .then(htmlResponse => responseJson = htmlResponse)

    return responseJson;
}

export const fetchPost = async(url, body) => {
    const postRequest = {
        method: 'POST',
        credentials: "include",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Allow-Control-Allow-Origin': REACT_APP_API
        },
        body: JSON.stringify(body)
    }

    try{
        const fetchResponse = await fetch(url, postRequest);
        const data = await fetchResponse.json();
        return data;
    }
    catch(error){
        console.error("Une erreur est survenue : %s", error);
    }
}

export const fetchDelete = async(url, id) => {
    const deleteRequest = {
        method: 'DELETE',
        credentials: "include",
        mode: "cors",
        headers: {
            'Content-Type': 'text/plain',
            'Allow-Control-Allow-Origin': REACT_APP_API
        }
    }
    try{
        await fetch(`${url}/${id}`, deleteRequest)
        .then((response) => {
            console.log("user deleted successfully")
            return response.json();
        })
    }
    catch(error){
        console.error("Une erreur est survenue : %s", error);
    }
}

export const fetchPatch = async(url, id, body) => {
    const patchRequest = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Allow-Control-Allow-Origin': REACT_APP_API
        },
        body: JSON.stringify(body)
    }

    try{
        const fetchResponse = await fetch(`${url}/${id}`, patchRequest);
        const data = await fetchResponse.json();
        return data;
    }
    catch(error){
        console.error("Une erreur est survenue : %s", error);
    }
}