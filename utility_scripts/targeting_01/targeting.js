/** @param {NS} ns */
export async function main(ns) {

    // Set constants
    const starting = ns.getHostname();
    const targets = Number(ns.args[0]);


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
    let mon = [];
    let ops = [];
    for (let server of servers) {
        if (ns.hasRootAccess(server) & server != "home") {
            mon.push(ns.getServerMaxMoney(server));
            ops.push(server);
        }
    }

    // Find largest value servers
    for (let j=1; j <= Math.min(targets, ops.length); j++) {
        // Find index of math in special list
        let max = Math.max(...mon);
        let ind = mon.indexOf(max);
        let ser = ops[ind];

        // Remove found item from list
        ops.splice(ind, 1);
        mon.splice(ind, 1);

        // print out data
        ns.tprint("Option "+j+": "+ser+" at "+max)
    }
}