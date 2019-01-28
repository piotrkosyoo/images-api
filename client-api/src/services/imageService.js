const origin = window.location.origin;
const api = '/api/mandelbrot?';
const uri = 'http://localhost:8081' + api;
export default function getImage(params, callback) {
    fetch(uri + params, {
        method: 'GET'
    }).then(function(response){
        response.text().then(function(text) {
            callback({imageBase64: "data:image/png;base64," + text});
        });

    }).catch((e) => console.log(e));
}