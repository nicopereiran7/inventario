export function createRegisterApi(token, data) {
    const url = "http://localhost:3001/api/register/create-register";

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params)
        .then(response => response.json())
        .then(result => result)
        .catch(err => err.message);
}

export const getRegistersApi = (token) => {
    const url = "http://localhost:3001/api/register/get-registers";

    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }

    return fetch(url, params)
        .then(response => response.json())
        .then(result => result)
        .catch(err => err.message);
} 