var path = require("path");

var CopyWebpackPlugin = require("copy-webpack-plugin");
var nodeExternals = require("webpack-node-externals");

module.exports = (function ()
{
    var srcPath = path.resolve(__dirname, "src");
    var outputDirectoryName = "dist";

    return {
        entry : path.resolve(srcPath, "index.js"),
        target : "web",
        output : {
            filename : function (chunkData)
            {
                return chunkData.chunk.name === "main" ? "index.js" : "[name].js";
            },
            path : path.resolve(__dirname, outputDirectoryName),
            library : "vcomJsClient",
            libraryTarget : "umd",
            globalObject : "this"
        },
        plugins : [
            new CopyWebpackPlugin({
                patterns : [
                    {
                        context : "src",
                        from : "**/*.d.ts",
                        to : ""
                    }
                ]
            }),
        ],
        module : {

        },
        externals : [
            nodeExternals()
        ],
        resolve : {
            modules : ["node_modules"]
        }
    };
})();
