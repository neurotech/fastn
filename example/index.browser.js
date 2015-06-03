(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function fuseBinding(){function e(){n||o(a.apply(null,r.map(function(e){return e()})))}var t,n,i=Array.prototype.slice.call(arguments),r=i.slice(),a=r.pop(),o=createBinding("result");o._arguments=i,"function"!=typeof r[r.length-1]||is.binding(r[r.length-1])||(t=a,a=r.pop()),o._model._events={},o._set=function(e){if(t){n=!0;var i=t(e);same(i,r[0]())||(r[0](i),o._change(i)),n=!1}else o._change(e)},r.forEach(function(t,n){"string"==typeof t&&(t=createBinding(t),r.splice(n,1,t)),t.on("change",e),o.on("detach",t.detach)});var c;return o.on("attach",function(t){n=!0,r.forEach(function(e){e.attach(t,1)}),n=!1,c!==t&&e(),c=t}),o}function createBinding(e){if(arguments.length>1)return fuseBinding.apply(null,arguments);if(null==e)throw"bindings must be created with a key (and or filter)";var t,n=function i(n){return arguments.length?void("."!==e&&i._set(n)):t};return makeFunctionEmitter(n),n.setMaxListeners(1e4),n._arguments=Array.prototype.slice.call(arguments),n._model=new Enti(!1),n._fastn_binding=e,n._firm=1,n._model._events={},n.attach=function(t,i){return firmer(n,i)?n:(n._firm=i,t instanceof Enti&&(t=t._model),t instanceof Object||(t={}),n._model.get(".")===t?n:(n._model.attach(t),n._change(n._model.get(e)),n.emit("attach",t,1),n))},n.detach=function(e){return firmer(n,e)?n:(t=void 0,n._model.isAttached()&&n._model.detach(),"detach"in n._events&&n.emit("detach",1),n)},n._set=function(t){same(n._model.get(e),t)||(n._model.isAttached()||n._model.attach(n._model.get(".")),n._model.set(e,t))},n._change=function(e){t=e,n.emit("change",n())},n.clone=function(e){var t=createBinding.apply(null,n._arguments);return e&&t.attach(n._model,n._firm),t},n.destroy=function(e){n._destroyed||(!e||n._events&&!n._events.change)&&(n._destroyed=!0,n.emit("destroy"),n.detach(),n._model.destroy())},"."!==e&&(n._model._events[e]=function(){n._change(n._model.get(e))}),n}var Enti=require("enti"),is=require("./is"),firmer=require("./firmer"),makeFunctionEmitter=require("./makeFunctionEmitter"),same=require("same-value");module.exports=createBinding;


},{"./firmer":16,"./is":19,"./makeFunctionEmitter":21,"enti":26,"same-value":179}],2:[function(require,module,exports){
function dereferenceSettings(e){for(var n={},t=Object.keys(e),r=0;r<t.length;r++){var i=t[r];n[i]=e[i],is.bindingObject(n[i])&&(n[i]=fastn.binding(n[i]._fastn_binding,n[i]._defaultValue,n[i].transform))}return n}function flatten(e){return Array.isArray(e)?e.reduce(function(e,n){return null==n?e:e.concat(flatten(n))},[]):e}function forEachProperty(e,n,t){for(var r=Object.keys(e),i=0;i<r.length;i++){var o=e[r[i]];is.property(o)&&o[n].apply(null,t)}}function inflateProperties(e,n){for(var t in n)is.property(n[t])?e[t]=n[t]:is.property(e[t])&&(is.binding(n[t])?e[t].binding(n[t]):e[t](n[t]),e[t].addTo(e,t))}var createBinding=require("./binding"),is=require("./is");module.exports=function e(n,t,r,i,o){function c(){var e=u();e!==f&&(f=e,d.attach(f),a.emit("attach",f,1))}var a,u,d=new t.Model(!1);if(r=dereferenceSettings(r||{}),i=flatten(i),n in o)a=o[n](n,t,r,i);else{if(!("_generic"in o))throw'No component of type "'+n+'" is loaded';a=o._generic(n,t,r,i)}if(is.component(a))return a;a._type=n,a._settings=r,a._fastn_component=!0,a._children=i,a.attach=function(e,n){return u.attach(e,n),a},a.detach=function(e){return u.detach(e),a.emit("detach",1),a},a.scope=function(){return d},a.destroy=function(){return a._destroyed?void 0:(a._destroyed=!0,a.emit("destroy"),a.element=null,d.destroy(),u.destroy(),a)};var f;a.binding=function(e){return arguments.length?(is.binding(e)||(e=createBinding(e)),u&&(e.attach(u._model,u._firm),u.removeListener("change",c)),u=e,u.on("change",c),c(u()),a):u},a.clone=function(){return e(a._type,t,a._settings,a._children.filter(function(e){return!e._templated}).map(function(e){return e.clone()}),o)},a.children=function(){return a._children.slice()},inflateProperties(a,r),a.on("attach",function(){forEachProperty(a,"attach",arguments)}),a.on("render",function(){forEachProperty(a,"update",arguments)}),a.on("detach",function(){forEachProperty(a,"detach",arguments)}),a.once("destroy",function(){forEachProperty(a,"destroy",arguments)});var s=createBinding(".");return s._default_binding=!0,a.binding(s),t.debug&&a.on("render",function(){a.element&&"object"==typeof a.element&&(a.element._component=a)}),a};


},{"./binding":1,"./is":19}],3:[function(require,module,exports){
var crel=require("crel"),EventEmitter=require("events").EventEmitter,is=require("./is");module.exports=function(e,n){var r=new EventEmitter;r.insert=function(e,t){if(t&&"object"==typeof t&&(e=Array.prototype.slice.call(arguments)),Array.isArray(e))return e.forEach(r.insert),r;var i=r._children.indexOf(e),o=n.toComponent(e);return is.component(e)||~i&&r._children.splice(i,1,o),isNaN(t)&&(t=r._children.length),i!==t&&(~i&&r._children.splice(i,1),r._children.splice(t,0,o)),r.getContainerElement()&&!o.element&&o.render(),o.attach(r.scope(),1),r._insert(o.element,t),r};return r._insert=function(e,n){var t=r.getContainerElement();t&&t.childNodes[n]!==e&&t.insertBefore(e,t.childNodes[n])},r.remove=function(e){var n=r._children.indexOf(e);~n&&r._children.splice(n,1),e.detach(1),e.element&&r._remove(e.element)},r._remove=function(e){var n=r.getContainerElement();e&&n&&e.parentNode===n&&n.removeChild(e)},r.empty=function(){for(;r._children.length;)r._remove(r._children.pop().detach(1).element)},r.getContainerElement=function(){return r.containerElement||r.element},r.on("render",function(){r.insert(r._children)}),r.on("attach",function(e,t){for(var i=0;i<r._children.length;i++)n.isComponent(r._children[i])&&r._children[i].attach(e,t)}),r.on("destroy",function(e,t){for(var i=0;i<r._children.length;i++)n.isComponent(r._children[i])&&r._children[i].destroy(t)}),r};


},{"./is":19,"crel":25,"events":188}],4:[function(require,module,exports){
module.exports=require("../")({list:require("../listComponent"),text:require("../textComponent"),_generic:require("../genericComponent")},!0);


},{"../":18,"../genericComponent":17,"../listComponent":20,"../textComponent":187}],5:[function(require,module,exports){
var fastn=require("./fastn");module.exports=function(){return fastn("div",{"class":"github-fork-ribbon-wrapper right"},fastn("div",{"class":"github-fork-ribbon"},fastn("a",{href:"https://github.com/korynunn/fastn"},"Fork me")))};


},{"./fastn":4}],6:[function(require,module,exports){
var fastn=require("./fastn");module.exports=function(e){return fastn("header",{"class":"mainHeader"},fastn("img",{src:"./fastn-sml.png"}),fastn("h1","fastn",fastn("span",{"class":"faint"},".js")),fastn("span","User list example. ",fastn.binding("users|*.deleted",require("./search").result,function(e,n){e||(e=[]);var s=e.filter(function(e){return!e.deleted}).length,r="";return n&&(r+="Showing "+n.length+" of "),r+=s})," users"),require("./searchBar")())};


},{"./fastn":4,"./search":9,"./searchBar":10}],7:[function(require,module,exports){
var fastn=require("./fastn"),crel=require("crel"),app=fastn("div",require("./header")(),require("./userList")(),require("./stats")(),require("./forkBanner")());window.onload=function(){app.render(),document.body.appendChild(app.element)};
},{"./fastn":4,"./forkBanner":5,"./header":6,"./stats":11,"./userList":13,"crel":25}],8:[function(require,module,exports){
var fastn=require("./fastn"),usersModel=require("./users");module.exports=function(e){function n(){a.element.classList.add("closed"),setTimeout(function(){document.body.removeChild(a.element),a.destroy()},300)}var a=fastn("div",{"class":"newUser dialog"},fastn("form",{"class":"modal"},fastn("field",fastn("label","First Name"),fastn("input",{value:fastn.binding("name.first"),onchange:"value:value"})),fastn("field",fastn("label","Surname"),fastn("input",{value:fastn.binding("name.last"),onchange:"value:value"})),fastn("field",fastn("label","Email"),fastn("input",{value:fastn.binding("email"),onchange:"value:value"})),fastn("field",fastn("label","Mobile"),fastn("input",{value:fastn.binding("cell"),onchange:"value:value"})),fastn("button","Add")).on("submit",function(e,a){e.preventDefault(),usersModel.insert("users",a.get("."),0),n()})).on("click",function(e){e.target===this.element&&n()}),t=Math.floor(100*Math.random());a.attach({gender:null,name:{title:null,first:null,last:null},email:null,dob:null,cell:null,picture:{large:"http://api.randomuser.me/portraits/women/"+t+".jpg",medium:"http://api.randomuser.me/portraits/med/women/"+t+".jpg",thumbnail:"http://api.randomuser.me/portraits/thumb/women/"+t+".jpg"}}),a.render(),document.body.appendChild(a.element)};


},{"./fastn":4,"./users":14}],9:[function(require,module,exports){
var fastn=require("./fastn"),usersModel=require("./users");searchModel={userSearch:"",result:null},userSearch=fastn.binding("userSearch").attach(searchModel).on("change",function(e){var r=usersModel.get("users");return e?void fastn.Model.set(searchModel,"result",r.filter(function(r){return r&&r.name&&r.name.first&&r.name.last?~r.name.first.toLowerCase().indexOf(e.toLowerCase())||~r.name.last.toLowerCase().indexOf(e.toLowerCase()):void 0})):void fastn.Model.set(searchModel,"result",null)}),module.exports={searchModel:searchModel,userSearch:userSearch,result:fastn.binding("result").attach(searchModel)};


},{"./fastn":4,"./users":14}],10:[function(require,module,exports){
var fastn=require("./fastn"),search=require("./search");module.exports=function(){return fastn("nav",{"class":"search"},fastn("label","Search"),fastn("input",{value:search.userSearch,onkeyup:"value:value"}))};


},{"./fastn":4,"./search":9}],11:[function(require,module,exports){
var fastn=require("./fastn");module.exports=function(){return fastn("div",{"class":"stats"},"This example has ",fastn.binding("attachedEntis")," attached model instances").on("attach",function(t){setInterval(function(){fastn.Model.set(t,"attachedEntis",fastn.Model.prototype.attachedCount())},100)})};


},{"./fastn":4}],12:[function(require,module,exports){
var fastn=require("./fastn");module.exports=function(n,e){var t=require("./search").result;return fastn("div",{"class":fastn.binding(".","name",t,n,"deleted",function(n,e,t,s,a){var i=["user"];return t&&!~t.indexOf(n)&&i.push("hidden"),n===s&&i.push("selected"),a&&i.push("deleted"),i})},fastn("img",{src:fastn.binding("picture.medium")}),fastn("div",{"class":"details"},fastn("label",{"class":"name"},fastn.binding("name.first")," ",fastn.binding("name.last")),fastn("div",{"class":"info"},fastn("p",{"class":"extra"},fastn("a",{href:fastn.binding("email",function(n){return"mailto:"+n})},fastn.binding("email")),fastn("p",fastn.binding("cell",function(n){return"Mobile: "+n})))),fastn("button",{"class":"remove"},"X").on("click",function(n,t){t.set("deleted",!0),e()}))).on("click",function(e,t){n(t.get("."))})};


},{"./fastn":4,"./search":9}],13:[function(require,module,exports){
var fastn=require("./fastn"),usersModel=require("./users");module.exports=function(){var e=fastn.binding("selectedUser").attach({});return fastn("list",{"class":"users",items:fastn.binding("users|*"),template:function(s,t){function r(){var e=t.get("deletedUsers")||[];e.push(s.get("item")),t.set("deletedUsers",e)}return require("./user.js")(e,r).binding("item")}},fastn("button",{"class":"add"},"+").on("click",function(e,s){require("./newUser")(s)})).attach(usersModel)};


},{"./fastn":4,"./newUser":8,"./user.js":12,"./users":14}],14:[function(require,module,exports){
function getUsers(e){cpjax({url:"./users.json",dataType:"json"},function(s,r){e(s,r.map(function(e){return e.user}))})}var cpjax=require("cpjax"),fastn=require("./fastn"),usersModel=new fastn.Model({users:[]});getUsers(function(e,s){e||usersModel.set("users",s)}),module.exports=usersModel;


},{"./fastn":4,"cpjax":22}],15:[function(require,module,exports){
var setify=require("setify");module.exports={"class":function(e,t,n){return 2===arguments.length?t.className.slice(e._initialClasses.length):(Array.isArray(n)&&(n=n.join(" ")),void(t.className=e._initialClasses+" "+n))},disabled:function(e,t,n){return 2===arguments.length?t.hasAttribute("disabled"):void(n?t.setAttribute("disabled","disabled"):t.removeAttribute("disabled"))},textContent:function(e,t,n){return 2===arguments.length?t.textContent:void(t.textContent=null==n?"":n)},value:function(e,t,n){var l=t.type;return"INPUT"===t.nodeName&&"date"==l?2===arguments.length?t.value?new Date(t.value.replace(/-/g,"/").replace("T"," ")):null:(n=null!=n?new Date(n):null,void(!n||isNaN(n)?t.value=null:t.value=[n.getFullYear(),("0"+(n.getMonth()+1)).slice(-2),("0"+n.getDate()).slice(-2)].join("-"))):2===arguments.length?t.value:(void 0===n&&(n=null),void setify(t,n))},style:function(e,t,n){if(2===arguments.length)return t.style;for(var l in n)t.style[l]=n[l]}};


},{"setify":180}],16:[function(require,module,exports){
module.exports=function(i,o){return null!=o&&(void 0===i._firm||o<i._firm)?!0:void 0};


},{}],17:[function(require,module,exports){
function createProperty(e,n,r,t){var o=t[r],i=e.isBinding(o)&&o,a=e.isProperty(o)&&o,c=!i&&!a&&r in t?o:void 0;"function"!=typeof c&&(a||(a=e.property(),a(c),a.on("update",function(e){var t=n.getContainerElement();if(t){var o=r in t,i=fancyProps[r],a=i?i(n,t):o?t[r]:t.getAttribute(r);if(i||o||null!=e||(e=""),e!==a){if(i)return void i(n,t,e);if(o)return void(t[r]=e);"function"!=typeof e&&"object"!=typeof e&&t.setAttribute(r,e)}}})),i&&a.binding(i),a.addTo(n,r))}function createProperties(e,n,r){for(var t in r)createProperty(e,n,t,r)}function addUpdateHandler(e,n,r){var t=e.getContainerElement(),o=function(r){e.emit(n,r,e.scope())};t.addEventListener(n,o),e.on("destroy",function(){t.removeEventListener(n,o)})}function addAutoHandler(e,n,r){if(r[n]){var t=e.getContainerElement(),o=r[n].split(":"),i=n.slice(2);delete r[n];var a=function(n){var r=fancyProps[o[1]],i=r?r(e,t):t[o[1]];e[o[0]](i)};t.addEventListener(i,a),e.on("destroy",function(){t.removeEventListener(i,a)})}}var crel=require("crel"),containerComponent=require("./containerComponent"),fancyProps=require("./fancyProps");module.exports=function(e,n,r,t){var o=containerComponent(e,n);return createProperties(n,o,r),o.render=function(){return o.element=crel(e),o.emit("render"),o},o.on("render",function(){var e=o.getContainerElement();o._initialClasses=e.className;for(var n in r)"on"===n.slice(0,2)&&n in e&&addAutoHandler(o,n,r);for(var t in o._events)"on"+t.toLowerCase()in e&&addUpdateHandler(o,t)}),o};


},{"./containerComponent":3,"./fancyProps":15,"crel":25}],18:[function(require,module,exports){
var merge=require("flat-merge"),createComponent=require("./component"),createProperty=require("./property"),createBinding=require("./binding"),crel=require("crel"),Enti=require("enti"),is=require("./is");module.exports=function(e,n){function t(n){for(var r=[],i=0;i<arguments.length;i++)r[i]=arguments[i];var o=r[1],c=2;return(is.component(r[1])||Array.isArray(r[1])||"object"!=typeof r[1]||!r[1])&&(c--,o=null),createComponent(n,t,o,r.slice(c),e)}return t.debug=n,t.property=createProperty,t.binding=createBinding,t.toComponent=function(e){return null!=e?is.component(e)?e:"object"!=typeof e?t("text",{text:e}):crel.isElement(e)?t(e):crel.isNode(e)?t("text",{text:e.textContent}):void 0:void 0},t.isComponent=is.component,t.isBinding=is.binding,t.isDefaultBinding=is.defaultBinding,t.isBindingObject=is.bindingObject,t.isProperty=is.property,t.Model=Enti,t};


},{"./binding":1,"./component":2,"./is":19,"./property":186,"crel":25,"enti":26,"flat-merge":178}],19:[function(require,module,exports){
function isComponent(n){return n&&"object"==typeof n&&"_fastn_component"in n}function isBindingObject(n){return n&&"object"==typeof n&&"_fastn_binding"in n}function isBinding(n){return n&&"function"==typeof n&&"_fastn_binding"in n}function isProperty(n){return n&&"function"==typeof n&&"_fastn_property"in n}function isDefaultBinding(n){return n&&"function"==typeof n&&"_fastn_binding"in n&&"_default_binding"in n}module.exports={component:isComponent,bindingObject:isBindingObject,binding:isBinding,defaultBinding:isDefaultBinding,property:isProperty};


},{}],20:[function(require,module,exports){
function each(e,t){if(e&&"object"==typeof e)if(Array.isArray(e))e.forEach(t);else for(var r in e)t(e[r],r)}function keyFor(e,t){if(!e||"object"!=typeof e)return!1;for(var r in e)if(e[r]===t)return r;return!1}function values(e){if(Array.isArray(e))return e.slice();var t=[];for(var r in e)t.push(e[r]);return t}var crel=require("crel"),Map=require("es6-map"),genericComponent=require("./genericComponent");module.exports=function(e,t,r,n){function i(e){var r=o._settings.template,n=o._settings.emptyTemplate;if(r){var i=values(e);currentItems=i.slice(),a.forEach(function(e,t){var r=currentItems.indexOf(t);~r?currentItems.splice(r,1):o.removeItem(t,a)});var s=0;if(each(e,function(e,n){for(;s<o._children.length&&o._children[s]._templated&&!~i.indexOf(o._children[s]._listItem);)s++;var c,m=new t.Model({item:e,key:n});a.has(e)?c=a.get(e):(c=t.toComponent(r(m,o.scope())),c||(c=t("template")),c._listItem=e,c._templated=!0,a.set(e,c)),t.isComponent(c)&&o._settings.attachTemplates!==!1&&c.attach(m,2),o.insert(c,s),s++}),0===s&&n){var c=t.toComponent(n(o.scope()));c||(c=t("template")),c._templated=!0,a.set({},c),o.insert(c)}}}var o=genericComponent(e,t,r,n),a=new Map;return o.removeItem=function(e,t){var r=t.get(e);o.remove(r),r.destroy(),t["delete"](e)},o.render=function(){this.element=crel(r.tagName||"div"),this.emit("render")},t.property([],r.itemChanges||"type structure").addTo(o,"items").on("update",i),o};


},{"./genericComponent":17,"crel":25,"es6-map":80}],21:[function(require,module,exports){
var EventEmitter=require("events").EventEmitter,functionEmitterPrototype=function(){};for(var key in EventEmitter.prototype)functionEmitterPrototype[key]=EventEmitter.prototype[key];module.exports=function(t){if(Object.setPrototypeOf)Object.setPrototypeOf(t,functionEmitterPrototype);else if(__proto__ in t)t.__proto__=functionEmitterPrototype;else for(var e in functionEmitterPrototype)t[e]=functionEmitterPrototype[e]};


},{"events":188}],22:[function(require,module,exports){
var Ajax=require("simple-ajax");module.exports=function(e,t){if("string"==typeof e&&(e={url:e}),"object"!=typeof e)throw"settings must be a string or object";if("function"!=typeof t)throw"cpjax must be passed a callback as the second parameter";var n=new Ajax(e);return n.on("success",function(e,n){t(null,n,e)}),n.on("error",function(e){t(e.target.responseText,null,e)}),n.send(),n};


},{"simple-ajax":23}],23:[function(require,module,exports){
function tryParseJson(t){try{return JSON.parse(t)}catch(e){return e}}function timeout(){this.request.abort(),this.emit("timeout")}function Ajax(t){var e,s=this;if("string"==typeof t&&(t={url:t}),"object"!=typeof t&&(t={}),s.settings=t,s.request=new window.XMLHttpRequest,s.settings.method=s.settings.method||"get",s.settings.cors&&("withCredentials"in s.request?s.request.withCredentials=!0:"undefined"!=typeof XDomainRequest?s.request=new window.XDomainRequest:s.emit("error",new Error("Cors is not supported by this browser"))),s.settings.cache===!1&&(s.settings.data=s.settings.data||{},s.settings.data._=(new Date).getTime()),"get"===s.settings.method.toLowerCase()&&"object"==typeof s.settings.data){var r=s.settings.url.split("?");e=queryString.parse(r[1]);for(var i in s.settings.data)e[i]=s.settings.data[i];s.settings.url=r[0]+"?"+queryString.stringify(e),s.settings.data=null}s.request.addEventListener("progress",function(t){s.emit("progress",t)},!1),s.request.addEventListener("load",function(t){var e=t.target.responseText;if(s.settings.dataType&&"json"===s.settings.dataType.toLowerCase())if(""===e)e=void 0;else if(e=tryParseJson(e),e instanceof Error)return void s.emit("error",t,e);t.target.status>=400?s.emit("error",t,e):s.emit("success",t,e)},!1),s.request.addEventListener("error",function(t){s.emit("error",t)},!1),s.request.addEventListener("abort",function(t){s.emit("abort",t)},!1),s.request.addEventListener("loadend",function(t){clearTimeout(this._requestTimeout),s.emit("complete",t)},!1),s.request.open(s.settings.method||"get",s.settings.url,!0),s.settings.contentType!==!1&&s.request.setRequestHeader("Content-Type",s.settings.contentType||"application/json; charset=utf-8"),s.request.setRequestHeader("X-Requested-With",s.settings.requestedWith||"XMLHttpRequest"),s.settings.auth&&s.request.setRequestHeader("Authorization",s.settings.auth);for(var n in s.settings.headers)s.request.setRequestHeader(n,s.settings.headers[n]);s.settings.processData!==!1&&"json"===s.settings.dataType&&(s.settings.data=JSON.stringify(s.settings.data))}var EventEmitter=require("events").EventEmitter,queryString=require("query-string");Ajax.prototype=Object.create(EventEmitter.prototype),Ajax.prototype.send=function(){this._requestTimeout=setTimeout(timeout.bind(this),this.settings.timeout||12e4),this.request.send(this.settings.data&&this.settings.data)},module.exports=Ajax;


},{"events":188,"query-string":24}],24:[function(require,module,exports){
!function(){"use strict";var e={};e.parse=function(e){return"string"!=typeof e?{}:(e=e.trim().replace(/^(\?|#)/,""),e?e.trim().split("&").reduce(function(e,n){var o=n.replace(/\+/g," ").split("="),r=o[0],t=o[1];return r=decodeURIComponent(r),t=void 0===t?null:decodeURIComponent(t),e.hasOwnProperty(r)?Array.isArray(e[r])?e[r].push(t):e[r]=[e[r],t]:e[r]=t,e},{}):{})},e.stringify=function(e){return e?Object.keys(e).map(function(n){var o=e[n];return Array.isArray(o)?o.map(function(e){return encodeURIComponent(n)+"="+encodeURIComponent(e)}).join("&"):encodeURIComponent(n)+"="+encodeURIComponent(o)}).join("&"):""},"function"==typeof define&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?module.exports=e:self.queryString=e}();


},{}],25:[function(require,module,exports){
!function(e,n){"object"==typeof exports?module.exports=n():"function"==typeof define&&define.amd?define(n):e.crel=n()}(this,function(){function e(){var o,l=arguments,s=l[0],y=l[1],v=2,g=l.length,h=e[i];if(s=e[c](s)?s:a.createElement(s),1===g)return s;if((!d(y,t)||e[u](y)||p(y))&&(--v,y=null),g-v===1&&d(l[v],"string")&&void 0!==s[r])s[r]=l[v];else for(;g>v;++v)if(o=l[v],null!=o)if(p(o))for(var x=0;x<o.length;++x)m(s,o[x]);else m(s,o);for(var N in y)if(h[N]){var b=h[N];typeof b===n?b(s,y[N]):s[f](b,y[N])}else s[f](N,y[N]);return s}var n="function",t="object",o="nodeType",r="textContent",f="setAttribute",i="attrMap",u="isNode",c="isElement",a=typeof document===t?document:{},d=function(e,n){return typeof e===n},l=typeof Node===n?function(e){return e instanceof Node}:function(e){return e&&d(e,t)&&o in e&&d(e.ownerDocument,t)},s=function(n){return e[u](n)&&1===n[o]},p=function(e){return e instanceof Array},m=function(n,t){e[u](t)||(t=a.createTextNode(t)),n.appendChild(t)};return e[i]={},e[c]=s,e[u]=l,e});


},{}],26:[function(require,module,exports){
function toArray(t){return Array.prototype.slice.call(t)}function matchDeep(t){return(t+"").match(deepRegex)}function isDeep(t){var e=t+"";return~e.indexOf(".")||~e.indexOf("**")||~e.indexOf("|")}function isFilterPath(t){var e=t+"";return~e.indexOf("|")}function getTargetKey(t){var e=t+"";return e.split("|").shift()}function leftAndRest(t){var e=t+"";if(".|"===e.slice(0,2))return[".",e.slice(2)];var r=matchDeep(e);return r?[e.slice(0,r.index),e.slice(r.index+1)]:e}function isWildcardKey(t){return"*"===t.charAt(0)}function isFeralcardKey(t){return"**"===t}function addHandler(t,e,r){var n=trackedObjects.get(t);null==n&&(n={},trackedObjects.set(t,n));var i=n[e];i||(i=new Set,n[e]=i),i.add(r)}function removeHandler(t,e,r){var n=trackedObjects.get(t);if(null!=n){var i=n[e];i&&i["delete"](r)}}function trackObjects(t,e,r,n,i,a){function o(n,i,a){for(var o=Object.keys(n),s=0;s<o.length;s++)isFeralcardKey(i)?trackObjects(t,e,r,n,o[s],"**"+(a?".":"")+(a||"")):trackObjects(t,e,r,n,o[s],a)}if(n&&"object"==typeof n){var s="**"===i?"*":i,c=n[i],f=c&&"object"==typeof c;if(!f||!e.has(c)){var u=function(l,d,h){return"*"!==s&&"object"==typeof n[s]&&n[s]!==c?(f&&e["delete"](c),removeHandler(n,s,u),void trackObjects(t,e,r,n,i,a)):("*"===s&&o(n,i,a),void(e.has(n)&&("**"===i&&a||r(l,d,h))))};if(addHandler(n,s,u),f&&(e.set(c,null),a)){var l,d,h=leftAndRest(a);Array.isArray(h)?(l=h[0],d=h[1],"."===l&&(l="*")):l=h,f&&isWildcardKey(l)&&o(c,l,d),trackObjects(t,e,r,c,l,d)}}}}function trackPath(t,e){var r=t._model,n=trackedEvents.get(r);n||(n={},trackedEvents.set(r,n));var i=n[e];if(i||(i={entis:new Set,trackedObjects:new WeakMap},n[e]=i),!i.entis.has(t)){i.entis.add(t);var a=function(t,a,o){i.entis.forEach(function(s){if(s._model!==r)return i.entis["delete"](s),void(0===i.entis.size&&(delete n[e],Object.keys(n).length||trackedEvents["delete"](r)));if(s._emittedEvents[e]!==o)return s._emittedEvents[e]=o,isFilterPath(e)?void s.emit(e,s.get(getTargetKey(e)),a):void s.emit(e,t,a)})};trackObjects(e,i.trackedObjects,a,{model:r},"model",e)}}function trackPaths(t,e){if(t._events)for(var r,n=Object.keys(t._events),i=0;r=n[i],i<n.length;i++)(t._model===e||isDeep(r))&&trackPath(t,r)}function emitEvent(t,e,r,n){attachedEnties.forEach(function(e){trackPaths(e,t)});var i=trackedObjects.get(t);if(i){var a={value:r,key:e,object:t};i[e]&&i[e].forEach(function(t){i[e].has(t)&&t(r,a,n)}),i["*"]&&i["*"].forEach(function(t){i["*"].has(t)&&t(r,a,n)})}}function emit(t){var e={};t.forEach(function(t){emitEvent(t[0],t[1],t[2],e)})}function Enti(t){var e=t===!1;(!t||"object"!=typeof t&&"function"!=typeof t)&&(t={}),this._emittedEvents={},e?this._model={}:this.attach(t)}var EventEmitter=require("events").EventEmitter,Set=require("es6-set"),WeakMap=require("es6-weak-map"),deepRegex=/[|.]/i,attachedEnties=new Set,trackedObjects=new WeakMap,trackedEvents=new WeakMap;Enti.get=function(t,e){if(t&&"object"==typeof t){if(e=getTargetKey(e),"."===e)return t;var r=leftAndRest(e);return Array.isArray(r)?Enti.get(t[r[0]],r[1]):t[e]}},Enti.set=function(t,e,r){if(t&&"object"==typeof t){e=getTargetKey(e);var n=leftAndRest(e);if(Array.isArray(n))return Enti.set(t[n[0]],n[1],r);var i=t[e];if("object"==typeof r||r!==i){var a=!(e in t);t[e]=r;var o=[[t,e,r]];a&&Array.isArray(t)&&o.push([t,"length",t.length]),emit(o)}}},Enti.push=function(t,e,r){if(t&&"object"==typeof t){var n;if(arguments.length<3)r=e,e=".",n=t;else{var i=leftAndRest(e);if(Array.isArray(i))return Enti.push(t[i[0]],i[1],r);n=t[e]}if(!Array.isArray(n))throw"The target is not an array.";n.push(r);var a=[[n,n.length-1,r],[n,"length",n.length]];emit(a)}},Enti.insert=function(t,e,r,n){if(t&&"object"==typeof t){var i;if(arguments.length<4)n=r,r=e,e=".",i=t;else{var a=leftAndRest(e);if(Array.isArray(a))return Enti.insert(t[a[0]],a[1],r,n);i=t[e]}if(!Array.isArray(i))throw"The target is not an array.";i.splice(n,0,r);var o=[[i,n,r],[i,"length",i.length]];emit(o)}},Enti.remove=function(t,e,r){if(t&&"object"==typeof t){var n=leftAndRest(e);if(Array.isArray(n))return Enti.remove(t[n[0]],n[1],r);if(null!=r)return void Enti.remove(t[e],r);if("."===e)throw". (self) is not a valid key to remove";var i=[];Array.isArray(t)?(t.splice(e,1),i.push([t,"length",t.length])):(delete t[e],i.push([t,e])),emit(i)}},Enti.move=function(t,e,r){if(t&&"object"==typeof t){var n=leftAndRest(e);if(Array.isArray(n))return Enti.move(t[n[0]],n[1],r);var t=t;if(e!==r){if(!Array.isArray(t))throw"The model is not an array.";var i=t[e];t.splice(e,1),t.splice(r-(r>e?0:1),0,i),emit([t,r,i])}}},Enti.update=function(t,e,r){function n(t,e){for(var r in e)t[r]&&"object"==typeof t[r]?n(t[r],e[r]):(t[r]=e[r],s.push([t,r,e[r]]));Array.isArray(t)&&s.push([t,"length",t.length])}if(t&&"object"==typeof t){var i,a=Array.isArray(r);if(arguments.length<3)r=e,e=".",i=t;else{var o=leftAndRest(e);if(Array.isArray(o))return Enti.update(t[o[0]],o[1],r);i=t[e],null==i&&(t[e]=a?[]:{})}if("object"!=typeof r)throw"The value is not an object.";if("object"!=typeof i)throw"The target is not an object.";var s=[];n(i,r),emit(s)}},Enti.prototype=Object.create(EventEmitter.prototype),Enti.prototype.constructor=Enti,Enti.prototype.attach=function(t){this._model!==t&&this.detach(),attachedEnties.has(this)||attachedEnties.add(this),this._attached=!0,this._model=t},Enti.prototype.detach=function(){attachedEnties.has(this)&&attachedEnties["delete"](this),this._emittedEvents={},this._model={},this._attached=!1},Enti.prototype.destroy=function(){this.detach(),this._events=null},Enti.prototype.get=function(t){return Enti.get(this._model,t)},Enti.prototype.set=function(t,e){return Enti.set(this._model,t,e)},Enti.prototype.push=function(t,e){return Enti.push.apply(null,[this._model].concat(toArray(arguments)))},Enti.prototype.insert=function(t,e,r){return Enti.insert.apply(null,[this._model].concat(toArray(arguments)))},Enti.prototype.remove=function(t,e){return Enti.remove.apply(null,[this._model].concat(toArray(arguments)))},Enti.prototype.move=function(t,e){return Enti.move.apply(null,[this._model].concat(toArray(arguments)))},Enti.prototype.update=function(t,e){return Enti.update.apply(null,[this._model].concat(toArray(arguments)))},Enti.prototype.isAttached=function(){return this._attached},Enti.prototype.attachedCount=function(){return attachedEnties.size},module.exports=Enti;


},{"es6-set":27,"es6-weak-map":135,"events":188}],27:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?Set:require("./polyfill");


},{"./is-implemented":28,"./polyfill":79}],28:[function(require,module,exports){
"use strict";module.exports=function(){var e,t,n;return"function"!=typeof Set?!1:(e=new Set(["raz","dwa","trzy"]),3!==e.size?!1:"function"!=typeof e.add?!1:"function"!=typeof e.clear?!1:"function"!=typeof e["delete"]?!1:"function"!=typeof e.entries?!1:"function"!=typeof e.forEach?!1:"function"!=typeof e.has?!1:"function"!=typeof e.keys?!1:"function"!=typeof e.values?!1:(t=e.values(),n=t.next(),n.done!==!1?!1:"raz"!==n.value?!1:!0))};


},{}],29:[function(require,module,exports){
"use strict";module.exports=function(){return"undefined"==typeof Set?!1:"[object Set]"===Object.prototype.toString.call(Set.prototype)}();


},{}],30:[function(require,module,exports){
"use strict";var setPrototypeOf=require("es5-ext/object/set-prototype-of"),contains=require("es5-ext/string/#/contains"),d=require("d"),Iterator=require("es6-iterator"),toStringTagSymbol=require("es6-symbol").toStringTag,defineProperty=Object.defineProperty,SetIterator;SetIterator=module.exports=function(t,e){return this instanceof SetIterator?(Iterator.call(this,t.__setData__,t),e=e&&contains.call(e,"key+value")?"key+value":"value",void defineProperty(this,"__kind__",d("",e))):new SetIterator(t,e)},setPrototypeOf&&setPrototypeOf(SetIterator,Iterator),SetIterator.prototype=Object.create(Iterator.prototype,{constructor:d(SetIterator),_resolve:d(function(t){return"value"===this.__kind__?this.__list__[t]:[this.__list__[t],this.__list__[t]]}),toString:d(function(){return"[object Set Iterator]"})}),defineProperty(SetIterator.prototype,toStringTagSymbol,d("c","Set Iterator"));


},{"d":32,"es5-ext/object/set-prototype-of":54,"es5-ext/string/#/contains":59,"es6-iterator":66,"es6-symbol":75}],31:[function(require,module,exports){
"use strict";var copy=require("es5-ext/object/copy"),map=require("es5-ext/object/map"),callable=require("es5-ext/object/valid-callable"),validValue=require("es5-ext/object/valid-value"),bind=Function.prototype.bind,defineProperty=Object.defineProperty,hasOwnProperty=Object.prototype.hasOwnProperty,define;define=function(e,t,r){var a,i=validValue(t)&&callable(t.value);return a=copy(t),delete a.writable,delete a.value,a.get=function(){return hasOwnProperty.call(this,e)?i:(t.value=bind.call(i,null==r?this:this[r]),defineProperty(this,e,t),this[e])},a},module.exports=function(e){var t=arguments[1];return map(e,function(e,r){return define(r,e,t)})};


},{"es5-ext/object/copy":44,"es5-ext/object/map":52,"es5-ext/object/valid-callable":57,"es5-ext/object/valid-value":58}],32:[function(require,module,exports){
"use strict";var assign=require("es5-ext/object/assign"),normalizeOpts=require("es5-ext/object/normalize-options"),isCallable=require("es5-ext/object/is-callable"),contains=require("es5-ext/string/#/contains"),d;d=module.exports=function(e,l){var n,a,s,i,t;return arguments.length<2||"string"!=typeof e?(i=l,l=e,e=null):i=arguments[2],null==e?(n=s=!0,a=!1):(n=contains.call(e,"c"),a=contains.call(e,"e"),s=contains.call(e,"w")),t={value:l,configurable:n,enumerable:a,writable:s},i?assign(normalizeOpts(i),t):t},d.gs=function(e,l,n){var a,s,i,t;return"string"!=typeof e?(i=n,n=l,l=e,e=null):i=arguments[3],null==l?l=void 0:isCallable(l)?null==n?n=void 0:isCallable(n)||(i=n,n=void 0):(i=l,l=n=void 0),null==e?(a=!0,s=!1):(a=contains.call(e,"c"),s=contains.call(e,"e")),t={get:l,set:n,configurable:a,enumerable:s},i?assign(normalizeOpts(i),t):t};


},{"es5-ext/object/assign":41,"es5-ext/object/is-callable":47,"es5-ext/object/normalize-options":53,"es5-ext/string/#/contains":59}],33:[function(require,module,exports){
"use strict";var value=require("../../object/valid-value");module.exports=function(){return value(this).length=0,this};


},{"../../object/valid-value":58}],34:[function(require,module,exports){
"use strict";var toPosInt=require("../../number/to-pos-integer"),value=require("../../object/valid-value"),indexOf=Array.prototype.indexOf,hasOwnProperty=Object.prototype.hasOwnProperty,abs=Math.abs,floor=Math.floor;module.exports=function(t){var r,e,o,s;if(t===t)return indexOf.apply(this,arguments);for(e=toPosInt(value(this).length),o=arguments[1],o=isNaN(o)?0:o>=0?floor(o):toPosInt(this.length)-floor(abs(o)),r=o;e>r;++r)if(hasOwnProperty.call(this,r)&&(s=this[r],s!==s))return r;return-1};


},{"../../number/to-pos-integer":39,"../../object/valid-value":58}],35:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?Math.sign:require("./shim");


},{"./is-implemented":36,"./shim":37}],36:[function(require,module,exports){
"use strict";module.exports=function(){var t=Math.sign;return"function"!=typeof t?!1:1===t(10)&&-1===t(-20)};


},{}],37:[function(require,module,exports){
"use strict";module.exports=function(e){return e=Number(e),isNaN(e)||0===e?e:e>0?1:-1};


},{}],38:[function(require,module,exports){
"use strict";var sign=require("../math/sign"),abs=Math.abs,floor=Math.floor;module.exports=function(r){return isNaN(r)?0:(r=Number(r),0!==r&&isFinite(r)?sign(r)*floor(abs(r)):r)};


},{"../math/sign":35}],39:[function(require,module,exports){
"use strict";var toInteger=require("./to-integer"),max=Math.max;module.exports=function(e){return max(0,toInteger(e))};


},{"./to-integer":38}],40:[function(require,module,exports){
"use strict";var isCallable=require("./is-callable"),callable=require("./valid-callable"),value=require("./valid-value"),call=Function.prototype.call,keys=Object.keys,propertyIsEnumerable=Object.prototype.propertyIsEnumerable;module.exports=function(e,l){return function(r,a){var t,u=arguments[2],c=arguments[3];return r=Object(value(r)),callable(a),t=keys(r),c&&t.sort(isCallable(c)?c.bind(r):void 0),t[e](function(e,t){return propertyIsEnumerable.call(r,e)?call.call(a,u,r[e],e,r,t):l})}};


},{"./is-callable":47,"./valid-callable":57,"./valid-value":58}],41:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?Object.assign:require("./shim");


},{"./is-implemented":42,"./shim":43}],42:[function(require,module,exports){
"use strict";module.exports=function(){var r,t=Object.assign;return"function"!=typeof t?!1:(r={foo:"raz"},t(r,{bar:"dwa"},{trzy:"trzy"}),r.foo+r.bar+r.trzy==="razdwatrzy")};


},{}],43:[function(require,module,exports){
"use strict";var keys=require("../keys"),value=require("../valid-value"),max=Math.max;module.exports=function(e,r){var a,t,u,i=max(arguments.length,2);for(e=Object(value(e)),u=function(t){try{e[t]=r[t]}catch(u){a||(a=u)}},t=1;i>t;++t)r=arguments[t],keys(r).forEach(u);if(void 0!==a)throw a;return e};


},{"../keys":49,"../valid-value":58}],44:[function(require,module,exports){
"use strict";var assign=require("./assign"),value=require("./valid-value");module.exports=function(e){var r=Object(value(e));return r!==e?r:assign({},e)};


},{"./assign":41,"./valid-value":58}],45:[function(require,module,exports){
"use strict";var create=Object.create,shim;require("./set-prototype-of/is-implemented")()||(shim=require("./set-prototype-of/shim")),module.exports=function(){var e,r,t;return shim?1!==shim.level?create:(e={},r={},t={configurable:!1,enumerable:!1,writable:!0,value:void 0},Object.getOwnPropertyNames(Object.prototype).forEach(function(e){return"__proto__"===e?void(r[e]={configurable:!0,enumerable:!1,writable:!0,value:void 0}):void(r[e]=t)}),Object.defineProperties(e,r),Object.defineProperty(shim,"nullPolyfill",{configurable:!1,enumerable:!1,writable:!1,value:e}),function(r,t){return create(null===r?e:r,t)}):create}();


},{"./set-prototype-of/is-implemented":55,"./set-prototype-of/shim":56}],46:[function(require,module,exports){
"use strict";module.exports=require("./_iterate")("forEach");


},{"./_iterate":40}],47:[function(require,module,exports){
"use strict";module.exports=function(t){return"function"==typeof t};


},{}],48:[function(require,module,exports){
"use strict";var map={"function":!0,object:!0};module.exports=function(t){return null!=t&&map[typeof t]||!1};


},{}],49:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?Object.keys:require("./shim");


},{"./is-implemented":50,"./shim":51}],50:[function(require,module,exports){
"use strict";module.exports=function(){try{return Object.keys("primitive"),!0}catch(t){return!1}};


},{}],51:[function(require,module,exports){
"use strict";var keys=Object.keys;module.exports=function(e){return keys(null==e?e:Object(e))};


},{}],52:[function(require,module,exports){
"use strict";var callable=require("./valid-callable"),forEach=require("./for-each"),call=Function.prototype.call;module.exports=function(l,a){var r={},c=arguments[2];return callable(a),forEach(l,function(l,e,o,t){r[e]=call.call(a,c,l,e,o,t)}),r};


},{"./for-each":46,"./valid-callable":57}],53:[function(require,module,exports){
"use strict";var forEach=Array.prototype.forEach,create=Object.create,process=function(r,e){var c;for(c in r)e[c]=r[c]};module.exports=function(r){var e=create(null);return forEach.call(arguments,function(r){null!=r&&process(Object(r),e)}),e};


},{}],54:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?Object.setPrototypeOf:require("./shim");


},{"./is-implemented":55,"./shim":56}],55:[function(require,module,exports){
"use strict";var create=Object.create,getPrototypeOf=Object.getPrototypeOf,x={};module.exports=function(){var t=Object.setPrototypeOf,e=arguments[0]||create;return"function"!=typeof t?!1:getPrototypeOf(t(e(null),x))===x};


},{}],56:[function(require,module,exports){
"use strict";var isObject=require("../is-object"),value=require("../valid-value"),isPrototypeOf=Object.prototype.isPrototypeOf,defineProperty=Object.defineProperty,nullDesc={configurable:!0,enumerable:!1,writable:!0,value:void 0},validate;validate=function(e,t){if(value(e),null===t||isObject(t))return e;throw new TypeError("Prototype must be null or an object")},module.exports=function(e){var t,l;return e?(2===e.level?e.set?(l=e.set,t=function(e,t){return l.call(validate(e,t),t),e}):t=function(e,t){return validate(e,t).__proto__=t,e}:t=function r(e,t){var l;return validate(e,t),l=isPrototypeOf.call(r.nullPolyfill,e),l&&delete r.nullPolyfill.__proto__,null===t&&(t=r.nullPolyfill),e.__proto__=t,l&&defineProperty(r.nullPolyfill,"__proto__",nullDesc),e},Object.defineProperty(t,"level",{configurable:!1,enumerable:!1,writable:!1,value:e.level})):null}(function(){var e,t=Object.create(null),l={},r=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__");if(r){try{e=r.set,e.call(t,l)}catch(o){}if(Object.getPrototypeOf(t)===l)return{set:e,level:2}}return t.__proto__=l,Object.getPrototypeOf(t)===l?{level:2}:(t={},t.__proto__=l,Object.getPrototypeOf(t)===l?{level:1}:!1)}()),require("../create");


},{"../create":45,"../is-object":48,"../valid-value":58}],57:[function(require,module,exports){
"use strict";module.exports=function(t){if("function"!=typeof t)throw new TypeError(t+" is not a function");return t};


},{}],58:[function(require,module,exports){
"use strict";module.exports=function(n){if(null==n)throw new TypeError("Cannot use null or undefined");return n};


},{}],59:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?String.prototype.contains:require("./shim");


},{"./is-implemented":60,"./shim":61}],60:[function(require,module,exports){
"use strict";var str="razdwatrzy";module.exports=function(){return"function"!=typeof str.contains?!1:str.contains("dwa")===!0&&str.contains("foo")===!1};


},{}],61:[function(require,module,exports){
"use strict";var indexOf=String.prototype.indexOf;module.exports=function(t){return indexOf.call(this,t,arguments[1])>-1};


},{}],62:[function(require,module,exports){
"use strict";var toString=Object.prototype.toString,id=toString.call("");module.exports=function(t){return"string"==typeof t||t&&"object"==typeof t&&(t instanceof String||toString.call(t)===id)||!1};


},{}],63:[function(require,module,exports){
"use strict";var setPrototypeOf=require("es5-ext/object/set-prototype-of"),contains=require("es5-ext/string/#/contains"),d=require("d"),Iterator=require("./"),defineProperty=Object.defineProperty,ArrayIterator;ArrayIterator=module.exports=function(t,r){return this instanceof ArrayIterator?(Iterator.call(this,t),r=r?contains.call(r,"key+value")?"key+value":contains.call(r,"key")?"key":"value":"value",void defineProperty(this,"__kind__",d("",r))):new ArrayIterator(t,r)},setPrototypeOf&&setPrototypeOf(ArrayIterator,Iterator),ArrayIterator.prototype=Object.create(Iterator.prototype,{constructor:d(ArrayIterator),_resolve:d(function(t){return"value"===this.__kind__?this.__list__[t]:"key+value"===this.__kind__?[t,this.__list__[t]]:t}),toString:d(function(){return"[object Array Iterator]"})});


},{"./":66,"d":32,"es5-ext/object/set-prototype-of":54,"es5-ext/string/#/contains":59}],64:[function(require,module,exports){
"use strict";var callable=require("es5-ext/object/valid-callable"),isString=require("es5-ext/string/is-string"),get=require("./get"),isArray=Array.isArray,call=Function.prototype.call;module.exports=function(r,e){var l,t,a,i,n,c,s,o,u=arguments[2];if(isArray(r)?l="array":isString(r)?l="string":r=get(r),callable(e),a=function(){i=!0},"array"===l)return void r.some(function(r){return call.call(e,u,r,a),i?!0:void 0});if("string"!==l)for(t=r.next();!t.done;){if(call.call(e,u,t.value,a),i)return;t=r.next()}else for(c=r.length,n=0;c>n&&(s=r[n],c>n+1&&(o=s.charCodeAt(0),o>=55296&&56319>=o&&(s+=r[++n])),call.call(e,u,s,a),!i);++n);};


},{"./get":65,"es5-ext/object/valid-callable":57,"es5-ext/string/is-string":62}],65:[function(require,module,exports){
"use strict";var isString=require("es5-ext/string/is-string"),ArrayIterator=require("./array"),StringIterator=require("./string"),iterable=require("./valid-iterable"),iteratorSymbol=require("es6-symbol").iterator;module.exports=function(r){return"function"==typeof iterable(r)[iteratorSymbol]?r[iteratorSymbol]():isString(r)?new StringIterator(r):new ArrayIterator(r)};


},{"./array":63,"./string":73,"./valid-iterable":74,"es5-ext/string/is-string":62,"es6-symbol":68}],66:[function(require,module,exports){
"use strict";var clear=require("es5-ext/array/#/clear"),assign=require("es5-ext/object/assign"),callable=require("es5-ext/object/valid-callable"),value=require("es5-ext/object/valid-value"),d=require("d"),autoBind=require("d/auto-bind"),Symbol=require("es6-symbol"),defineProperty=Object.defineProperty,defineProperties=Object.defineProperties,Iterator;module.exports=Iterator=function(e,t){return this instanceof Iterator?(defineProperties(this,{__list__:d("w",value(e)),__context__:d("w",t),__nextIndex__:d("w",0)}),void(t&&(callable(t.on),t.on("_add",this._onAdd),t.on("_delete",this._onDelete),t.on("_clear",this._onClear)))):new Iterator(e,t)},defineProperties(Iterator.prototype,assign({constructor:d(Iterator),_next:d(function(){var e;if(this.__list__)return this.__redo__&&(e=this.__redo__.shift(),void 0!==e)?e:this.__nextIndex__<this.__list__.length?this.__nextIndex__++:void this._unBind()}),next:d(function(){return this._createResult(this._next())}),_createResult:d(function(e){return void 0===e?{done:!0,value:void 0}:{done:!1,value:this._resolve(e)}}),_resolve:d(function(e){return this.__list__[e]}),_unBind:d(function(){this.__list__=null,delete this.__redo__,this.__context__&&(this.__context__.off("_add",this._onAdd),this.__context__.off("_delete",this._onDelete),this.__context__.off("_clear",this._onClear),this.__context__=null)}),toString:d(function(){return"[object Iterator]"})},autoBind({_onAdd:d(function(e){if(!(e>=this.__nextIndex__)){if(++this.__nextIndex__,!this.__redo__)return void defineProperty(this,"__redo__",d("c",[e]));this.__redo__.forEach(function(t,_){t>=e&&(this.__redo__[_]=++t)},this),this.__redo__.push(e)}}),_onDelete:d(function(e){var t;e>=this.__nextIndex__||(--this.__nextIndex__,this.__redo__&&(t=this.__redo__.indexOf(e),-1!==t&&this.__redo__.splice(t,1),this.__redo__.forEach(function(t,_){t>e&&(this.__redo__[_]=--t)},this)))}),_onClear:d(function(){this.__redo__&&clear.call(this.__redo__),this.__nextIndex__=0})}))),defineProperty(Iterator.prototype,Symbol.iterator,d(function(){return this})),defineProperty(Iterator.prototype,Symbol.toStringTag,d("","Iterator"));


},{"d":32,"d/auto-bind":31,"es5-ext/array/#/clear":33,"es5-ext/object/assign":41,"es5-ext/object/valid-callable":57,"es5-ext/object/valid-value":58,"es6-symbol":68}],67:[function(require,module,exports){
"use strict";var isString=require("es5-ext/string/is-string"),iteratorSymbol=require("es6-symbol").iterator,isArray=Array.isArray;module.exports=function(r){return null==r?!1:isArray(r)?!0:isString(r)?!0:"function"==typeof r[iteratorSymbol]};


},{"es5-ext/string/is-string":62,"es6-symbol":68}],68:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?Symbol:require("./polyfill");


},{"./is-implemented":69,"./polyfill":71}],69:[function(require,module,exports){
"use strict";module.exports=function(){var t;if("function"!=typeof Symbol)return!1;t=Symbol("test symbol");try{String(t)}catch(o){return!1}return"symbol"==typeof Symbol.iterator?!0:"object"!=typeof Symbol.isConcatSpreadable?!1:"object"!=typeof Symbol.iterator?!1:"object"!=typeof Symbol.toPrimitive?!1:"object"!=typeof Symbol.toStringTag?!1:"object"!=typeof Symbol.unscopables?!1:!0};


},{}],70:[function(require,module,exports){
"use strict";module.exports=function(t){return t&&("symbol"==typeof t||"Symbol"===t["@@toStringTag"])||!1};


},{}],71:[function(require,module,exports){
"use strict";var d=require("d"),validateSymbol=require("./validate-symbol"),create=Object.create,defineProperties=Object.defineProperties,defineProperty=Object.defineProperty,objPrototype=Object.prototype,Symbol,HiddenSymbol,globalSymbols=create(null),generateName=function(){var e=create(null);return function(o){for(var t,r=0;e[o+(r||"")];)++r;return o+=r||"",e[o]=!0,t="@@"+o,defineProperty(objPrototype,t,d.gs(null,function(e){defineProperty(this,t,d(e))})),t}}();HiddenSymbol=function e(o){if(this instanceof HiddenSymbol)throw new TypeError("TypeError: Symbol is not a constructor");return e(o)},module.exports=Symbol=function o(e){var t;if(this instanceof o)throw new TypeError("TypeError: Symbol is not a constructor");return t=create(HiddenSymbol.prototype),e=void 0===e?"":String(e),defineProperties(t,{__description__:d("",e),__name__:d("",generateName(e))})},defineProperties(Symbol,{"for":d(function(e){return globalSymbols[e]?globalSymbols[e]:globalSymbols[e]=Symbol(String(e))}),keyFor:d(function(e){var o;validateSymbol(e);for(o in globalSymbols)if(globalSymbols[o]===e)return o}),hasInstance:d("",Symbol("hasInstance")),isConcatSpreadable:d("",Symbol("isConcatSpreadable")),iterator:d("",Symbol("iterator")),match:d("",Symbol("match")),replace:d("",Symbol("replace")),search:d("",Symbol("search")),species:d("",Symbol("species")),split:d("",Symbol("split")),toPrimitive:d("",Symbol("toPrimitive")),toStringTag:d("",Symbol("toStringTag")),unscopables:d("",Symbol("unscopables"))}),defineProperties(HiddenSymbol.prototype,{constructor:d(Symbol),toString:d("",function(){return this.__name__})}),defineProperties(Symbol.prototype,{toString:d(function(){return"Symbol ("+validateSymbol(this).__description__+")"}),valueOf:d(function(){return validateSymbol(this)})}),defineProperty(Symbol.prototype,Symbol.toPrimitive,d("",function(){return validateSymbol(this)})),defineProperty(Symbol.prototype,Symbol.toStringTag,d("c","Symbol")),defineProperty(HiddenSymbol.prototype,Symbol.toPrimitive,d("c",Symbol.prototype[Symbol.toPrimitive])),defineProperty(HiddenSymbol.prototype,Symbol.toStringTag,d("c",Symbol.prototype[Symbol.toStringTag]));


},{"./validate-symbol":72,"d":32}],72:[function(require,module,exports){
"use strict";var isSymbol=require("./is-symbol");module.exports=function(r){if(!isSymbol(r))throw new TypeError(r+" is not a symbol");return r};


},{"./is-symbol":70}],73:[function(require,module,exports){
"use strict";var setPrototypeOf=require("es5-ext/object/set-prototype-of"),d=require("d"),Iterator=require("./"),defineProperty=Object.defineProperty,StringIterator;StringIterator=module.exports=function(t){return this instanceof StringIterator?(t=String(t),Iterator.call(this,t),void defineProperty(this,"__length__",d("",t.length))):new StringIterator(t)},setPrototypeOf&&setPrototypeOf(StringIterator,Iterator),StringIterator.prototype=Object.create(Iterator.prototype,{constructor:d(StringIterator),_next:d(function(){return this.__list__?this.__nextIndex__<this.__length__?this.__nextIndex__++:void this._unBind():void 0}),_resolve:d(function(t){var e,r=this.__list__[t];return this.__nextIndex__===this.__length__?r:(e=r.charCodeAt(0),e>=55296&&56319>=e?r+this.__list__[this.__nextIndex__++]:r)}),toString:d(function(){return"[object String Iterator]"})});


},{"./":66,"d":32,"es5-ext/object/set-prototype-of":54}],74:[function(require,module,exports){
"use strict";var isIterable=require("./is-iterable");module.exports=function(e){if(!isIterable(e))throw new TypeError(e+" is not iterable");return e};


},{"./is-iterable":67}],75:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?Symbol:require("./polyfill");


},{"./is-implemented":76,"./polyfill":77}],76:[function(require,module,exports){
"use strict";module.exports=function(){var t;if("function"!=typeof Symbol)return!1;t=Symbol("test symbol");try{String(t)}catch(o){return!1}return"symbol"==typeof Symbol.iterator?!0:"object"!=typeof Symbol.isConcatSpreadable?!1:"object"!=typeof Symbol.isRegExp?!1:"object"!=typeof Symbol.iterator?!1:"object"!=typeof Symbol.toPrimitive?!1:"object"!=typeof Symbol.toStringTag?!1:"object"!=typeof Symbol.unscopables?!1:!0};


},{}],77:[function(require,module,exports){
"use strict";var d=require("d"),create=Object.create,defineProperties=Object.defineProperties,generateName,Symbol;generateName=function(){var e=create(null);return function(t){for(var o=0;e[t+(o||"")];)++o;return t+=o||"",e[t]=!0,"@@"+t}}(),module.exports=Symbol=function(e){var t;if(this instanceof Symbol)throw new TypeError("TypeError: Symbol is not a constructor");return t=create(Symbol.prototype),e=void 0===e?"":String(e),defineProperties(t,{__description__:d("",e),__name__:d("",generateName(e))})},Object.defineProperties(Symbol,{create:d("",Symbol("create")),hasInstance:d("",Symbol("hasInstance")),isConcatSpreadable:d("",Symbol("isConcatSpreadable")),isRegExp:d("",Symbol("isRegExp")),iterator:d("",Symbol("iterator")),toPrimitive:d("",Symbol("toPrimitive")),toStringTag:d("",Symbol("toStringTag")),unscopables:d("",Symbol("unscopables"))}),defineProperties(Symbol.prototype,{properToString:d(function(){return"Symbol ("+this.__description__+")"}),toString:d("",function(){return this.__name__})}),Object.defineProperty(Symbol.prototype,Symbol.toPrimitive,d("",function(e){throw new TypeError("Conversion of symbol objects is not allowed")})),Object.defineProperty(Symbol.prototype,Symbol.toStringTag,d("c","Symbol"));


},{"d":32}],78:[function(require,module,exports){
"use strict";var d=require("d"),callable=require("es5-ext/object/valid-callable"),apply=Function.prototype.apply,call=Function.prototype.call,create=Object.create,defineProperty=Object.defineProperty,defineProperties=Object.defineProperties,hasOwnProperty=Object.prototype.hasOwnProperty,descriptor={configurable:!0,enumerable:!1,writable:!0},on,once,off,emit,methods,descriptors,base;on=function(e,t){var r;return callable(t),hasOwnProperty.call(this,"__ee__")?r=this.__ee__:(r=descriptor.value=create(null),defineProperty(this,"__ee__",descriptor),descriptor.value=null),r[e]?"object"==typeof r[e]?r[e].push(t):r[e]=[r[e],t]:r[e]=t,this},once=function(e,t){var r,l;return callable(t),l=this,on.call(this,e,r=function(){off.call(l,e,r),apply.call(t,this,arguments)}),r.__eeOnceListener__=t,this},off=function(e,t){var r,l,s,o;if(callable(t),!hasOwnProperty.call(this,"__ee__"))return this;if(r=this.__ee__,!r[e])return this;if(l=r[e],"object"==typeof l)for(o=0;s=l[o];++o)(s===t||s.__eeOnceListener__===t)&&(2===l.length?r[e]=l[o?0:1]:l.splice(o,1));else(l===t||l.__eeOnceListener__===t)&&delete r[e];return this},emit=function(e){var t,r,l,s,o;if(hasOwnProperty.call(this,"__ee__")&&(s=this.__ee__[e]))if("object"==typeof s){for(r=arguments.length,o=new Array(r-1),t=1;r>t;++t)o[t-1]=arguments[t];for(s=s.slice(),t=0;l=s[t];++t)apply.call(l,this,o)}else switch(arguments.length){case 1:call.call(s,this);break;case 2:call.call(s,this,arguments[1]);break;case 3:call.call(s,this,arguments[1],arguments[2]);break;default:for(r=arguments.length,o=new Array(r-1),t=1;r>t;++t)o[t-1]=arguments[t];apply.call(s,this,o)}},methods={on:on,once:once,off:off,emit:emit},descriptors={on:d(on),once:d(once),off:d(off),emit:d(emit)},base=defineProperties({},descriptors),module.exports=exports=function(e){return null==e?create(base):defineProperties(Object(e),descriptors)},exports.methods=methods;


},{"d":32,"es5-ext/object/valid-callable":57}],79:[function(require,module,exports){
"use strict";var clear=require("es5-ext/array/#/clear"),eIndexOf=require("es5-ext/array/#/e-index-of"),setPrototypeOf=require("es5-ext/object/set-prototype-of"),callable=require("es5-ext/object/valid-callable"),d=require("d"),ee=require("event-emitter"),Symbol=require("es6-symbol"),iterator=require("es6-iterator/valid-iterable"),forOf=require("es6-iterator/for-of"),Iterator=require("./lib/iterator"),isNative=require("./is-native-implemented"),call=Function.prototype.call,defineProperty=Object.defineProperty,SetPoly,getValues;module.exports=SetPoly=function(){var e=arguments[0];if(!(this instanceof SetPoly))return new SetPoly(e);if(void 0!==this.__setData__)throw new TypeError(this+" cannot be reinitialized");null!=e&&iterator(e),defineProperty(this,"__setData__",d("c",[])),e&&forOf(e,function(e){-1===eIndexOf.call(this,e)&&this.push(e)},this.__setData__)},isNative&&(setPrototypeOf&&setPrototypeOf(SetPoly,Set),SetPoly.prototype=Object.create(Set.prototype,{constructor:d(SetPoly)})),ee(Object.defineProperties(SetPoly.prototype,{add:d(function(e){return this.has(e)?this:(this.emit("_add",this.__setData__.push(e)-1,e),this)}),clear:d(function(){this.__setData__.length&&(clear.call(this.__setData__),this.emit("_clear"))}),"delete":d(function(e){var t=eIndexOf.call(this.__setData__,e);return-1===t?!1:(this.__setData__.splice(t,1),this.emit("_delete",t,e),!0)}),entries:d(function(){return new Iterator(this,"key+value")}),forEach:d(function(e){var t,r,i,o=arguments[1];for(callable(e),t=this.values(),r=t._next();void 0!==r;)i=t._resolve(r),call.call(e,o,i,i,this),r=t._next()}),has:d(function(e){return-1!==eIndexOf.call(this.__setData__,e)}),keys:d(getValues=function(){return this.values()}),size:d.gs(function(){return this.__setData__.length}),values:d(function(){return new Iterator(this)}),toString:d(function(){return"[object Set]"})})),defineProperty(SetPoly.prototype,Symbol.iterator,d(getValues)),defineProperty(SetPoly.prototype,Symbol.toStringTag,d("c","Set"));


},{"./is-native-implemented":29,"./lib/iterator":30,"d":32,"es5-ext/array/#/clear":33,"es5-ext/array/#/e-index-of":34,"es5-ext/object/set-prototype-of":54,"es5-ext/object/valid-callable":57,"es6-iterator/for-of":64,"es6-iterator/valid-iterable":74,"es6-symbol":75,"event-emitter":78}],80:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?Map:require("./polyfill");


},{"./is-implemented":81,"./polyfill":134}],81:[function(require,module,exports){
"use strict";module.exports=function(){var e,t,n;if("function"!=typeof Map)return!1;try{e=new Map([["raz","one"],["dwa","two"],["trzy","three"]])}catch(o){return!1}return 3!==e.size?!1:"function"!=typeof e.clear?!1:"function"!=typeof e["delete"]?!1:"function"!=typeof e.entries?!1:"function"!=typeof e.forEach?!1:"function"!=typeof e.get?!1:"function"!=typeof e.has?!1:"function"!=typeof e.keys?!1:"function"!=typeof e.set?!1:"function"!=typeof e.values?!1:(t=e.entries(),n=t.next(),n.done!==!1?!1:n.value?"raz"!==n.value[0]?!1:"one"!==n.value[1]?!1:!0:!1)};


},{}],82:[function(require,module,exports){
"use strict";module.exports=function(){return"undefined"==typeof Map?!1:"[object Map]"===Object.prototype.toString.call(Map.prototype)}();


},{}],83:[function(require,module,exports){
"use strict";module.exports=require("es5-ext/object/primitive-set")("key","value","key+value");


},{"es5-ext/object/primitive-set":108}],84:[function(require,module,exports){
"use strict";var setPrototypeOf=require("es5-ext/object/set-prototype-of"),d=require("d"),Iterator=require("es6-iterator"),toStringTagSymbol=require("es6-symbol").toStringTag,kinds=require("./iterator-kinds"),defineProperties=Object.defineProperties,unBind=Iterator.prototype._unBind,MapIterator;MapIterator=module.exports=function(t,e){return this instanceof MapIterator?(Iterator.call(this,t.__mapKeysData__,t),e&&kinds[e]||(e="key+value"),void defineProperties(this,{__kind__:d("",e),__values__:d("w",t.__mapValuesData__)})):new MapIterator(t,e)},setPrototypeOf&&setPrototypeOf(MapIterator,Iterator),MapIterator.prototype=Object.create(Iterator.prototype,{constructor:d(MapIterator),_resolve:d(function(t){return"value"===this.__kind__?this.__values__[t]:"key"===this.__kind__?this.__list__[t]:[this.__list__[t],this.__values__[t]]}),_unBind:d(function(){this.__values__=null,unBind.call(this)}),toString:d(function(){return"[object Map Iterator]"})}),Object.defineProperty(MapIterator.prototype,toStringTagSymbol,d("c","Map Iterator"));


},{"./iterator-kinds":83,"d":86,"es5-ext/object/set-prototype-of":109,"es6-iterator":121,"es6-symbol":130}],85:[function(require,module,exports){
"use strict";var copy=require("es5-ext/object/copy"),map=require("es5-ext/object/map"),callable=require("es5-ext/object/valid-callable"),validValue=require("es5-ext/object/valid-value"),bind=Function.prototype.bind,defineProperty=Object.defineProperty,hasOwnProperty=Object.prototype.hasOwnProperty,define;define=function(e,t,r){var a,i=validValue(t)&&callable(t.value);return a=copy(t),delete a.writable,delete a.value,a.get=function(){return hasOwnProperty.call(this,e)?i:(t.value=bind.call(i,null==r?this:this[r]),defineProperty(this,e,t),this[e])},a},module.exports=function(e){var t=arguments[1];return map(e,function(e,r){return define(r,e,t)})};


},{"es5-ext/object/copy":98,"es5-ext/object/map":106,"es5-ext/object/valid-callable":112,"es5-ext/object/valid-value":113}],86:[function(require,module,exports){
"use strict";var assign=require("es5-ext/object/assign"),normalizeOpts=require("es5-ext/object/normalize-options"),isCallable=require("es5-ext/object/is-callable"),contains=require("es5-ext/string/#/contains"),d;d=module.exports=function(e,l){var n,a,s,i,t;return arguments.length<2||"string"!=typeof e?(i=l,l=e,e=null):i=arguments[2],null==e?(n=s=!0,a=!1):(n=contains.call(e,"c"),a=contains.call(e,"e"),s=contains.call(e,"w")),t={value:l,configurable:n,enumerable:a,writable:s},i?assign(normalizeOpts(i),t):t},d.gs=function(e,l,n){var a,s,i,t;return"string"!=typeof e?(i=n,n=l,l=e,e=null):i=arguments[3],null==l?l=void 0:isCallable(l)?null==n?n=void 0:isCallable(n)||(i=n,n=void 0):(i=l,l=n=void 0),null==e?(a=!0,s=!1):(a=contains.call(e,"c"),s=contains.call(e,"e")),t={get:l,set:n,configurable:a,enumerable:s},i?assign(normalizeOpts(i),t):t};


},{"es5-ext/object/assign":95,"es5-ext/object/is-callable":101,"es5-ext/object/normalize-options":107,"es5-ext/string/#/contains":114}],87:[function(require,module,exports){
"use strict";var value=require("../../object/valid-value");module.exports=function(){return value(this).length=0,this};


},{"../../object/valid-value":113}],88:[function(require,module,exports){
"use strict";var toPosInt=require("../../number/to-pos-integer"),value=require("../../object/valid-value"),indexOf=Array.prototype.indexOf,hasOwnProperty=Object.prototype.hasOwnProperty,abs=Math.abs,floor=Math.floor;module.exports=function(t){var r,e,o,s;if(t===t)return indexOf.apply(this,arguments);for(e=toPosInt(value(this).length),o=arguments[1],o=isNaN(o)?0:o>=0?floor(o):toPosInt(this.length)-floor(abs(o)),r=o;e>r;++r)if(hasOwnProperty.call(this,r)&&(s=this[r],s!==s))return r;return-1};


},{"../../number/to-pos-integer":93,"../../object/valid-value":113}],89:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?Math.sign:require("./shim");


},{"./is-implemented":90,"./shim":91}],90:[function(require,module,exports){
"use strict";module.exports=function(){var t=Math.sign;return"function"!=typeof t?!1:1===t(10)&&-1===t(-20)};


},{}],91:[function(require,module,exports){
"use strict";module.exports=function(e){return e=Number(e),isNaN(e)||0===e?e:e>0?1:-1};


},{}],92:[function(require,module,exports){
"use strict";var sign=require("../math/sign"),abs=Math.abs,floor=Math.floor;module.exports=function(r){return isNaN(r)?0:(r=Number(r),0!==r&&isFinite(r)?sign(r)*floor(abs(r)):r)};


},{"../math/sign":89}],93:[function(require,module,exports){
"use strict";var toInteger=require("./to-integer"),max=Math.max;module.exports=function(e){return max(0,toInteger(e))};


},{"./to-integer":92}],94:[function(require,module,exports){
"use strict";var isCallable=require("./is-callable"),callable=require("./valid-callable"),value=require("./valid-value"),call=Function.prototype.call,keys=Object.keys,propertyIsEnumerable=Object.prototype.propertyIsEnumerable;module.exports=function(e,l){return function(r,a){var t,u=arguments[2],c=arguments[3];return r=Object(value(r)),callable(a),t=keys(r),c&&t.sort(isCallable(c)?c.bind(r):void 0),t[e](function(e,t){return propertyIsEnumerable.call(r,e)?call.call(a,u,r[e],e,r,t):l})}};


},{"./is-callable":101,"./valid-callable":112,"./valid-value":113}],95:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?Object.assign:require("./shim");


},{"./is-implemented":96,"./shim":97}],96:[function(require,module,exports){
"use strict";module.exports=function(){var r,t=Object.assign;return"function"!=typeof t?!1:(r={foo:"raz"},t(r,{bar:"dwa"},{trzy:"trzy"}),r.foo+r.bar+r.trzy==="razdwatrzy")};


},{}],97:[function(require,module,exports){
"use strict";var keys=require("../keys"),value=require("../valid-value"),max=Math.max;module.exports=function(e,r){var a,t,u,i=max(arguments.length,2);for(e=Object(value(e)),u=function(t){try{e[t]=r[t]}catch(u){a||(a=u)}},t=1;i>t;++t)r=arguments[t],keys(r).forEach(u);if(void 0!==a)throw a;return e};


},{"../keys":103,"../valid-value":113}],98:[function(require,module,exports){
"use strict";var assign=require("./assign"),value=require("./valid-value");module.exports=function(e){var r=Object(value(e));return r!==e?r:assign({},e)};


},{"./assign":95,"./valid-value":113}],99:[function(require,module,exports){
"use strict";var create=Object.create,shim;require("./set-prototype-of/is-implemented")()||(shim=require("./set-prototype-of/shim")),module.exports=function(){var e,r,t;return shim?1!==shim.level?create:(e={},r={},t={configurable:!1,enumerable:!1,writable:!0,value:void 0},Object.getOwnPropertyNames(Object.prototype).forEach(function(e){return"__proto__"===e?void(r[e]={configurable:!0,enumerable:!1,writable:!0,value:void 0}):void(r[e]=t)}),Object.defineProperties(e,r),Object.defineProperty(shim,"nullPolyfill",{configurable:!1,enumerable:!1,writable:!1,value:e}),function(r,t){return create(null===r?e:r,t)}):create}();


},{"./set-prototype-of/is-implemented":110,"./set-prototype-of/shim":111}],100:[function(require,module,exports){
"use strict";module.exports=require("./_iterate")("forEach");


},{"./_iterate":94}],101:[function(require,module,exports){
"use strict";module.exports=function(t){return"function"==typeof t};


},{}],102:[function(require,module,exports){
"use strict";var map={"function":!0,object:!0};module.exports=function(t){return null!=t&&map[typeof t]||!1};


},{}],103:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?Object.keys:require("./shim");


},{"./is-implemented":104,"./shim":105}],104:[function(require,module,exports){
"use strict";module.exports=function(){try{return Object.keys("primitive"),!0}catch(t){return!1}};


},{}],105:[function(require,module,exports){
"use strict";var keys=Object.keys;module.exports=function(e){return keys(null==e?e:Object(e))};


},{}],106:[function(require,module,exports){
"use strict";var callable=require("./valid-callable"),forEach=require("./for-each"),call=Function.prototype.call;module.exports=function(l,a){var r={},c=arguments[2];return callable(a),forEach(l,function(l,e,o,t){r[e]=call.call(a,c,l,e,o,t)}),r};


},{"./for-each":100,"./valid-callable":112}],107:[function(require,module,exports){
"use strict";var forEach=Array.prototype.forEach,create=Object.create,process=function(r,e){var c;for(c in r)e[c]=r[c]};module.exports=function(r){var e=create(null);return forEach.call(arguments,function(r){null!=r&&process(Object(r),e)}),e};


},{}],108:[function(require,module,exports){
"use strict";var forEach=Array.prototype.forEach,create=Object.create;module.exports=function(r){var e=create(null);return forEach.call(arguments,function(r){e[r]=!0}),e};


},{}],109:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?Object.setPrototypeOf:require("./shim");


},{"./is-implemented":110,"./shim":111}],110:[function(require,module,exports){
"use strict";var create=Object.create,getPrototypeOf=Object.getPrototypeOf,x={};module.exports=function(){var t=Object.setPrototypeOf,e=arguments[0]||create;return"function"!=typeof t?!1:getPrototypeOf(t(e(null),x))===x};


},{}],111:[function(require,module,exports){
"use strict";var isObject=require("../is-object"),value=require("../valid-value"),isPrototypeOf=Object.prototype.isPrototypeOf,defineProperty=Object.defineProperty,nullDesc={configurable:!0,enumerable:!1,writable:!0,value:void 0},validate;validate=function(e,t){if(value(e),null===t||isObject(t))return e;throw new TypeError("Prototype must be null or an object")},module.exports=function(e){var t,l;return e?(2===e.level?e.set?(l=e.set,t=function(e,t){return l.call(validate(e,t),t),e}):t=function(e,t){return validate(e,t).__proto__=t,e}:t=function r(e,t){var l;return validate(e,t),l=isPrototypeOf.call(r.nullPolyfill,e),l&&delete r.nullPolyfill.__proto__,null===t&&(t=r.nullPolyfill),e.__proto__=t,l&&defineProperty(r.nullPolyfill,"__proto__",nullDesc),e},Object.defineProperty(t,"level",{configurable:!1,enumerable:!1,writable:!1,value:e.level})):null}(function(){var e,t=Object.create(null),l={},r=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__");if(r){try{e=r.set,e.call(t,l)}catch(o){}if(Object.getPrototypeOf(t)===l)return{set:e,level:2}}return t.__proto__=l,Object.getPrototypeOf(t)===l?{level:2}:(t={},t.__proto__=l,Object.getPrototypeOf(t)===l?{level:1}:!1)}()),require("../create");


},{"../create":99,"../is-object":102,"../valid-value":113}],112:[function(require,module,exports){
"use strict";module.exports=function(t){if("function"!=typeof t)throw new TypeError(t+" is not a function");return t};


},{}],113:[function(require,module,exports){
"use strict";module.exports=function(n){if(null==n)throw new TypeError("Cannot use null or undefined");return n};


},{}],114:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?String.prototype.contains:require("./shim");


},{"./is-implemented":115,"./shim":116}],115:[function(require,module,exports){
"use strict";var str="razdwatrzy";module.exports=function(){return"function"!=typeof str.contains?!1:str.contains("dwa")===!0&&str.contains("foo")===!1};


},{}],116:[function(require,module,exports){
"use strict";var indexOf=String.prototype.indexOf;module.exports=function(t){return indexOf.call(this,t,arguments[1])>-1};


},{}],117:[function(require,module,exports){
"use strict";var toString=Object.prototype.toString,id=toString.call("");module.exports=function(t){return"string"==typeof t||t&&"object"==typeof t&&(t instanceof String||toString.call(t)===id)||!1};


},{}],118:[function(require,module,exports){
"use strict";var setPrototypeOf=require("es5-ext/object/set-prototype-of"),contains=require("es5-ext/string/#/contains"),d=require("d"),Iterator=require("./"),defineProperty=Object.defineProperty,ArrayIterator;ArrayIterator=module.exports=function(t,r){return this instanceof ArrayIterator?(Iterator.call(this,t),r=r?contains.call(r,"key+value")?"key+value":contains.call(r,"key")?"key":"value":"value",void defineProperty(this,"__kind__",d("",r))):new ArrayIterator(t,r)},setPrototypeOf&&setPrototypeOf(ArrayIterator,Iterator),ArrayIterator.prototype=Object.create(Iterator.prototype,{constructor:d(ArrayIterator),_resolve:d(function(t){return"value"===this.__kind__?this.__list__[t]:"key+value"===this.__kind__?[t,this.__list__[t]]:t}),toString:d(function(){return"[object Array Iterator]"})});


},{"./":121,"d":86,"es5-ext/object/set-prototype-of":109,"es5-ext/string/#/contains":114}],119:[function(require,module,exports){
"use strict";var callable=require("es5-ext/object/valid-callable"),isString=require("es5-ext/string/is-string"),get=require("./get"),isArray=Array.isArray,call=Function.prototype.call;module.exports=function(r,e){var l,t,a,i,n,c,s,o,u=arguments[2];if(isArray(r)?l="array":isString(r)?l="string":r=get(r),callable(e),a=function(){i=!0},"array"===l)return void r.some(function(r){return call.call(e,u,r,a),i?!0:void 0});if("string"!==l)for(t=r.next();!t.done;){if(call.call(e,u,t.value,a),i)return;t=r.next()}else for(c=r.length,n=0;c>n&&(s=r[n],c>n+1&&(o=s.charCodeAt(0),o>=55296&&56319>=o&&(s+=r[++n])),call.call(e,u,s,a),!i);++n);};


},{"./get":120,"es5-ext/object/valid-callable":112,"es5-ext/string/is-string":117}],120:[function(require,module,exports){
"use strict";var isString=require("es5-ext/string/is-string"),ArrayIterator=require("./array"),StringIterator=require("./string"),iterable=require("./valid-iterable"),iteratorSymbol=require("es6-symbol").iterator;module.exports=function(r){return"function"==typeof iterable(r)[iteratorSymbol]?r[iteratorSymbol]():isString(r)?new StringIterator(r):new ArrayIterator(r)};


},{"./array":118,"./string":128,"./valid-iterable":129,"es5-ext/string/is-string":117,"es6-symbol":123}],121:[function(require,module,exports){
"use strict";var clear=require("es5-ext/array/#/clear"),assign=require("es5-ext/object/assign"),callable=require("es5-ext/object/valid-callable"),value=require("es5-ext/object/valid-value"),d=require("d"),autoBind=require("d/auto-bind"),Symbol=require("es6-symbol"),defineProperty=Object.defineProperty,defineProperties=Object.defineProperties,Iterator;module.exports=Iterator=function(e,t){return this instanceof Iterator?(defineProperties(this,{__list__:d("w",value(e)),__context__:d("w",t),__nextIndex__:d("w",0)}),void(t&&(callable(t.on),t.on("_add",this._onAdd),t.on("_delete",this._onDelete),t.on("_clear",this._onClear)))):new Iterator(e,t)},defineProperties(Iterator.prototype,assign({constructor:d(Iterator),_next:d(function(){var e;if(this.__list__)return this.__redo__&&(e=this.__redo__.shift(),void 0!==e)?e:this.__nextIndex__<this.__list__.length?this.__nextIndex__++:void this._unBind()}),next:d(function(){return this._createResult(this._next())}),_createResult:d(function(e){return void 0===e?{done:!0,value:void 0}:{done:!1,value:this._resolve(e)}}),_resolve:d(function(e){return this.__list__[e]}),_unBind:d(function(){this.__list__=null,delete this.__redo__,this.__context__&&(this.__context__.off("_add",this._onAdd),this.__context__.off("_delete",this._onDelete),this.__context__.off("_clear",this._onClear),this.__context__=null)}),toString:d(function(){return"[object Iterator]"})},autoBind({_onAdd:d(function(e){if(!(e>=this.__nextIndex__)){if(++this.__nextIndex__,!this.__redo__)return void defineProperty(this,"__redo__",d("c",[e]));this.__redo__.forEach(function(t,_){t>=e&&(this.__redo__[_]=++t)},this),this.__redo__.push(e)}}),_onDelete:d(function(e){var t;e>=this.__nextIndex__||(--this.__nextIndex__,this.__redo__&&(t=this.__redo__.indexOf(e),-1!==t&&this.__redo__.splice(t,1),this.__redo__.forEach(function(t,_){t>e&&(this.__redo__[_]=--t)},this)))}),_onClear:d(function(){this.__redo__&&clear.call(this.__redo__),this.__nextIndex__=0})}))),defineProperty(Iterator.prototype,Symbol.iterator,d(function(){return this})),defineProperty(Iterator.prototype,Symbol.toStringTag,d("","Iterator"));


},{"d":86,"d/auto-bind":85,"es5-ext/array/#/clear":87,"es5-ext/object/assign":95,"es5-ext/object/valid-callable":112,"es5-ext/object/valid-value":113,"es6-symbol":123}],122:[function(require,module,exports){
"use strict";var isString=require("es5-ext/string/is-string"),iteratorSymbol=require("es6-symbol").iterator,isArray=Array.isArray;module.exports=function(r){return null==r?!1:isArray(r)?!0:isString(r)?!0:"function"==typeof r[iteratorSymbol]};


},{"es5-ext/string/is-string":117,"es6-symbol":123}],123:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?Symbol:require("./polyfill");


},{"./is-implemented":124,"./polyfill":126}],124:[function(require,module,exports){
"use strict";module.exports=function(){var t;if("function"!=typeof Symbol)return!1;t=Symbol("test symbol");try{String(t)}catch(o){return!1}return"symbol"==typeof Symbol.iterator?!0:"object"!=typeof Symbol.isConcatSpreadable?!1:"object"!=typeof Symbol.iterator?!1:"object"!=typeof Symbol.toPrimitive?!1:"object"!=typeof Symbol.toStringTag?!1:"object"!=typeof Symbol.unscopables?!1:!0};


},{}],125:[function(require,module,exports){
"use strict";module.exports=function(t){return t&&("symbol"==typeof t||"Symbol"===t["@@toStringTag"])||!1};


},{}],126:[function(require,module,exports){
"use strict";var d=require("d"),validateSymbol=require("./validate-symbol"),create=Object.create,defineProperties=Object.defineProperties,defineProperty=Object.defineProperty,objPrototype=Object.prototype,Symbol,HiddenSymbol,globalSymbols=create(null),generateName=function(){var e=create(null);return function(o){for(var t,r=0;e[o+(r||"")];)++r;return o+=r||"",e[o]=!0,t="@@"+o,defineProperty(objPrototype,t,d.gs(null,function(e){defineProperty(this,t,d(e))})),t}}();HiddenSymbol=function e(o){if(this instanceof HiddenSymbol)throw new TypeError("TypeError: Symbol is not a constructor");return e(o)},module.exports=Symbol=function o(e){var t;if(this instanceof o)throw new TypeError("TypeError: Symbol is not a constructor");return t=create(HiddenSymbol.prototype),e=void 0===e?"":String(e),defineProperties(t,{__description__:d("",e),__name__:d("",generateName(e))})},defineProperties(Symbol,{"for":d(function(e){return globalSymbols[e]?globalSymbols[e]:globalSymbols[e]=Symbol(String(e))}),keyFor:d(function(e){var o;validateSymbol(e);for(o in globalSymbols)if(globalSymbols[o]===e)return o}),hasInstance:d("",Symbol("hasInstance")),isConcatSpreadable:d("",Symbol("isConcatSpreadable")),iterator:d("",Symbol("iterator")),match:d("",Symbol("match")),replace:d("",Symbol("replace")),search:d("",Symbol("search")),species:d("",Symbol("species")),split:d("",Symbol("split")),toPrimitive:d("",Symbol("toPrimitive")),toStringTag:d("",Symbol("toStringTag")),unscopables:d("",Symbol("unscopables"))}),defineProperties(HiddenSymbol.prototype,{constructor:d(Symbol),toString:d("",function(){return this.__name__})}),defineProperties(Symbol.prototype,{toString:d(function(){return"Symbol ("+validateSymbol(this).__description__+")"}),valueOf:d(function(){return validateSymbol(this)})}),defineProperty(Symbol.prototype,Symbol.toPrimitive,d("",function(){return validateSymbol(this)})),defineProperty(Symbol.prototype,Symbol.toStringTag,d("c","Symbol")),defineProperty(HiddenSymbol.prototype,Symbol.toPrimitive,d("c",Symbol.prototype[Symbol.toPrimitive])),defineProperty(HiddenSymbol.prototype,Symbol.toStringTag,d("c",Symbol.prototype[Symbol.toStringTag]));


},{"./validate-symbol":127,"d":86}],127:[function(require,module,exports){
"use strict";var isSymbol=require("./is-symbol");module.exports=function(r){if(!isSymbol(r))throw new TypeError(r+" is not a symbol");return r};


},{"./is-symbol":125}],128:[function(require,module,exports){
"use strict";var setPrototypeOf=require("es5-ext/object/set-prototype-of"),d=require("d"),Iterator=require("./"),defineProperty=Object.defineProperty,StringIterator;StringIterator=module.exports=function(t){return this instanceof StringIterator?(t=String(t),Iterator.call(this,t),void defineProperty(this,"__length__",d("",t.length))):new StringIterator(t)},setPrototypeOf&&setPrototypeOf(StringIterator,Iterator),StringIterator.prototype=Object.create(Iterator.prototype,{constructor:d(StringIterator),_next:d(function(){return this.__list__?this.__nextIndex__<this.__length__?this.__nextIndex__++:void this._unBind():void 0}),_resolve:d(function(t){var e,r=this.__list__[t];return this.__nextIndex__===this.__length__?r:(e=r.charCodeAt(0),e>=55296&&56319>=e?r+this.__list__[this.__nextIndex__++]:r)}),toString:d(function(){return"[object String Iterator]"})});


},{"./":121,"d":86,"es5-ext/object/set-prototype-of":109}],129:[function(require,module,exports){
"use strict";var isIterable=require("./is-iterable");module.exports=function(e){if(!isIterable(e))throw new TypeError(e+" is not iterable");return e};


},{"./is-iterable":122}],130:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?Symbol:require("./polyfill");


},{"./is-implemented":131,"./polyfill":132}],131:[function(require,module,exports){
"use strict";module.exports=function(){var t;if("function"!=typeof Symbol)return!1;t=Symbol("test symbol");try{String(t)}catch(o){return!1}return"symbol"==typeof Symbol.iterator?!0:"object"!=typeof Symbol.isConcatSpreadable?!1:"object"!=typeof Symbol.isRegExp?!1:"object"!=typeof Symbol.iterator?!1:"object"!=typeof Symbol.toPrimitive?!1:"object"!=typeof Symbol.toStringTag?!1:"object"!=typeof Symbol.unscopables?!1:!0};


},{}],132:[function(require,module,exports){
"use strict";var d=require("d"),create=Object.create,defineProperties=Object.defineProperties,generateName,Symbol;generateName=function(){var e=create(null);return function(t){for(var o=0;e[t+(o||"")];)++o;return t+=o||"",e[t]=!0,"@@"+t}}(),module.exports=Symbol=function(e){var t;if(this instanceof Symbol)throw new TypeError("TypeError: Symbol is not a constructor");return t=create(Symbol.prototype),e=void 0===e?"":String(e),defineProperties(t,{__description__:d("",e),__name__:d("",generateName(e))})},Object.defineProperties(Symbol,{create:d("",Symbol("create")),hasInstance:d("",Symbol("hasInstance")),isConcatSpreadable:d("",Symbol("isConcatSpreadable")),isRegExp:d("",Symbol("isRegExp")),iterator:d("",Symbol("iterator")),toPrimitive:d("",Symbol("toPrimitive")),toStringTag:d("",Symbol("toStringTag")),unscopables:d("",Symbol("unscopables"))}),defineProperties(Symbol.prototype,{properToString:d(function(){return"Symbol ("+this.__description__+")"}),toString:d("",function(){return this.__name__})}),Object.defineProperty(Symbol.prototype,Symbol.toPrimitive,d("",function(e){throw new TypeError("Conversion of symbol objects is not allowed")})),Object.defineProperty(Symbol.prototype,Symbol.toStringTag,d("c","Symbol"));


},{"d":86}],133:[function(require,module,exports){
"use strict";var d=require("d"),callable=require("es5-ext/object/valid-callable"),apply=Function.prototype.apply,call=Function.prototype.call,create=Object.create,defineProperty=Object.defineProperty,defineProperties=Object.defineProperties,hasOwnProperty=Object.prototype.hasOwnProperty,descriptor={configurable:!0,enumerable:!1,writable:!0},on,once,off,emit,methods,descriptors,base;on=function(e,t){var r;return callable(t),hasOwnProperty.call(this,"__ee__")?r=this.__ee__:(r=descriptor.value=create(null),defineProperty(this,"__ee__",descriptor),descriptor.value=null),r[e]?"object"==typeof r[e]?r[e].push(t):r[e]=[r[e],t]:r[e]=t,this},once=function(e,t){var r,l;return callable(t),l=this,on.call(this,e,r=function(){off.call(l,e,r),apply.call(t,this,arguments)}),r.__eeOnceListener__=t,this},off=function(e,t){var r,l,s,o;if(callable(t),!hasOwnProperty.call(this,"__ee__"))return this;if(r=this.__ee__,!r[e])return this;if(l=r[e],"object"==typeof l)for(o=0;s=l[o];++o)(s===t||s.__eeOnceListener__===t)&&(2===l.length?r[e]=l[o?0:1]:l.splice(o,1));else(l===t||l.__eeOnceListener__===t)&&delete r[e];return this},emit=function(e){var t,r,l,s,o;if(hasOwnProperty.call(this,"__ee__")&&(s=this.__ee__[e]))if("object"==typeof s){for(r=arguments.length,o=new Array(r-1),t=1;r>t;++t)o[t-1]=arguments[t];for(s=s.slice(),t=0;l=s[t];++t)apply.call(l,this,o)}else switch(arguments.length){case 1:call.call(s,this);break;case 2:call.call(s,this,arguments[1]);break;case 3:call.call(s,this,arguments[1],arguments[2]);break;default:for(r=arguments.length,o=new Array(r-1),t=1;r>t;++t)o[t-1]=arguments[t];apply.call(s,this,o)}},methods={on:on,once:once,off:off,emit:emit},descriptors={on:d(on),once:d(once),off:d(off),emit:d(emit)},base=defineProperties({},descriptors),module.exports=exports=function(e){return null==e?create(base):defineProperties(Object(e),descriptors)},exports.methods=methods;


},{"d":86,"es5-ext/object/valid-callable":112}],134:[function(require,module,exports){
"use strict";var clear=require("es5-ext/array/#/clear"),eIndexOf=require("es5-ext/array/#/e-index-of"),setPrototypeOf=require("es5-ext/object/set-prototype-of"),callable=require("es5-ext/object/valid-callable"),validValue=require("es5-ext/object/valid-value"),d=require("d"),ee=require("event-emitter"),Symbol=require("es6-symbol"),iterator=require("es6-iterator/valid-iterable"),forOf=require("es6-iterator/for-of"),Iterator=require("./lib/iterator"),isNative=require("./is-native-implemented"),call=Function.prototype.call,defineProperties=Object.defineProperties,MapPoly;module.exports=MapPoly=function(){var e,t,a=arguments[0];if(!(this instanceof MapPoly))return new MapPoly(a);if(void 0!==this.__mapKeysData__)throw new TypeError(this+" cannot be reinitialized");null!=a&&iterator(a),defineProperties(this,{__mapKeysData__:d("c",e=[]),__mapValuesData__:d("c",t=[])}),a&&forOf(a,function(a){var r=validValue(a)[0];a=a[1],-1===eIndexOf.call(e,r)&&(e.push(r),t.push(a))},this)},isNative&&(setPrototypeOf&&setPrototypeOf(MapPoly,Map),MapPoly.prototype=Object.create(Map.prototype,{constructor:d(MapPoly)})),ee(defineProperties(MapPoly.prototype,{clear:d(function(){this.__mapKeysData__.length&&(clear.call(this.__mapKeysData__),clear.call(this.__mapValuesData__),this.emit("_clear"))}),"delete":d(function(e){var t=eIndexOf.call(this.__mapKeysData__,e);return-1===t?!1:(this.__mapKeysData__.splice(t,1),this.__mapValuesData__.splice(t,1),this.emit("_delete",t,e),!0)}),entries:d(function(){return new Iterator(this,"key+value")}),forEach:d(function(e){var t,a,r=arguments[1];for(callable(e),t=this.entries(),a=t._next();void 0!==a;)call.call(e,r,this.__mapValuesData__[a],this.__mapKeysData__[a],this),a=t._next()}),get:d(function(e){var t=eIndexOf.call(this.__mapKeysData__,e);if(-1!==t)return this.__mapValuesData__[t]}),has:d(function(e){return-1!==eIndexOf.call(this.__mapKeysData__,e)}),keys:d(function(){return new Iterator(this,"key")}),set:d(function(e,t){var a,r=eIndexOf.call(this.__mapKeysData__,e);return-1===r&&(r=this.__mapKeysData__.push(e)-1,a=!0),this.__mapValuesData__[r]=t,a&&this.emit("_add",r,e),this}),size:d.gs(function(){return this.__mapKeysData__.length}),values:d(function(){return new Iterator(this,"value")}),toString:d(function(){return"[object Map]"})})),Object.defineProperty(MapPoly.prototype,Symbol.iterator,d(function(){return this.entries()})),Object.defineProperty(MapPoly.prototype,Symbol.toStringTag,d("c","Map"));


},{"./is-native-implemented":82,"./lib/iterator":84,"d":86,"es5-ext/array/#/clear":87,"es5-ext/array/#/e-index-of":88,"es5-ext/object/set-prototype-of":109,"es5-ext/object/valid-callable":112,"es5-ext/object/valid-value":113,"es6-iterator/for-of":119,"es6-iterator/valid-iterable":129,"es6-symbol":130,"event-emitter":133}],135:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?WeakMap:require("./polyfill");


},{"./is-implemented":136,"./polyfill":177}],136:[function(require,module,exports){
"use strict";module.exports=function(){var e;return"function"!=typeof WeakMap?!1:(e=new WeakMap,"function"!=typeof e.set?!1:e.set({},1)!==e?!1:"function"!=typeof e.clear?!1:"function"!=typeof e["delete"]?!1:"function"!=typeof e.has?!1:!0)};


},{}],137:[function(require,module,exports){
"use strict";module.exports=function(){return"undefined"==typeof WeakMap?!1:"[object WeakMap]"===Object.prototype.toString.call(WeakMap.prototype)}();


},{}],138:[function(require,module,exports){
"use strict";var copy=require("es5-ext/object/copy"),map=require("es5-ext/object/map"),callable=require("es5-ext/object/valid-callable"),validValue=require("es5-ext/object/valid-value"),bind=Function.prototype.bind,defineProperty=Object.defineProperty,hasOwnProperty=Object.prototype.hasOwnProperty,define;define=function(e,t,r){var a,i=validValue(t)&&callable(t.value);return a=copy(t),delete a.writable,delete a.value,a.get=function(){return hasOwnProperty.call(this,e)?i:(t.value=bind.call(i,null==r?this:this[r]),defineProperty(this,e,t),this[e])},a},module.exports=function(e){var t=arguments[1];return map(e,function(e,r){return define(r,e,t)})};


},{"es5-ext/object/copy":145,"es5-ext/object/map":153,"es5-ext/object/valid-callable":158,"es5-ext/object/valid-value":160}],139:[function(require,module,exports){
"use strict";var assign=require("es5-ext/object/assign"),normalizeOpts=require("es5-ext/object/normalize-options"),isCallable=require("es5-ext/object/is-callable"),contains=require("es5-ext/string/#/contains"),d;d=module.exports=function(e,l){var n,a,s,i,t;return arguments.length<2||"string"!=typeof e?(i=l,l=e,e=null):i=arguments[2],null==e?(n=s=!0,a=!1):(n=contains.call(e,"c"),a=contains.call(e,"e"),s=contains.call(e,"w")),t={value:l,configurable:n,enumerable:a,writable:s},i?assign(normalizeOpts(i),t):t},d.gs=function(e,l,n){var a,s,i,t;return"string"!=typeof e?(i=n,n=l,l=e,e=null):i=arguments[3],null==l?l=void 0:isCallable(l)?null==n?n=void 0:isCallable(n)||(i=n,n=void 0):(i=l,l=n=void 0),null==e?(a=!0,s=!1):(a=contains.call(e,"c"),s=contains.call(e,"e")),t={get:l,set:n,configurable:a,enumerable:s},i?assign(normalizeOpts(i),t):t};


},{"es5-ext/object/assign":142,"es5-ext/object/is-callable":148,"es5-ext/object/normalize-options":154,"es5-ext/string/#/contains":161}],140:[function(require,module,exports){
"use strict";var value=require("../../object/valid-value");module.exports=function(){return value(this).length=0,this};


},{"../../object/valid-value":160}],141:[function(require,module,exports){
"use strict";var isCallable=require("./is-callable"),callable=require("./valid-callable"),value=require("./valid-value"),call=Function.prototype.call,keys=Object.keys,propertyIsEnumerable=Object.prototype.propertyIsEnumerable;module.exports=function(e,l){return function(r,a){var t,u=arguments[2],c=arguments[3];return r=Object(value(r)),callable(a),t=keys(r),c&&t.sort(isCallable(c)?c.bind(r):void 0),t[e](function(e,t){return propertyIsEnumerable.call(r,e)?call.call(a,u,r[e],e,r,t):l})}};


},{"./is-callable":148,"./valid-callable":158,"./valid-value":160}],142:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?Object.assign:require("./shim");


},{"./is-implemented":143,"./shim":144}],143:[function(require,module,exports){
"use strict";module.exports=function(){var r,t=Object.assign;return"function"!=typeof t?!1:(r={foo:"raz"},t(r,{bar:"dwa"},{trzy:"trzy"}),r.foo+r.bar+r.trzy==="razdwatrzy")};


},{}],144:[function(require,module,exports){
"use strict";var keys=require("../keys"),value=require("../valid-value"),max=Math.max;module.exports=function(e,r){var a,t,u,i=max(arguments.length,2);for(e=Object(value(e)),u=function(t){try{e[t]=r[t]}catch(u){a||(a=u)}},t=1;i>t;++t)r=arguments[t],keys(r).forEach(u);if(void 0!==a)throw a;return e};


},{"../keys":150,"../valid-value":160}],145:[function(require,module,exports){
"use strict";var assign=require("./assign"),value=require("./valid-value");module.exports=function(e){var r=Object(value(e));return r!==e?r:assign({},e)};


},{"./assign":142,"./valid-value":160}],146:[function(require,module,exports){
"use strict";var create=Object.create,shim;require("./set-prototype-of/is-implemented")()||(shim=require("./set-prototype-of/shim")),module.exports=function(){var e,r,t;return shim?1!==shim.level?create:(e={},r={},t={configurable:!1,enumerable:!1,writable:!0,value:void 0},Object.getOwnPropertyNames(Object.prototype).forEach(function(e){return"__proto__"===e?void(r[e]={configurable:!0,enumerable:!1,writable:!0,value:void 0}):void(r[e]=t)}),Object.defineProperties(e,r),Object.defineProperty(shim,"nullPolyfill",{configurable:!1,enumerable:!1,writable:!1,value:e}),function(r,t){return create(null===r?e:r,t)}):create}();


},{"./set-prototype-of/is-implemented":156,"./set-prototype-of/shim":157}],147:[function(require,module,exports){
"use strict";module.exports=require("./_iterate")("forEach");


},{"./_iterate":141}],148:[function(require,module,exports){
"use strict";module.exports=function(t){return"function"==typeof t};


},{}],149:[function(require,module,exports){
"use strict";var map={"function":!0,object:!0};module.exports=function(t){return null!=t&&map[typeof t]||!1};


},{}],150:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?Object.keys:require("./shim");


},{"./is-implemented":151,"./shim":152}],151:[function(require,module,exports){
"use strict";module.exports=function(){try{return Object.keys("primitive"),!0}catch(t){return!1}};


},{}],152:[function(require,module,exports){
"use strict";var keys=Object.keys;module.exports=function(e){return keys(null==e?e:Object(e))};


},{}],153:[function(require,module,exports){
"use strict";var callable=require("./valid-callable"),forEach=require("./for-each"),call=Function.prototype.call;module.exports=function(l,a){var r={},c=arguments[2];return callable(a),forEach(l,function(l,e,o,t){r[e]=call.call(a,c,l,e,o,t)}),r};


},{"./for-each":147,"./valid-callable":158}],154:[function(require,module,exports){
"use strict";var forEach=Array.prototype.forEach,create=Object.create,process=function(r,e){var c;for(c in r)e[c]=r[c]};module.exports=function(r){var e=create(null);return forEach.call(arguments,function(r){null!=r&&process(Object(r),e)}),e};


},{}],155:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?Object.setPrototypeOf:require("./shim");


},{"./is-implemented":156,"./shim":157}],156:[function(require,module,exports){
"use strict";var create=Object.create,getPrototypeOf=Object.getPrototypeOf,x={};module.exports=function(){var t=Object.setPrototypeOf,e=arguments[0]||create;return"function"!=typeof t?!1:getPrototypeOf(t(e(null),x))===x};


},{}],157:[function(require,module,exports){
"use strict";var isObject=require("../is-object"),value=require("../valid-value"),isPrototypeOf=Object.prototype.isPrototypeOf,defineProperty=Object.defineProperty,nullDesc={configurable:!0,enumerable:!1,writable:!0,value:void 0},validate;validate=function(e,t){if(value(e),null===t||isObject(t))return e;throw new TypeError("Prototype must be null or an object")},module.exports=function(e){var t,l;return e?(2===e.level?e.set?(l=e.set,t=function(e,t){return l.call(validate(e,t),t),e}):t=function(e,t){return validate(e,t).__proto__=t,e}:t=function r(e,t){var l;return validate(e,t),l=isPrototypeOf.call(r.nullPolyfill,e),l&&delete r.nullPolyfill.__proto__,null===t&&(t=r.nullPolyfill),e.__proto__=t,l&&defineProperty(r.nullPolyfill,"__proto__",nullDesc),e},Object.defineProperty(t,"level",{configurable:!1,enumerable:!1,writable:!1,value:e.level})):null}(function(){var e,t=Object.create(null),l={},r=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__");if(r){try{e=r.set,e.call(t,l)}catch(o){}if(Object.getPrototypeOf(t)===l)return{set:e,level:2}}return t.__proto__=l,Object.getPrototypeOf(t)===l?{level:2}:(t={},t.__proto__=l,Object.getPrototypeOf(t)===l?{level:1}:!1)}()),require("../create");


},{"../create":146,"../is-object":149,"../valid-value":160}],158:[function(require,module,exports){
"use strict";module.exports=function(t){if("function"!=typeof t)throw new TypeError(t+" is not a function");return t};


},{}],159:[function(require,module,exports){
"use strict";var isObject=require("./is-object");module.exports=function(e){if(!isObject(e))throw new TypeError(e+" is not an Object");return e};


},{"./is-object":149}],160:[function(require,module,exports){
"use strict";module.exports=function(n){if(null==n)throw new TypeError("Cannot use null or undefined");return n};


},{}],161:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?String.prototype.contains:require("./shim");


},{"./is-implemented":162,"./shim":163}],162:[function(require,module,exports){
"use strict";var str="razdwatrzy";module.exports=function(){return"function"!=typeof str.contains?!1:str.contains("dwa")===!0&&str.contains("foo")===!1};


},{}],163:[function(require,module,exports){
"use strict";var indexOf=String.prototype.indexOf;module.exports=function(t){return indexOf.call(this,t,arguments[1])>-1};


},{}],164:[function(require,module,exports){
"use strict";var toString=Object.prototype.toString,id=toString.call("");module.exports=function(t){return"string"==typeof t||t&&"object"==typeof t&&(t instanceof String||toString.call(t)===id)||!1};


},{}],165:[function(require,module,exports){
"use strict";var setPrototypeOf=require("es5-ext/object/set-prototype-of"),contains=require("es5-ext/string/#/contains"),d=require("d"),Iterator=require("./"),defineProperty=Object.defineProperty,ArrayIterator;ArrayIterator=module.exports=function(t,r){return this instanceof ArrayIterator?(Iterator.call(this,t),r=r?contains.call(r,"key+value")?"key+value":contains.call(r,"key")?"key":"value":"value",void defineProperty(this,"__kind__",d("",r))):new ArrayIterator(t,r)},setPrototypeOf&&setPrototypeOf(ArrayIterator,Iterator),ArrayIterator.prototype=Object.create(Iterator.prototype,{constructor:d(ArrayIterator),_resolve:d(function(t){return"value"===this.__kind__?this.__list__[t]:"key+value"===this.__kind__?[t,this.__list__[t]]:t}),toString:d(function(){return"[object Array Iterator]"})});


},{"./":168,"d":139,"es5-ext/object/set-prototype-of":155,"es5-ext/string/#/contains":161}],166:[function(require,module,exports){
"use strict";var callable=require("es5-ext/object/valid-callable"),isString=require("es5-ext/string/is-string"),get=require("./get"),isArray=Array.isArray,call=Function.prototype.call;module.exports=function(r,e){var l,t,a,i,n,c,s,o,u=arguments[2];if(isArray(r)?l="array":isString(r)?l="string":r=get(r),callable(e),a=function(){i=!0},"array"===l)return void r.some(function(r){return call.call(e,u,r,a),i?!0:void 0});if("string"!==l)for(t=r.next();!t.done;){if(call.call(e,u,t.value,a),i)return;t=r.next()}else for(c=r.length,n=0;c>n&&(s=r[n],c>n+1&&(o=s.charCodeAt(0),o>=55296&&56319>=o&&(s+=r[++n])),call.call(e,u,s,a),!i);++n);};


},{"./get":167,"es5-ext/object/valid-callable":158,"es5-ext/string/is-string":164}],167:[function(require,module,exports){
"use strict";var isString=require("es5-ext/string/is-string"),ArrayIterator=require("./array"),StringIterator=require("./string"),iterable=require("./valid-iterable"),iteratorSymbol=require("es6-symbol").iterator;module.exports=function(r){return"function"==typeof iterable(r)[iteratorSymbol]?r[iteratorSymbol]():isString(r)?new StringIterator(r):new ArrayIterator(r)};


},{"./array":165,"./string":170,"./valid-iterable":171,"es5-ext/string/is-string":164,"es6-symbol":172}],168:[function(require,module,exports){
"use strict";var clear=require("es5-ext/array/#/clear"),assign=require("es5-ext/object/assign"),callable=require("es5-ext/object/valid-callable"),value=require("es5-ext/object/valid-value"),d=require("d"),autoBind=require("d/auto-bind"),Symbol=require("es6-symbol"),defineProperty=Object.defineProperty,defineProperties=Object.defineProperties,Iterator;module.exports=Iterator=function(e,t){return this instanceof Iterator?(defineProperties(this,{__list__:d("w",value(e)),__context__:d("w",t),__nextIndex__:d("w",0)}),void(t&&(callable(t.on),t.on("_add",this._onAdd),t.on("_delete",this._onDelete),t.on("_clear",this._onClear)))):new Iterator(e,t)},defineProperties(Iterator.prototype,assign({constructor:d(Iterator),_next:d(function(){var e;if(this.__list__)return this.__redo__&&(e=this.__redo__.shift(),void 0!==e)?e:this.__nextIndex__<this.__list__.length?this.__nextIndex__++:void this._unBind()}),next:d(function(){return this._createResult(this._next())}),_createResult:d(function(e){return void 0===e?{done:!0,value:void 0}:{done:!1,value:this._resolve(e)}}),_resolve:d(function(e){return this.__list__[e]}),_unBind:d(function(){this.__list__=null,delete this.__redo__,this.__context__&&(this.__context__.off("_add",this._onAdd),this.__context__.off("_delete",this._onDelete),this.__context__.off("_clear",this._onClear),this.__context__=null)}),toString:d(function(){return"[object Iterator]"})},autoBind({_onAdd:d(function(e){if(!(e>=this.__nextIndex__)){if(++this.__nextIndex__,!this.__redo__)return void defineProperty(this,"__redo__",d("c",[e]));this.__redo__.forEach(function(t,_){t>=e&&(this.__redo__[_]=++t)},this),this.__redo__.push(e)}}),_onDelete:d(function(e){var t;e>=this.__nextIndex__||(--this.__nextIndex__,this.__redo__&&(t=this.__redo__.indexOf(e),-1!==t&&this.__redo__.splice(t,1),this.__redo__.forEach(function(t,_){t>e&&(this.__redo__[_]=--t)},this)))}),_onClear:d(function(){this.__redo__&&clear.call(this.__redo__),this.__nextIndex__=0})}))),defineProperty(Iterator.prototype,Symbol.iterator,d(function(){return this})),defineProperty(Iterator.prototype,Symbol.toStringTag,d("","Iterator"));


},{"d":139,"d/auto-bind":138,"es5-ext/array/#/clear":140,"es5-ext/object/assign":142,"es5-ext/object/valid-callable":158,"es5-ext/object/valid-value":160,"es6-symbol":172}],169:[function(require,module,exports){
"use strict";var isString=require("es5-ext/string/is-string"),iteratorSymbol=require("es6-symbol").iterator,isArray=Array.isArray;module.exports=function(r){return null==r?!1:isArray(r)?!0:isString(r)?!0:"function"==typeof r[iteratorSymbol]};


},{"es5-ext/string/is-string":164,"es6-symbol":172}],170:[function(require,module,exports){
"use strict";var setPrototypeOf=require("es5-ext/object/set-prototype-of"),d=require("d"),Iterator=require("./"),defineProperty=Object.defineProperty,StringIterator;StringIterator=module.exports=function(t){return this instanceof StringIterator?(t=String(t),Iterator.call(this,t),void defineProperty(this,"__length__",d("",t.length))):new StringIterator(t)},setPrototypeOf&&setPrototypeOf(StringIterator,Iterator),StringIterator.prototype=Object.create(Iterator.prototype,{constructor:d(StringIterator),_next:d(function(){return this.__list__?this.__nextIndex__<this.__length__?this.__nextIndex__++:void this._unBind():void 0}),_resolve:d(function(t){var e,r=this.__list__[t];return this.__nextIndex__===this.__length__?r:(e=r.charCodeAt(0),e>=55296&&56319>=e?r+this.__list__[this.__nextIndex__++]:r)}),toString:d(function(){return"[object String Iterator]"})});


},{"./":168,"d":139,"es5-ext/object/set-prototype-of":155}],171:[function(require,module,exports){
"use strict";var isIterable=require("./is-iterable");module.exports=function(e){if(!isIterable(e))throw new TypeError(e+" is not iterable");return e};


},{"./is-iterable":169}],172:[function(require,module,exports){
"use strict";module.exports=require("./is-implemented")()?Symbol:require("./polyfill");


},{"./is-implemented":173,"./polyfill":175}],173:[function(require,module,exports){
"use strict";module.exports=function(){var t;if("function"!=typeof Symbol)return!1;t=Symbol("test symbol");try{String(t)}catch(o){return!1}return"symbol"==typeof Symbol.iterator?!0:"object"!=typeof Symbol.isConcatSpreadable?!1:"object"!=typeof Symbol.iterator?!1:"object"!=typeof Symbol.toPrimitive?!1:"object"!=typeof Symbol.toStringTag?!1:"object"!=typeof Symbol.unscopables?!1:!0};


},{}],174:[function(require,module,exports){
"use strict";module.exports=function(t){return t&&("symbol"==typeof t||"Symbol"===t["@@toStringTag"])||!1};


},{}],175:[function(require,module,exports){
"use strict";var d=require("d"),validateSymbol=require("./validate-symbol"),create=Object.create,defineProperties=Object.defineProperties,defineProperty=Object.defineProperty,objPrototype=Object.prototype,Symbol,HiddenSymbol,globalSymbols=create(null),generateName=function(){var e=create(null);return function(o){for(var t,r=0;e[o+(r||"")];)++r;return o+=r||"",e[o]=!0,t="@@"+o,defineProperty(objPrototype,t,d.gs(null,function(e){defineProperty(this,t,d(e))})),t}}();HiddenSymbol=function e(o){if(this instanceof HiddenSymbol)throw new TypeError("TypeError: Symbol is not a constructor");return e(o)},module.exports=Symbol=function o(e){var t;if(this instanceof o)throw new TypeError("TypeError: Symbol is not a constructor");return t=create(HiddenSymbol.prototype),e=void 0===e?"":String(e),defineProperties(t,{__description__:d("",e),__name__:d("",generateName(e))})},defineProperties(Symbol,{"for":d(function(e){return globalSymbols[e]?globalSymbols[e]:globalSymbols[e]=Symbol(String(e))}),keyFor:d(function(e){var o;validateSymbol(e);for(o in globalSymbols)if(globalSymbols[o]===e)return o}),hasInstance:d("",Symbol("hasInstance")),isConcatSpreadable:d("",Symbol("isConcatSpreadable")),iterator:d("",Symbol("iterator")),match:d("",Symbol("match")),replace:d("",Symbol("replace")),search:d("",Symbol("search")),species:d("",Symbol("species")),split:d("",Symbol("split")),toPrimitive:d("",Symbol("toPrimitive")),toStringTag:d("",Symbol("toStringTag")),unscopables:d("",Symbol("unscopables"))}),defineProperties(HiddenSymbol.prototype,{constructor:d(Symbol),toString:d("",function(){return this.__name__})}),defineProperties(Symbol.prototype,{toString:d(function(){return"Symbol ("+validateSymbol(this).__description__+")"}),valueOf:d(function(){return validateSymbol(this)})}),defineProperty(Symbol.prototype,Symbol.toPrimitive,d("",function(){return validateSymbol(this)})),defineProperty(Symbol.prototype,Symbol.toStringTag,d("c","Symbol")),defineProperty(HiddenSymbol.prototype,Symbol.toPrimitive,d("c",Symbol.prototype[Symbol.toPrimitive])),defineProperty(HiddenSymbol.prototype,Symbol.toStringTag,d("c",Symbol.prototype[Symbol.toStringTag]));


},{"./validate-symbol":176,"d":139}],176:[function(require,module,exports){
"use strict";var isSymbol=require("./is-symbol");module.exports=function(r){if(!isSymbol(r))throw new TypeError(r+" is not a symbol");return r};


},{"./is-symbol":174}],177:[function(require,module,exports){
"use strict";var setPrototypeOf=require("es5-ext/object/set-prototype-of"),object=require("es5-ext/object/valid-object"),value=require("es5-ext/object/valid-value"),d=require("d"),getIterator=require("es6-iterator/get"),forOf=require("es6-iterator/for-of"),toStringTagSymbol=require("es6-symbol").toStringTag,isNative=require("./is-native-implemented"),isArray=Array.isArray,defineProperty=Object.defineProperty,random=Math.random,hasOwnProperty=Object.prototype.hasOwnProperty,genId,WeakMapPoly;genId=function(){var e=Object.create(null);return function(){var t;do t=random().toString(36).slice(2);while(e[t]);return e[t]=!0,t}}(),module.exports=WeakMapPoly=function(){var e=arguments[0];if(!(this instanceof WeakMapPoly))return new WeakMapPoly(e);if(void 0!==this.__weakMapData__)throw new TypeError(this+" cannot be reinitialized");null!=e&&(isArray(e)||(e=getIterator(e))),defineProperty(this,"__weakMapData__",d("c","$weakMap$"+genId())),e&&forOf(e,function(e){value(e),this.set(e[0],e[1])},this)},isNative&&(setPrototypeOf&&setPrototypeOf(WeakMapPoly,WeakMap),WeakMapPoly.prototype=Object.create(WeakMap.prototype,{constructor:d(WeakMapPoly)})),Object.defineProperties(WeakMapPoly.prototype,{clear:d(function(){defineProperty(this,"__weakMapData__",d("c","$weakMap$"+genId()))}),"delete":d(function(e){return hasOwnProperty.call(object(e),this.__weakMapData__)?(delete e[this.__weakMapData__],!0):!1}),get:d(function(e){return hasOwnProperty.call(object(e),this.__weakMapData__)?e[this.__weakMapData__]:void 0}),has:d(function(e){return hasOwnProperty.call(object(e),this.__weakMapData__)}),set:d(function(e,t){return defineProperty(object(e),this.__weakMapData__,d("c",t)),this}),toString:d(function(){return"[object WeakMap]"})}),defineProperty(WeakMapPoly.prototype,toStringTagSymbol,d("c","WeakMap"));


},{"./is-native-implemented":137,"d":139,"es5-ext/object/set-prototype-of":155,"es5-ext/object/valid-object":159,"es5-ext/object/valid-value":160,"es6-iterator/for-of":166,"es6-iterator/get":167,"es6-symbol":172}],178:[function(require,module,exports){
function flatMerge(e,t){t&&"object"==typeof t||(t={}),e&&"object"==typeof e||(e=new t.constructor);for(var o=new e.constructor,r=Object.keys(e),c=Object.keys(t),n=0;n<r.length;n++)o[r[n]]=e[r[n]];for(var n=0;n<c.length;n++)o[c[n]]=t[c[n]];return o}module.exports=flatMerge;


},{}],179:[function(require,module,exports){
module.exports=function(e,t){return e===t?!0:typeof e==typeof t&&("object"!=typeof e||e instanceof Date&&t instanceof Date)?e+""==t+"":!1};


},{}],180:[function(require,module,exports){
var unsupportedTypes=["number","email","time","color","month","range","date"];module.exports=function(e,t){var n=e.setSelectionRange&&!~unsupportedTypes.indexOf(e.type)&&e===document.activeElement;if(n){var o=e.selectionStart,a=e.selectionEnd;e.value=t,e.setSelectionRange(o,a)}else e.value=t};


},{}],181:[function(require,module,exports){
function keysAreDifferent(e,t){if(e!==t){if(!e||!t||e.length!==t.length)return!0;for(var r=0;r<e.length;r++)if(!~t.indexOf(e[r]))return!0}}function getKeys(e){return e&&"object"==typeof e?Object.keys(e):void 0}function WhatChanged(e,t){if(this._changesToTrack={},null==t&&(t="value type keys structure reference"),"string"!=typeof t)throw"changesToTrack must be of type string";t=t.split(" ");for(var r=0;r<t.length;r++)this._changesToTrack[t[r]]=!0;this.update(e)}var clone=require("clone"),deepEqual=require("deep-equal");WhatChanged.prototype.update=function(e){var t={},r=this._changesToTrack,n=getKeys(e);if("value"in r&&e+""!=this._lastReference+""&&(t.value=!0),"type"in r&&typeof e!=typeof this._lastValue&&(t.type=!0),"keys"in r&&keysAreDifferent(this._lastKeys,getKeys(e))&&(t.keys=!0),null!==e&&"object"==typeof e){var s=this._lastValue;"shallowStructure"in r&&(!s||"object"!=typeof s||Object.keys(e).some(function(t,r){return e[t[r]]!==s[t[r]]}))&&(t.shallowStructure=!0),"structure"in r&&!deepEqual(e,s)&&(t.structure=!0),"reference"in r&&e!==this._lastReference&&(t.reference=!0)}return this._lastValue="structure"in r?clone(e):"shallowStructure"in r?clone(e,!0,1):e,this._lastReference=e,this._lastKeys=n,t},module.exports=WhatChanged;


},{"clone":182,"deep-equal":183}],182:[function(require,module,exports){
var clone=function(){"use strict";function e(t,r,n,o){function f(t,n){if(null===t)return null;if(0==n)return t;var i,a;if("object"!=typeof t)return t;if(e.__isArray(t))i=[];else if(e.__isRegExp(t))i=new RegExp(t.source,u(t)),t.lastIndex&&(i.lastIndex=t.lastIndex);else if(e.__isDate(t))i=new Date(t.getTime());else{if(p&&Buffer.isBuffer(t))return i=new Buffer(t.length),t.copy(i),i;"undefined"==typeof o?(a=Object.getPrototypeOf(t),i=Object.create(a)):(i=Object.create(o),a=o)}if(r){var s=c.indexOf(t);if(-1!=s)return l[s];c.push(t),l.push(i)}for(var y in t){var b;a&&(b=Object.getOwnPropertyDescriptor(a,y)),b&&null==b.set||(i[y]=f(t[y],n-1))}return i}var i;"object"==typeof r&&(n=r.depth,o=r.prototype,i=r.filter,r=r.circular);var c=[],l=[],p="undefined"!=typeof Buffer;return"undefined"==typeof r&&(r=!0),"undefined"==typeof n&&(n=1/0),f(t,n)}function t(e){return Object.prototype.toString.call(e)}function r(e){return"object"==typeof e&&"[object Date]"===t(e)}function n(e){return"object"==typeof e&&"[object Array]"===t(e)}function o(e){return"object"==typeof e&&"[object RegExp]"===t(e)}function u(e){var t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),t}return e.clonePrototype=function(e){if(null===e)return null;var t=function(){};return t.prototype=e,new t},e.__objToStr=t,e.__isDate=r,e.__isArray=n,e.__isRegExp=o,e.__getRegExpFlags=u,e}();"object"==typeof module&&module.exports&&(module.exports=clone);


},{}],183:[function(require,module,exports){
function isUndefinedOrNull(e){return null===e||void 0===e}function isBuffer(e){return e&&"object"==typeof e&&"number"==typeof e.length?"function"!=typeof e.copy||"function"!=typeof e.slice?!1:e.length>0&&"number"!=typeof e[0]?!1:!0:!1}function objEquiv(e,t,r){var n,i;if(isUndefinedOrNull(e)||isUndefinedOrNull(t))return!1;if(e.prototype!==t.prototype)return!1;if(isArguments(e))return isArguments(t)?(e=pSlice.call(e),t=pSlice.call(t),deepEqual(e,t,r)):!1;if(isBuffer(e)){if(!isBuffer(t))return!1;if(e.length!==t.length)return!1;for(n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}try{var u=objectKeys(e),o=objectKeys(t)}catch(f){return!1}if(u.length!=o.length)return!1;for(u.sort(),o.sort(),n=u.length-1;n>=0;n--)if(u[n]!=o[n])return!1;for(n=u.length-1;n>=0;n--)if(i=u[n],!deepEqual(e[i],t[i],r))return!1;return typeof e==typeof t}var pSlice=Array.prototype.slice,objectKeys=require("./lib/keys.js"),isArguments=require("./lib/is_arguments.js"),deepEqual=module.exports=function(e,t,r){return r||(r={}),e===t?!0:e instanceof Date&&t instanceof Date?e.getTime()===t.getTime():"object"!=typeof e&&"object"!=typeof t?r.strict?e===t:e==t:objEquiv(e,t,r)};


},{"./lib/is_arguments.js":184,"./lib/keys.js":185}],184:[function(require,module,exports){
function supported(t){return"[object Arguments]"==Object.prototype.toString.call(t)}function unsupported(t){return t&&"object"==typeof t&&"number"==typeof t.length&&Object.prototype.hasOwnProperty.call(t,"callee")&&!Object.prototype.propertyIsEnumerable.call(t,"callee")||!1}var supportsArgumentsClass="[object Arguments]"==function(){return Object.prototype.toString.call(arguments)}();exports=module.exports=supportsArgumentsClass?supported:unsupported,exports.supported=supported,exports.unsupported=unsupported;


},{}],185:[function(require,module,exports){
function shim(e){var s=[];for(var t in e)s.push(t);return s}exports=module.exports="function"==typeof Object.keys?Object.keys:shim,exports.shim=shim;


},{}],186:[function(require,module,exports){
var Enti=require("enti"),WhatChanged=require("what-changed"),firmer=require("./firmer"),createBinding=require("./binding"),makeFunctionEmitter=require("./makeFunctionEmitter"),is=require("./is");module.exports=function(e,t){function n(e){return arguments.length?a?n:Object.keys(u.update(e)).length?(n._destroyed||(n._value=e,r&&(r(e),n._value=r()),n.emit("change",n._value),n.update()),n):n:r&&r()||n._value}var r,i,a,u=new WhatChanged(e,t||"value type reference keys");return n._value=e,n._firm=1,makeFunctionEmitter(n),n.binding=function(e){return arguments.length?(is.binding(e)||(e=createBinding(e)),e===r?n:(r&&r.removeListener("change",n),r=e,i&&n.attach(i,n._firm),r.on("change",n),n.update(),n)):r},n.attach=function(e,t){return firmer(n,t)?n:(n._firm=t,e instanceof Enti&&(e=e._model),e instanceof Object||(e={}),r?(i=e,a=!0,r.attach(e,1),a=!1,n(r())):n.update(),n)},n.detach=function(e){return firmer(n,e)?n:(r&&(r.removeListener("change",n),r.detach(1),i=null),n.update(),n)},n.update=function(){return n._destroyed||n.emit("update",n._value),n},n.destroy=function(){return n._destroyed||(n._destroyed=!0,n.emit("destroy"),n.detach(),r&&r.destroy(!0)),n},n.addTo=function(e,t){return e[t]=n,n},n._fastn_property=!0,n};


},{"./binding":1,"./firmer":16,"./is":19,"./makeFunctionEmitter":21,"enti":26,"what-changed":181}],187:[function(require,module,exports){
var crel=require("crel"),EventEmitter=require("events").EventEmitter,is=require("./is");module.exports=function(e,t,n){var r=new EventEmitter;return r.text=t.property(""),r._updateText=function(e){r.element&&(r.element.textContent=e)},r.render=function(){r.element=document.createTextNode(""),r.emit("render")},r.text.on("update",function(e){r._updateText(e)}),r.on("update",r.text.update),r};


},{"./is":19,"crel":25,"events":188}],188:[function(require,module,exports){
function EventEmitter(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function isFunction(e){return"function"==typeof e}function isNumber(e){return"number"==typeof e}function isObject(e){return"object"==typeof e&&null!==e}function isUndefined(e){return void 0===e}module.exports=EventEmitter,EventEmitter.EventEmitter=EventEmitter,EventEmitter.prototype._events=void 0,EventEmitter.prototype._maxListeners=void 0,EventEmitter.defaultMaxListeners=10,EventEmitter.prototype.setMaxListeners=function(e){if(!isNumber(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},EventEmitter.prototype.emit=function(e){var t,n,s,i,r,o;if(this._events||(this._events={}),"error"===e&&(!this._events.error||isObject(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[e],isUndefined(n))return!1;if(isFunction(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:for(s=arguments.length,i=new Array(s-1),r=1;s>r;r++)i[r-1]=arguments[r];n.apply(this,i)}else if(isObject(n)){for(s=arguments.length,i=new Array(s-1),r=1;s>r;r++)i[r-1]=arguments[r];for(o=n.slice(),s=o.length,r=0;s>r;r++)o[r].apply(this,i)}return!0},EventEmitter.prototype.addListener=function(e,t){var n;if(!isFunction(t))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,isFunction(t.listener)?t.listener:t),this._events[e]?isObject(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,isObject(this._events[e])&&!this._events[e].warned){var n;n=isUndefined(this._maxListeners)?EventEmitter.defaultMaxListeners:this._maxListeners,n&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.once=function(e,t){function n(){this.removeListener(e,n),s||(s=!0,t.apply(this,arguments))}if(!isFunction(t))throw TypeError("listener must be a function");var s=!1;return n.listener=t,this.on(e,n),this},EventEmitter.prototype.removeListener=function(e,t){var n,s,i,r;if(!isFunction(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],i=n.length,s=-1,n===t||isFunction(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(isObject(n)){for(r=i;r-->0;)if(n[r]===t||n[r].listener&&n[r].listener===t){s=r;break}if(0>s)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(s,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},EventEmitter.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],isFunction(n))this.removeListener(e,n);else for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},EventEmitter.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?isFunction(this._events[e])?[this._events[e]]:this._events[e].slice():[]},EventEmitter.listenerCount=function(e,t){var n;return n=e._events&&e._events[t]?isFunction(e._events[t])?1:e._events[t].length:0};


},{}]},{},[7]);
