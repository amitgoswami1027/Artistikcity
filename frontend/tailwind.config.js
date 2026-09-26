const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: [
        '../src/main/resources/templates/**/*.mustache',
        './resources/js/**/*.js',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
