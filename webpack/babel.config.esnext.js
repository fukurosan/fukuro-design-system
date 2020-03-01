module.exports = {
    presets: [
        "@babel/preset-typescript",
        [
            "@babel/preset-env",
            {
                targets: {
                    esmodules: true
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