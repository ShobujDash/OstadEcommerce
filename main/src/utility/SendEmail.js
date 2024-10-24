const nodemailer = require('nodemailer')

const sendEmailUtilitiys = async (EmailTo,EmailText,EmailSubject) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port:465,
    auth: {
      user: 'shobujd6@gmail.com',
      pass:'unjyupsmcbyxzyau'
    }
  })
  

  const mailOptions = {
    from: "shobujd6@gmail.com",
    to: EmailTo,
    subject: EmailSubject,
    text:EmailText
  };

  return await transporter.sendMail(mailOptions)

}

module.exports = sendEmailUtilitiys;