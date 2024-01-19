const { elasticClient } = require('../utils/elasticClient')

const getCityByBank = async (req, res) => {
    try {
        /* -----------Validations--------- */
        let { bankName } = req.body

        /* -----------Business Logic--------- */
        let getResult = await elasticClient.search({
            index: 'bankifsc',
            body: {
                query: {
                    bool: {
                        must: [
                            { term: { 'BANK': bankName } },
                        ]
                    }
                },
                aggs: {
                    distinctCities: {
                        terms: {
                            field: 'CENTRE',
                            size: 10000
                        }
                    }
                }
            }
        })
        if (getResult.hits.total.value === 0) {
            return res.status(400).json({ success: false, message: "No Bank Found" });
        }
        const distinctCities = getResult.aggregations.distinctCities.buckets.map(bucket => bucket.key)
        return res.status(200).json({ success: true, data: distinctCities });

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}

const getBranch = async (req, res) => {
    try {
        /* ----------------Validations------------ */
        let { bankName, cityName } = req.body

        /* --------------Business Logic------------ */
        let getResult = await elasticClient.search({
            index: 'bankifsc',
            body: {
                query: {
                    bool: {
                        must: [
                            { term: { 'BANK': bankName } },
                            { term: { 'CENTRE': cityName } },
                        ]
                    }
                },
                size: 5000
            }
        })
        return res.status(200).json({ success: true, data: getResult.hits.hits })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const getBankData = async (req, res) => {
    try {
        /* ----------------Validations------------ */
        let { bankName, cityName, branchName } = req.body

        /* --------------Business Logic------------ */
        let getResult = await elasticClient.search({
            index: 'bankifsc',
            body: {
                query: {
                    bool: {
                        must: [
                            { term: { 'BANK': bankName } },
                            { term: { 'CENTRE': cityName } },
                            { term: { 'BRANCH': branchName } },
                        ]
                    }
                },
                size: 1000
            }
        })
        return res.status(200).json({ success: true, data: getResult.hits.hits })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
module.exports = { getCityByBank, getBranch, getBankData }  