const readline = require("readline")

const readlineOptions = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

readlineOptions.question("Choose server name: ", function(serverName) {
    console.log("You entered: " + serverName)
    readlineOptions.close()
})

readlineOptions.on("close", function() {
    process.exit(0)
})
