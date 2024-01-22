/** @param {NS} ns */
export async function main(ns) {
    // Global list of all servers already searched
    const scanned = [];
    const path = [];

    // Define function to recursively find target
    function recursive_find(server, target, ns) {
        let children = ns.scan(server);
        scanned.push(server);
        let found = children.includes(target);

        // If found exit recursion loop
        if (found) {
            path.push(target);
            path.push(server);
            return 1;

        // Otherwise go deeper
        } else {
            for (let child of children) {
                if (!scanned.includes(child)) {
                    if (recursive_find(child, target, ns)) {
                        path.push(server);
                        return true;
                    }
                }
            }
        }
    }

    // Set constants
    const target = ns.args[0];
    const starting = ns.getHostname();

    // Start recursive find
    recursive_find(starting, target, ns);

    // Print path
    ns.tprint(path.reverse());
}