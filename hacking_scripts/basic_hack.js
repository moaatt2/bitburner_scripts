/** @param {NS} ns */
export async function main(ns) {

    // set constant values
    const target = ns.args[0];
    const minsec = ns.getServerMinSecurityLevel(target);
    const maxmon = ns.getServerMaxMoney(target);

    let secthresh = minsec + 1.5;
    let monthresh = maxmon * .75;

    let sec;
    let mon;

    // Start main loop
    while (true) {
        sec = ns.getServerSecurityLevel(target);
        mon = ns.getServerMoneyAvailable(target);

        if (sec > secthresh) {        // Priority 1 - weaken security
            await ns.weaken(target);
        } else if (mon < monthresh) { // Priority 2 - grow money
            await ns.grow(target);
        } else {                      // last priority - take money
            await ns.hack(target);
        }
    }
}