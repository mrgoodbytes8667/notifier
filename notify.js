const notifier = require('node-notifier');

const argv = require('./util/yargs.js');

let params = {
    title: argv.getTitle(),
    message: argv.getMessage(),
    sound: argv.hasSound(), // Only Notification Center or Windows Toasters
    wait: false // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
};

if(argv.hasIcon()) {
    params['icon'] = argv.getIcon();
}

notifier.notify(
    params,
    function (err, response, metadata) {
        // Response is response from notification
        // Metadata contains activationType, activationAt, deliveredAt
    }
);

// notifier.on('click', function (notifierObject, options, event) {
//     // Triggers if `wait: true` and user clicks notification
// });
//
// notifier.on('timeout', function (notifierObject, options) {
//     // Triggers if `wait: true` and notification closes
// });