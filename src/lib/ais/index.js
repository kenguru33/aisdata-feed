const AisDataFeed = require('./AisDataFeed')
const AisData = require('./AisData')

/**
 * @namespace
 * @type {{ais-data-feed: AisDataFeed, AisData: AisData}}
 */
const ais = {
  AisDataFeed,
  AisData
}
module.exports = ais
