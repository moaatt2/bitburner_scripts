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

        // Priority 1 - weaken security
        if (sec > secthresh) {
            await ns.weaken(target);
        }

        // Priority 2 - grow money
        if (mon < monthresh) {
            await ns.grow(target);
        }

        // Last Priority - Hack
        await ns.hack(target);
    }
}