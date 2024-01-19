/** @param {NS} ns */
export async function main(ns) {

    // Set constants
    const script = "basic_hack.js";
    const starting = ns.getHostname();
    const scram = ns.getScriptRam(script, starting)


    // Create array containing all server names
    let servers = [starting];
    let i = 0;
    while (i < servers.length) {
        let scan_server = servers[i];
        let scanned_servers = ns.scan(scan_server)

        let j=0;
        while (j < scanned_servers.length) {
            let server = scanned_servers[j];
            if (!servers.includes(server)) {
                servers.push(server)
            }
            j++;
        }
        i++;
    }


    // Itterate through servers updating and running basic_hack.js with max threads.
    i = 0;
    while (i < servers.length) {
        let server = servers[i];
        // Ensure code is only deployed to servers I own
        if (ns.hasRootAccess(server) & server != "home") {
            // Ensure code is only deployed to servers with RAM
            let seram = ns.getServerMaxRam(server);
            if (seram > 0) {
                let threads = Math.floor(seram/scram);

                ns.killall(server);                      // Kill scripts on server
                ns.scp(script, server, starting);        // Move new script to server
                ns.exec(script, server, threads, server) // Run script on server
            }
        }
        i++
    }
}