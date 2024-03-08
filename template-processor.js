"use strict";

function TemplateProcessor (template) {
    this.template = template;
}

TemplateProcessor.prototype.fillIn = function (dictionary) {
    let res = this.template;

    const matchResult = res.match(/{{.*?}}/g);

    for (let i = 0; i < matchResult.length; i++) {
        const reg = new RegExp(matchResult[i]);
        const content = matchResult[i].slice(2, -2);

        const replacer =  content in dictionary ? dictionary[content] : '';  
        res = res.replace(reg, replacer);
    }

    return res;
};