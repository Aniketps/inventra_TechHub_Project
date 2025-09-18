const mail = require("nodemailer");
require("dotenv").config();

const myMail = mail.createTransport({
    service : "gmail",
    auth : {
        user : process.env.inventraSysMail,
        pass : process.env.inventraSysPass
    }
});

function sendMail(to, subject, html, file){
    return myMail.sendMail({
        from : `"Inventra "<${process.env.inventraSysMail}>`,
        to : to,
        subject : subject,
        html : html,
        attachments : file
    });
};

module.exports = sendMail;