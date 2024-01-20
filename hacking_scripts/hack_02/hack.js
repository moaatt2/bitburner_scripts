/** @param {NS} ns */
export async function main(ns) {

    // Determine what action need done

    // Set constant values
    const target = ns.args[0];
    const minsec = ns.getServerMinSecurityLevel(target);
    const maxmon = ns.getServerMaxMoney(target);
    const host = ns.getHostname()

    // Set thresholds
    const secthresh = minsec + 2;


    while (true) {
        // Get host information
        let maxram = ns.getServerMaxRam(host)
        let useram = ns.getServerUsedRam(host)
        let freram = maxram-useram

        // Define variable for current values
        let sec = ns.getServerSecurityLevel(target);
        let mon = ns.getServerMoneyAvailable(target);


        // Start appropriate subscript
        let subp;
        let time;

        // weaken security
        if (sec > secthresh) {
            let scram = ns.getScriptRam("/hack/weaken.js", host);
            let threads = Math.floor(freram / scram);
            time = ns.getWeakenTime(target);
            subp = ns.run("/hack/weaken.js", threads, target);

        // grow money
        } else if (mon < maxmon) {
            let scram = ns.getScriptRam("/hack/grow.js", host);
            let threads = Math.floor(freram / scram);
            time = ns.getGrowTime(target);
            subp = ns.run("/hack/grow.js", threads, target);

        // hack target
        } else {
            let scram = ns.getScriptRam("/hack/hack.js", host);
            let maxthreads = Math.floor(freram / scram);
            let hlfthreads = Math.floor(ns.hackAnalyzeThreads(target, maxmon*(.88)));
            let threads = Math.min(maxthreads, hlfthreads);
            time = ns.getHackTime(target);
            subp = ns.run("/hack/hack.js", threads, target);
        }

        // Wait for subscript to finish
        await ns.sleep(time)
        while (ns.isRunning(subp)) {
            await ns.sleep(1000);
        }
    }
}