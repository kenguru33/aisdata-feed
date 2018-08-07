/**
 * @description Maritime Mobile Service Identity
 * @typedef {string} mmsi
 */

/**
 * @description Speed Over Ground
 * @typedef {number} sog
 */

/**
 * @description Course Over Ground
 * @typedef {number} cog
 */

/**
 * @description Decimal Degrees Latitude
 * @typedef {number} lat
 */

/**
 * @description Decimal Degrees Longitude
 * @typedef {number} lng
 */

/**
 * @description  UTC ime Stamp for the ais data
 * @typedef {Date} timeStamp
 */

/**
 * @description Latitude Degrees Minutes
 * @typedef {string} latDm
 */

/**
 * @description Longitude Degrees Minutes
 * @typedef {string} lngDm
 */

/**
  * @description Represents AisData object
  * @typedef {object} AisData
  * @property {mmsi}
  * @property {sog}
  * @property {cog}
  * @property {lat}
  * @property {lng}
  * @property {latDm}
  * @property {lngDm}
  * @property {timeStamp}
  */

/**
 * @description Represents ais-data-feed object
 * @typedef {object} AisDataFeed
 * @property {function(): void} start - start publishing data on feed
 * @property {function(): void} stop - stop publishing data on feed
 * @property {function(AisData): void} subscribe - subscribe to feed data
 */

/**
 * @description Represents logger object
 * @typedef {object} Logger
 * @property {function(message): void} log - log
 * @property {function(message): void} info - info level logging
 * @property {function(message): void} debug - debug level logging
 */
