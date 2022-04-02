const API_URL = 'https://itunes.apple.com/search?term='

const fetchSearch = async (search) => {
    const response = await fetch(API_URL + search)
    const resData = await response.json()
    return resData.results
}

//wrapPromise takes the promise from fetchSearch as an argument
const wrapPromise = (promise) => {
    // assumed default state of promise is pendingg
    let status = 'pending'
    // result stores data from promise
    let result = ''
    // resolved promise should flag status to success catch to error
    let suspender = promise.then(response => {
        status = 'success'
        result = response
    }, err => {
        status = 'error'
        result = err
    })

    // returned object depending on status
    return {
        read() {
            // if the promise hasn't triggered
            if(status === 'pending') {
                throw suspender
            }
            else if (status === 'error') {
                throw result
            }
            // if status is neither pending nor error send result forward
            return result
        }
    }
}

//exported function that takes the search as an argument and returns an object with a result property
export const createResource = (search) => {
    return {
        result: wrapPromise(fetchSearch(search))
    }
}