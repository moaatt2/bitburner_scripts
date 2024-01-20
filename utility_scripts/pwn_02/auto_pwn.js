/** @param {NS} ns */
export async function main(ns) {

    // Set Constants
    const host = ns.getHostname();
    const faction_servers = ["CSEC", "avmnite-02h", "I.I.I.I", "run4theh111s"];

    // Create array containing all server names
    let servers = [host];
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


    // Start Primary Loop
    while (true) {
        // Set varable to determine if any more targets exist
        let targets_exist = false;

        // Get Current Player Hacking Level
        let ph = ns.getHackingLevel();

        // Determine how many port opening functions I have access to
        let port_opens = 0
        if (ns.fileExists("BruteSSH.exe", host)) {port_opens++;}
        if (ns.fileExists("FTPCrack.exe", host)) {port_opens++;}
        if (ns.fileExists("relaySMTP.exe", host)) {port_opens++;}
        if (ns.fileExists("HTTPWorm.exe", host)) {port_opens++;}
        if (ns.fileExists("SQLInject.exe", host)) {port_opens++;}

        // Itterate over all servers without backdoor access
        for (let server of servers) {
            if (!ns.hasRootAccess(server)) {
                // Determine if I can pwn the server
                let sh = ns.getServerRequiredHackingLevel(server);
                let sp = ns.getServerNumPortsRequired(server);
                let can_pwn = (sh < ph) & (sp <= port_opens);

                // If sever can be pwnd, do so and inform user
                if (can_pwn) {
                    ns.run('pwn.js', 1, server);
                    await ns.sleep(1000);

                    // Determine message to send
                    let is_faction_server = faction_servers.includes(server);
                    if (is_faction_server) {
                        ns.tprint('Pwnd Faction Server: '+server);
                    } else {
                        ns.tprint('Pwnd: '+server);
                    }

                // Otherwise note that 
                } else {
                    targets_exist = true;
                }
            }
        }

        // If no targets exist break the loop
        if (!targets_exist) {
            break;
        }

        // Wait one minute before restarting
        await ns.sleep(60*1000)
    }
}