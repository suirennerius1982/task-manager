const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'
//'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'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to: 'digitalbuildonline@gmail.com',
    from: 'suirennerius1982@gmail.com',
    subject: 'This is my first creation! :)',
    text: 'I hope this one actually get you'
})