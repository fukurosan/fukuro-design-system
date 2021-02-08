module.exports = {
    presets: [
        "@babel/preset-typescript",
        [
            "@babel/preset-env",
            {
                modules: false,
                targets: {
                    ie: "11"
                },
                useBuiltIns: "usage",
                corejs: 3
            }
        ]
    ],
    plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        "@babel/plugin-proposal-class-properties"
    ]
}