// import * as Main from "./main.js";
// import {Model} from "./model.js";
export { applyTemplates };

function applyTemplates(targetid, templateid, data) {
    let target = document.getElementById(targetid);
  
    let template = Handlebars.compile(
      document.getElementById(templateid).textContent
    );
    
    target.innerHTML = template(data);
}