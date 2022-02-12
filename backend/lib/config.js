
const fs = require('fs/promises')
const path = require('path')
const dotenv = require('dotenv')

let dotEnvConfig = null

const exists = async (filepath) => {
    try {
        await fs.access(filepath)
    } catch (e) {
        return false
    }
    return true
}

module.exports = {
    async getConfig(reload = false) {

        if (!reload && dotEnvConfig) {
            return dotEnvConfig
        }

        const envPath = process.env.ENV_PATH || path.resolve(__dirname, '../.env')
        if (!await exists(envPath)) {
            console.error(`.env file not found. See .env.example to create one`)
            dotEnvConfig = {}
        } else {
            dotEnvConfig = dotenv.parse(await fs.readFile(envPath))
        }

        return dotEnvConfig
    }
}

