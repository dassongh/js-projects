parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"kjFT":[function(require,module,exports) {
const e=document.querySelector(".btn-add"),t=JSON.parse(localStorage.getItem("notes"));function a(){const e=document.querySelectorAll("textarea"),t=[];e.forEach(e=>t.push(e.value)),localStorage.setItem("notes",JSON.stringify(t))}function n(e=""){const t=document.createElement("div");t.classList.add("note");const n=`<div class="note-header">\n                    <button class="btn" data-edit><i class="fas fa-edit"></i></button>\n                    <button class="btn" data-delete><i class="fas fa-trash-alt"></i></button>\n                  </div>\n                  <div class="note-main ${e?"":"is-hidden"}">\n                  </div>\n                  <textarea class="${e?"is-hidden":""}">${e}</textarea>`;t.insertAdjacentHTML("afterbegin",n);const d={main:t.querySelector(".note-main"),textarea:t.querySelector("textarea"),editBtn:t.querySelector("[data-edit]"),deleteBtn:t.querySelector("[data-delete]")};d.main.textContent=d.textarea.value,d.editBtn.addEventListener("click",()=>{d.textarea.classList.toggle("is-hidden"),d.main.classList.toggle("is-hidden"),d.main.textContent=d.textarea.value}),d.deleteBtn.addEventListener("click",()=>{t.remove(),a()}),d.textarea.addEventListener("input",a),document.body.appendChild(t)}t&&t.forEach(e=>n(e)),e.addEventListener("click",()=>{n()});
},{}]},{},["kjFT"], null)
//# sourceMappingURL=/js-projects/notes.7cc3d44d.js.map