// @ts-check

const sysinfo = require("systeminformation")

const { MMModule } = require("../utils.node");

module.exports = MMModule({

    name: "system-info",

    onSocket: {

        "_.info.fssize": (client, data) => {

            sysinfo.fsSize().then(d => {

                client.emit("info.fssize", d)
            })
        }
    }
})
