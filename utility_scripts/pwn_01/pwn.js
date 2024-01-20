/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];
    const host = ns.getHostname();

    if (ns.fileExists("BruteSSH.exe", host)) {
        ns.brutessh(target);
    }

    if (ns.fileExists("FTPCrack.exe", host)) {
        ns.ftpcrack(target);
    }

    if (ns.fileExists("relaySMTP.exe", host)) {
        ns.relaysmtp(target);
    }

    if (ns.fileExists("HTTPWorm.exe", host)) {
        ns.httpworm(target);
    }

    if (ns.fileExists("SQLInject.exe", host)) {
        ns.sqlinject(target);
    }

    ns.nuke(target);
}