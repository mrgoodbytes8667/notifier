const fs = require('fs');

const argv = require('yargs')
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .option('message', {
        type: 'string',
        description: 'notification contents'
    })
    .option('title', {
        type: 'string',
        description: 'notification title'
    })
    .option('icon', {
        type: 'string',
        description: 'path to notification icon'
    })
    .option('sound', {
        type: 'boolean',
        description: 'Play a sound?'
    })
    .check((argv) => {
        if ((argv.message ?? '').trim() === '') {
            throw new Error('A message is required.');
        }
        const icon = (argv.icon ?? '').trim();
        if (icon != null) {
            fs.access(icon, fs.constants.F_OK, (err) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        console.error('Icon file does not exist or is not accessible.');
                        return false;
                    }
                    console.error(err);
                    return false;
                }
            })
        }
        return true;
    })
    .parse();

module.exports = {
    /**
     * @returns {string|null}
     */
    getMessage() {
        const message = (argv.message ?? '').trim();
        if(message === '') {
            return null;
        }
        return message;
    },

    /**
     * @returns {string|null}
     */
    getTitle() {
        const title = (argv.title ?? 'ps-notifier').trim();
        if(title === '') {
            return null;
        }
        return title;
    },

    /**
     * @returns {string|null}
     */
    getIcon() {
        const icon = (argv.icon ?? '').trim();
        if(icon === '') {
            return null;
        }
        return icon;
    },

    /**
     * @returns {boolean}
     */
    hasIcon() {
        return (argv.icon ?? '').trim() !== '';
    },

    /**
     * @returns {boolean}
     */
    hasSound() {
        return argv.sound ?? false;
    },

    /**
     * @returns {boolean}
     */
    isVerbose() {
        return argv.verbose ?? false;
    }
}