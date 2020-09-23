export const $ = (selector, base = document) => base.querySelector(selector)
export const $All = (selector, base = document) => base.querySelectorAll(selector)

export const getFetch = ((url) => {
    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
})

export const postFetch = ((url, body) => {
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((res) => res.json())
})

