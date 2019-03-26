const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanHtmlPlugin = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist"
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    plugins: [
        new CleanHtmlPlugin(),
        new HtmlWebpackPlugin({
            title: "Similarity Detection",
            inject: false,
            template: require("html-webpack-template"),
            scripts: ["https://unpkg.com/react@16/umd/react.development.js", "https://unpkg.com/react-dom@16/umd/react-dom.development.js"],
            bodyHtmlSnippet: '<div id="example"></div>'
        })
    ],

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            { test: /\.css$/, use: ["style-loader", "css-loader"] }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        react: "React",
        "react-dom": "ReactDOM"
    }
};
