// tslint:disable:no-any
import "babel-polyfill";
import * as Nightmare from "nightmare";
const nightmare = new Nightmare({ show: false });

module.exports = (context, cb) => {
    nightmare
        .goto("https://duckduckgo.com")
        .type("#search_form_input_homepage", "github nightmare")
        .click("#search_button_homepage")
        .wait("#r1-0 a.result__a")
        .evaluate(() => (document.querySelector("#r1-0 a.result__a") as any).href)
        .end()
        .then((data) => {
            cb(null, { hello: data });
        })
        .catch((error) => {
            console.error("Search failed:", error);
        });
    // cb(null, { hello: "data" });

};
