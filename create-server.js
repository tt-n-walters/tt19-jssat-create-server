const readline = require("readline")
const fs = require("fs")


const readlineOptions = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

readlineOptions.question("Choose server name: ", function(serverName) {
    console.log("You entered: " + serverName)

    readlineOptions.question("Choose a server port: ", function(serverPort) {
        console.log("Server port: " + serverPort)

        createServerFolder(serverName, callback)

        function callback() {
            readlineOptions.close()
        }
    })
})

readlineOptions.on("close", function(params) {
    process.exit(0)
})


function createServerFolder(serverName, callback) {
    fs.mkdir(serverName, function(error) {
        if (error) {
            console.log("Failed to create folder.")
        } else {

            fs.writeFile(serverName + "/index.js", "", function(error) {
                if (error) {
                    console.log("Failed to create index.js")
                }
                callback()
            })
        }
    })
}

function createProxy(serverName, serverPort) {

}

function updateConfig(serverName) {

}

