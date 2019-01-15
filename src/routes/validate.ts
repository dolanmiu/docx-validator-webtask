import { Express } from "express";
import * as multer from "multer";
import * as request from "request-promise";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export function validate(app: Express): void {
    app.post("/", upload.single("document"), (req, res) => {
        console.log(req.file.buffer);
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
                        value: req.file.buffer,
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
                const bodyString = body.toString("utf8");
                const hasFailed = bodyString.search("Word to PDF") > 0;

                if (hasFailed) {
                    res.status(400).send();
                } else {
                    res.status(200).send();
                }
            })
            .catch((e) => {
                console.log(e);
                res.status(400).send(e);
            });
    });
}
