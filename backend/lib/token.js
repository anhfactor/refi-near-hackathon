
const fs = require('fs/promises')
const path = require('path')
const { getLogger } = require('./logger')

module.exports = async (config) => {

    const logger = getLogger(config)

    const dataDir = process.env.DATA_DIR || path.resolve(__dirname, '../data')
    await fs.mkdir(dataDir, { recursive: true })
    logger.info(`Storing files to ${dataDir}`)

    const tokensDir = path.resolve(dataDir, 'tokens')
    await fs.mkdir(tokensDir, { recursive: true })

    const getTokenFilePath = (tokenId) => path.resolve(tokensDir, `${tokenId}.json`)

    return {
        async list() {
            const files = await fs.readdir(tokensDir)
            return await Promise.all(files
                .filter(filepath => filepath.split(".").pop().toLocaleLowerCase() === "json")
                .map(f => `${tokensDir}/${f}`)
                .map(async (f) => JSON.parse((await fs.readFile(f)).toString())))
        },
        async get(tokenId) {
            const filePath = getTokenFilePath(tokenId)
            try {
                const raw = (await fs.readFile(filePath)).toString()
                return JSON.parse(raw)
            } catch (e) {
                logger.error(`Error loading token: ${e.stack}`)
                return {}
            }
        },
        async save(tokenId, tokenData) {
            const filePath = getTokenFilePath(tokenId)
            await fs.writeFile(filePath, JSON.stringify(tokenData, null, 2))
        },
        async edit(tokenId, ownerAddress, receiverAddress) {
            const filePath = getTokenFilePath(tokenId)
            const replace = require('replace-in-file')
            const options = {
                files: filePath,
                from: ownerAddress,
                to: receiverAddress,
            }
            const results = await replace(options)
            return results
        },
    }
}