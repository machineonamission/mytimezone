function getTimeZone(zoneName = "long") {
    // set up formatter
    let formatter = new Intl.DateTimeFormat(undefined, {
        timeZoneName: zoneName
    });
    // run formatter on current date
    return formatter.formatToParts(Date.now())
        // extract the actual value from the formatter, only reliable way i can find to do this
        .find(formatted => formatted.type === "timeZoneName")['value'];
}

function getOffset(offset) {
    // let offset = new Date().getTimezoneOffset();
    let o = Math.abs(offset);
    return "GMT" + (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}

// set header to timezone
document.querySelector("#tzheader").innerHTML = Intl.DateTimeFormat().resolvedOptions().timeZone;
// add offset in mins
let offset = new Date().getTimezoneOffset();
document.querySelector("#tzbody").insertAdjacentHTML("beforeend",
    `<h4>You are <span class="h3 font-weight-bold" id="offset">
${offset === 0 ? "equal with" : (Math.abs(offset).toString() + " minutes " + (offset < 0 ? "ahead of" : "behind"))} GMT/UTC (${getOffset(offset)})</span></h4>`);
// add different formats of timezone
for (const zoneName of ['short', 'long', 'shortOffset', 'longOffset', 'shortGeneric', 'longGeneric']) {
    try {
        document.querySelector("#tzbody").insertAdjacentHTML("beforeend",
            `<h3><span class="h4">${zoneName}: </span><b>${getTimeZone(zoneName)}</b></h3>`);
    } catch (ex) {
        console.error(ex);
    }
}

