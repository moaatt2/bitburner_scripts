/** @param {NS} ns */
export async function main(ns) {

    while (true) {
        // Get number of sleeves you have
        let num_sleeves = ns.sleeve.getNumSleeves();

        for (let i=0; i<num_sleeves; i++) {
            let sleeve = ns.sleeve.getSleeve(i);

            if (sleeve.sync < 100) {
                ns.sleeve.setToSynchronize(i);
            } else if (sleeve.shock > 0) {
                ns.sleeve.setToShockRecovery(i);
            } else {
                // Figure this out later
            }
        }

        await ns.sleep(60 * 1000)
    }
}