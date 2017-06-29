module.exports = function(telegram, slack) {
  var slackBot = slack.spawn({ 
     incoming_webhook: {
       url: process.env.slack_webhook_url
  }
})
 telegram.on('message_received', function(bot, message) {
   console.log(message)
   var name = message.profile.fn + message.profile.ln
   name = name.toLowerCase() 
   var slack_message = {
     // text: '',
      "attachments": [
        {
            "fallback": "Required plain-text summary of the attachment.",
            
            // "author_name": message.profile.fn + message.profile.ln,
            "title": name,
            text: message.text,
        }
    ]
   }
   // console.log(slack_message)
   
   
   slackBot.sendWebhook(slack_message, function(err, res) {
     if (err) console.log('Uh oh!\n', err)
   })
 })
  
  
  slack.hears('(.*)', 'message_received', function(bot, message) {
    console.log('Slack ambient!')
  })
}