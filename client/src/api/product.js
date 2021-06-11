export function getProductsApi(token) {
    const url = "http://localhost:3001/api/product/get-products";

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

export function updateProductApi(token, product, productId) {
    const url = `http://localhost:3001/api/product/update-product/${productId}`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(product)
    }

    return fetch(url, params)
        .then(response => response.json())
        .then(result => result)
        .catch(err => err.message);
}

export function deleteProductApi(token, productId) {
    const url = `http://localhost:3001/api/product/delete-product/${productId}`

    const params = {
        method: "DELETE",
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