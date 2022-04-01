const API_URL = `https://itunes.apple.com/search?term=`
const fetchSearch = async (search) => {
    const response = await fetch(API_URL + search);
    const resData = await response.json();
    return resData.results;
}

//fetchSearch function returns a promise, wrapPromis will take that promise as an argument
const wrapPromise = (promise) => {
    //assume default state of promise to be pending
    let status = 'pending';
    //result will store the data we get from the promise return
    let result = '';
    //the suspender represents the resolution of the promise, a resolution should flag the status to success and catch set it to error
    let suspender = promise.then((response) => {
        status = 'success';
        result = response;
    }, err => {
        status = 'error';
        result = err;
    })
    //return an object that emites a different response depending on the status
    return {
        read() {
            //if promise hasnt triggered run it
            if(status ==='pending') {
                throw suspender
            } 
            //otherwise send an error
            else if (status === 'error') {
                throw result
            }
            //if status is neither "pending" nor "error" send result forward
        return result
        }
    }
}

export const createResource = (search) => {
    return {
        //function takes searchTerm as an argument and returns an object with result as a property that has processed our API call
        result: wrapPromise(fetchSearch(search))
    }
}