export function getCategoryApi(token) {
    const url = "http://localhost:3001/api/category/get-categories";

    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => result)
        .catch(err => err.message);
}