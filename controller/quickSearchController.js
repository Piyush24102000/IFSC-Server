const { elasticClient } = require('../utils/elasticClient')

const searchBank = async (req, res) => {
    try {
        /* -------------Validations------------- */
        let { bankName, branchName, cityName } = req.body

        /* -------------Business Logic------------ */
        let query = {
            bool: {
                must: [
                    { wildcard: { 'BANK': `*${bankName}*` } },
                    {
                        bool: {
                            should: [
                                { wildcard: { 'BRANCH': `*${branchName}*` } },
                                { wildcard: { 'CENTRE': `*${cityName}*` } }
                            ]
                        }
                    }
                ]
            }
        }
        let getResult = await elasticClient.search({
            index: 'bankifsc',
            body: {
                query: query,
                size: 10000
            }
        });

        return res.status(200).json({ success: true, data: getResult.hits.hits })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
module.exports = { searchBank }