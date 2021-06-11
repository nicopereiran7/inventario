const BASE_PATH = "http://localhost:3001/api";

export function signUpApi(data) {
    const url = `${BASE_PATH}/user/sign-up`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json();
        }).then(result => {
            if(result.user) {
                return {
                    ok: true,
                    message: "Usuario Creado Correctamente"
                }
            }
            return {
                ok: false,
                message: result.message
            };
        }).catch((error) => {
            return {
                ok: false,
                message: error.message
            }
        })
    
}

export function signInApi(data) {
    const url = `${BASE_PATH}/user/sign-in`;
    
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json();
        }).then(result => {
            return result;
        }).catch((error) => {
            return error.message;
        })
}

export function getUsersApi(token) {
    const url = "http://localhost:3001/api/user/get-users";

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

export function createProductApi(token, data) {
    const url = "http://localhost:3001/api/user/create-product";

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

export function createCategoryApi(token, data) {
    const url = "http://localhost:3001/api/category/create-category";

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


