const readline = require("readline")
const fs = require("fs")
const ecosystem = require("./ecosystem.config.js")


// Setup the readline module so it knows where to read and write to
const readlineOptions = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Ask questions for user input
readlineOptions.question("Choose server name: ", function(serverName) {
    console.log("You entered: " + serverName)

    readlineOptions.question("Choose a server port: ", function(serverPort) {
        console.log("Server port: " + serverPort)

        // Run our main functions
        createServerFolder(serverName, callback)
        createProxy(serverName, serverPort, callback)
        updateConfig(serverName)
        
        // Create a callback that will end the program
        function callback() {
            readlineOptions.close()
        }
    })
})

// End the program once where are finished
readlineOptions.on("close", function(params) {
    process.exit(0)
})


function createServerFolder(serverName, callback) {
    // Create the folder
    fs.mkdir(serverName, function(error) {
        // Check for any errors
        if (error) {
            console.log("Failed to create folder.")
        } else {

            // Create the javascript file
            fs.writeFile(serverName + "/index.js", "", function(error) {
                if (error) {
                    console.log("Failed to create index.js")
                }
                
            })
        }
    })
}

function createProxy(serverName, serverPort, callback) {
    // Define proxy file and folder locations
    let folderLocation = "../public_html/" + serverName
    let fileLocation = folderLocation + "/.htaccess"

    // Create proxy code with the correct port number
    let htaccess = `<IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteCond %{SERVER_PORT} !^${serverPort}$
        RewriteRule ^(.*) http://%{SERVER_NAME}:${serverPort}/$1 [P]
    </IfModule>`

    // Create proxy folder in public_html
    fs.mkdir(folderLocation, function(error) {
        if (error) {
            console.log("Failed to create proxy folder.")
        } else {
            // Folder created successfully
            fs.writeFile(fileLocation, htaccess, function(error) {
                if (error) {
                    console.log("Failed to create htaccess proxy.")
                }
                callback()
            })
        }
    })
}

function updateConfig(serverName) {
    // Check the current servers for conflicts
    let apps = ecosystem.apps
    for (let app of apps) {
        if (app.name == serverName) {
            console.log("A server with that name already exists!")
            process.exit()
        }
    }

    // Add the new server configuration
    let newServer = {
        name: serverName,
        script: serverName + "/index.js",
        watch: serverName + "/index.js"
    }
    apps.push(newServer)

    console.log(ecosystem)

    // Write the configuration to the ecosystem file

}

