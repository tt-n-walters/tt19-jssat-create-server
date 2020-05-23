const readline = require("readline")

const readlineOptions = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

readlineOptions.question("Choose server name: ", function(serverName) {
    console.log("You entered: " + serverName)

    readlineOptions.question("Choose a server port: ", function(serverPort) {
        console.log("Server port: " + serverPort)
        readlineOptions.close()
    })
})



readlineOptions.on("close", function() {
    process.exit(0)
})
