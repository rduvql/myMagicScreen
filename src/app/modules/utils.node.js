// @ts-check

const SocketIO = require("socket.io");

/**
 * Helper function to create a node Module to interact with client module.
 *
 * @param { { name: string, onSocket: {[x: string]: (client: SocketIO.Socket, data: any) => void} } }
 */
module.exports.MMModule = ({name, onSocket}) => { return {
        name,
        onSocket
    }
}

