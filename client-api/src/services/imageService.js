const origin = window.location.origin;

// eslint-disable-next-line no-undef
const uri = API_IMAGES;

export default function getImage(params, callback) {
    fetch(uri + params, {
        method: 'GET'
    }).then(function(response){
        response.text().then(function(text) {
            callback({imageBase64: "data:image/png;base64," + text});
        });

    }).catch((e) => console.log(e));
}