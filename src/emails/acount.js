const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: process.env.SENDGRID_EMAIL_FROM,
        subject: 'Welcome to Task Manager!!!',
        text: `Welcome to the app, ${name} let me know how you get along with the app.`
    })
}

const cancelSubcription = (email, name) => {
    sgMail.send({
        to: email,
        from: 'suirennerius1982@gmail.com',
        subject: 'Why did you cancel the subcription. Please, should be comment to respect?',
        text: `Up ${name}, we will desire you come back someday!!! You are welcome!!!`
    })
}

module.exports = {
    sendWelcomeEmail,
    cancelSubcription
}
/* sgMail.send({
    to: 'digitalbuildonline@gmail.com',
    from: 'suirennerius1982@gmail.com',
    subject: 'This is my first creation! :)',
    text: 'I hope this one actually get you'
}) */