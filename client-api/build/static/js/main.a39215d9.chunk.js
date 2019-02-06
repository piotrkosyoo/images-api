(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(381);


/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(35);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./src/index.css
var src = __webpack_require__(219);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(76);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(77);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js + 1 modules
var possibleConstructorReturn = __webpack_require__(81);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(78);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(80);

// EXTERNAL MODULE: ./src/App.css
var src_App = __webpack_require__(221);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/semantic-ui-react/dist/es/modules/Progress/Progress.js
var Progress = __webpack_require__(389);

// EXTERNAL MODULE: ./node_modules/semantic-ui-react/dist/es/collections/Grid/Grid.js + 2 modules
var Grid = __webpack_require__(392);

// EXTERNAL MODULE: ./node_modules/semantic-ui-react/dist/es/elements/Label/Label.js + 2 modules
var Label = __webpack_require__(183);

// EXTERNAL MODULE: ./node_modules/semantic-ui-react/dist/es/elements/Input/Input.js
var Input = __webpack_require__(388);

// EXTERNAL MODULE: ./node_modules/semantic-ui-react/dist/es/modules/Modal/Modal.js + 10 modules
var Modal = __webpack_require__(390);

// EXTERNAL MODULE: ./node_modules/semantic-ui-react/dist/es/elements/Header/Header.js + 2 modules
var Header = __webpack_require__(393);

// EXTERNAL MODULE: ./node_modules/react-toasts/build/index.js
var build = __webpack_require__(82);

// CONCATENATED MODULE: ./src/services/imageService.js
var origin=window.location.origin;// eslint-disable-next-line no-undef
var uri="http://localhost:8081/api/mandelbrot?";function getImage(params,callback){fetch(uri+params,{method:'GET'}).then(function(response){response.text().then(function(text){callback({imageBase64:"data:image/png;base64,"+text});});}).catch(function(e){return console.log(e);});}
// CONCATENATED MODULE: ./src/components/ImageForm.jsx
var ImageForm_ImageForm=/*#__PURE__*/function(_Component){Object(inherits["a" /* default */])(ImageForm,_Component);function ImageForm(props){var _this;Object(classCallCheck["a" /* default */])(this,ImageForm);_this=Object(possibleConstructorReturn["a" /* default */])(this,Object(getPrototypeOf["a" /* default */])(ImageForm).call(this,props));_this.state={zoom:1,zoomSteep:1,shiftX:0,shiftY:0,shiftStepX:1,shiftStepY:1,imageBase64:null,isfetching:false};_this.assign=_this.assign.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));_this.sendRequestImage=_this.sendRequestImage.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));_this.updateImage=_this.updateImage.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));_this.setNewCords=_this.setNewCords.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));_this.wheel=_this.wheel.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));return _this;}Object(createClass["a" /* default */])(ImageForm,[{key:"componentDidMount",value:function componentDidMount(){this.sendRequestImage();}},{key:"wheel",value:function wheel(e,zoom){e.preventDefault();var newValue=zoom+Number(e.deltaY)/100;build["ToastStore"].info("Zoom ".concat(newValue));this.setState({zoom:newValue},this.sendRequestImage);}},{key:"sendRequestImage",value:function sendRequestImage(){var _this$state=this.state,zoom=_this$state.zoom,shiftX=_this$state.shiftX,shiftY=_this$state.shiftY,zoomSteep=_this$state.zoomSteep,shiftStepX=_this$state.shiftStepX,shiftStepY=_this$state.shiftStepY;var params="zoom=".concat(zoom*zoomSteep,"&ShiftX=").concat(shiftX*shiftStepX,"&ShiftY=").concat(shiftY*shiftStepY);this.setState({isfetching:true},getImage(params,this.updateImage));}},{key:"updateImage",value:function updateImage(image){this.setState(image);this.setState({isfetching:false});}},{key:"assign",value:function assign(property,value){var newProperty={};newProperty[property]=value;this.setState(newProperty,this.sendRequestImage);}},{key:"setNewCords",value:function setNewCords(e){var positionInfo=e.target.getBoundingClientRect();var height=positionInfo.height;var width=positionInfo.width;var xPosition=e.clientX;var yPosition=e.clientY;var offsetLeft=e.target.offsetLeft;var offsetTop=e.target.offsetTop;var cordsX=xPosition-width/2-offsetLeft;var cordsY=yPosition-height/2-offsetTop+window.pageYOffset;this.assign('shiftX',Number(cordsX+this.state.shiftX));this.assign('shiftY',Number(cordsY+this.state.shiftY));}},{key:"render",value:function render(){var _this2=this;var _this$state2=this.state,zoom=_this$state2.zoom,shiftX=_this$state2.shiftX,shiftY=_this$state2.shiftY,zoomSteep=_this$state2.zoomSteep,shiftStepX=_this$state2.shiftStepX,shiftStepY=_this$state2.shiftStepY,imageBase64=_this$state2.imageBase64;return react_default.a.createElement("div",null,react_default.a.createElement(Modal["a" /* default */],{open:this.state.isfetching,basic:true},react_default.a.createElement(Header["a" /* default */],{icon:"archive",content:"Loading"}),react_default.a.createElement(Modal["a" /* default */].Content,null,react_default.a.createElement("p",null,"Data loading"))),react_default.a.createElement(Grid["a" /* default */],null,react_default.a.createElement(Grid["a" /* default */].Row,null,react_default.a.createElement(Grid["a" /* default */].Column,{width:3},react_default.a.createElement(Input["a" /* default */],{icon:"user",iconPosition:"left",type:"number",placeholder:"Zoom step",id:"zoomSteep",defaultValue:zoomSteep,onChange:function onChange(e,data){return _this2.assign(e.target.id,Number(data.value));}}),react_default.a.createElement(Label["a" /* default */],{as:"a",color:"teal",tag:true},"Zoom step")),react_default.a.createElement(Grid["a" /* default */].Column,{width:3},react_default.a.createElement(Input["a" /* default */],{icon:"user",iconPosition:"left",type:"number",placeholder:"Zoom",id:"zoom",value:zoom,onChange:function onChange(e,data){return _this2.assign(e.target.id,Number(data.value));}}),react_default.a.createElement(Label["a" /* default */],{as:"a",color:"teal",tag:true},"Zoom ",zoom*zoomSteep)),react_default.a.createElement(Grid["a" /* default */].Column,{width:8},react_default.a.createElement(Progress["a" /* default */],{progress:"value",value:zoom*zoomSteep}))),react_default.a.createElement(Grid["a" /* default */].Row,null,react_default.a.createElement(Grid["a" /* default */].Column,{width:3},react_default.a.createElement(Input["a" /* default */],{icon:"user",iconPosition:"left",type:"number",placeholder:"Shift StepX",id:"shiftStepX",defaultValue:shiftStepX,onChange:function onChange(e,data){return _this2.assign(e.target.id,Number(data.value));}}),react_default.a.createElement(Label["a" /* default */],{as:"a",color:"teal",tag:true},"ShiftX Step")),react_default.a.createElement(Grid["a" /* default */].Column,{width:3},react_default.a.createElement(Input["a" /* default */],{icon:"user",iconPosition:"left",type:"number",placeholder:"StepX",id:"shiftX",value:shiftX,onChange:function onChange(e,data){return _this2.assign(e.target.id,Number(data.value));}}),react_default.a.createElement(Label["a" /* default */],{as:"a",color:"teal",tag:true},"ShiftX ",shiftX*shiftStepX)),react_default.a.createElement(Grid["a" /* default */].Column,{width:8},react_default.a.createElement(Progress["a" /* default */],{progress:"value",value:shiftX*shiftStepX}))),react_default.a.createElement(Grid["a" /* default */].Row,null,react_default.a.createElement(Grid["a" /* default */].Column,{width:3},react_default.a.createElement(Input["a" /* default */],{icon:"user",iconPosition:"left",type:"number",placeholder:"Shift Step Y",id:"shiftStepY",defaultValue:shiftStepY,onChange:function onChange(e,data){return _this2.assign(e.target.id,Number(data.value));}}),react_default.a.createElement(Label["a" /* default */],{as:"a",color:"teal",tag:true},"ShiftY Step")),react_default.a.createElement(Grid["a" /* default */].Column,{width:3},react_default.a.createElement(Input["a" /* default */],{icon:"user",iconPosition:"left",type:"number",placeholder:"StepY",id:"shiftY",value:shiftY,onChange:function onChange(e,data){return _this2.assign(e.target.id,Number(data.value));}}),react_default.a.createElement(Label["a" /* default */],{as:"a",color:"teal",tag:true},"ShiftX ",shiftY*shiftStepY)),react_default.a.createElement(Grid["a" /* default */].Column,{width:8},react_default.a.createElement(Progress["a" /* default */],{progress:"value",value:shiftY*shiftStepY})))),react_default.a.createElement("div",{onWheel:function onWheel(e){return _this2.wheel(e,zoom);}},react_default.a.createElement("img",{src:imageBase64,onClick:function onClick(e){return _this2.setNewCords(e);}})),react_default.a.createElement(build["ToastContainer"],{store:build["ToastStore"]}));}}]);return ImageForm;}(react["Component"]);/* harmony default export */ var components_ImageForm = (ImageForm_ImageForm);
// CONCATENATED MODULE: ./src/App.js
var App_App=/*#__PURE__*/function(_Component){Object(inherits["a" /* default */])(App,_Component);function App(props){Object(classCallCheck["a" /* default */])(this,App);return Object(possibleConstructorReturn["a" /* default */])(this,Object(getPrototypeOf["a" /* default */])(App).call(this,props));}Object(createClass["a" /* default */])(App,[{key:"render",value:function render(){return react_default.a.createElement("div",{className:"App"},react_default.a.createElement(components_ImageForm,null));}}]);return App;}(react["Component"]);/* harmony default export */ var src_App_0 = (App_App);
// CONCATENATED MODULE: ./src/serviceWorker.js
// This optional code is used to register a service worker.
// register() is not called by default.
// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.
// To learn more about the benefits of this model and instructions on how to
// opt-in, read http://bit.ly/CRA-PWA
var isLocalhost=Boolean(window.location.hostname==='localhost'||// [::1] is the IPv6 localhost address.
window.location.hostname==='[::1]'||// 127.0.0.1/8 is considered localhost for IPv4.
window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function register(config){if("production"==='production'&&'serviceWorker'in navigator){// The URL constructor is available in all browsers that support SW.
var publicUrl=new URL("",window.location.href);if(publicUrl.origin!==window.location.origin){// Our service worker won't work if PUBLIC_URL is on a different origin
// from what our page is served on. This might happen if a CDN is used to
// serve assets; see https://github.com/facebook/create-react-app/issues/2374
return;}window.addEventListener('load',function(){var swUrl="".concat("","/service-worker.js");if(isLocalhost){// This is running on localhost. Let's check if a service worker still exists or not.
checkValidServiceWorker(swUrl,config);// Add some additional logging to localhost, pointing developers to the
// service worker/PWA documentation.
navigator.serviceWorker.ready.then(function(){console.log('This web app is being served cache-first by a service '+'worker. To learn more, visit http://bit.ly/CRA-PWA');});}else{// Is not localhost. Just register service worker
registerValidSW(swUrl,config);}});}}function registerValidSW(swUrl,config){navigator.serviceWorker.register(swUrl).then(function(registration){registration.onupdatefound=function(){var installingWorker=registration.installing;if(installingWorker==null){return;}installingWorker.onstatechange=function(){if(installingWorker.state==='installed'){if(navigator.serviceWorker.controller){// At this point, the updated precached content has been fetched,
// but the previous service worker will still serve the older
// content until all client tabs are closed.
console.log('New content is available and will be used when all '+'tabs for this page are closed. See http://bit.ly/CRA-PWA.');// Execute callback
if(config&&config.onUpdate){config.onUpdate(registration);}}else{// At this point, everything has been precached.
// It's the perfect time to display a
// "Content is cached for offline use." message.
console.log('Content is cached for offline use.');// Execute callback
if(config&&config.onSuccess){config.onSuccess(registration);}}}};};}).catch(function(error){console.error('Error during service worker registration:',error);});}function checkValidServiceWorker(swUrl,config){// Check if the service worker can be found. If it can't reload the page.
fetch(swUrl).then(function(response){// Ensure service worker exists, and that we really are getting a JS file.
var contentType=response.headers.get('content-type');if(response.status===404||contentType!=null&&contentType.indexOf('javascript')===-1){// No service worker found. Probably a different app. Reload the page.
navigator.serviceWorker.ready.then(function(registration){registration.unregister().then(function(){window.location.reload();});});}else{// Service worker found. Proceed as normal.
registerValidSW(swUrl,config);}}).catch(function(){console.log('No internet connection found. App is running in offline mode.');});}function unregister(){if('serviceWorker'in navigator){navigator.serviceWorker.ready.then(function(registration){registration.unregister();});}}
// CONCATENATED MODULE: ./src/index.js
react_dom_default.a.render(react_default.a.createElement(src_App_0,null),document.getElementById('root'));// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
unregister();

/***/ })

},[[214,2,1]]]);
//# sourceMappingURL=main.a39215d9.chunk.js.map