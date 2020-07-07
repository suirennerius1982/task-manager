const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'
//'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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'suirennerius1982@gmail.com',
        subject: 'Welcome to Task Manager!!!',
        text: `Welcome to the app, ${name} lest me know how you get along with the app.`
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