const nodemailer=require("nodemailer");

const transport =nodemailer.createTransport({
    service:"gmaill",
    auth:{
        user:"unknown123@gmail.com",

    }
})

module.exports= transport;