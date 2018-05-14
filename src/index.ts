import "babel-polyfill";

import * as request from "request-promise";

module.exports = (context, cb) => {
    const data = context.data || "";

    request
        .post({
            url: "http://mirror1.convertonlinefree.com",
            encoding: null,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.94 Safari/537.36",
            },
            formData: {
                __EVENTTARGET: "",
                __EVENTARGUMENT: "",
                __VIEWSTATE: "",
                ctl00$MainContent$fu: {
                    value: data,
                    options: {
                        filename: "output.docx",
                        contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    },
                },
                ctl00$MainContent$btnConvert: "Convert",
                ctl00$MainContent$fuZip: "",
            },
        })
        .then((body) => {
            cb(null, { valid: body });
        })
        .catch(() => {
            cb(null, { valid: false });
        });
};
