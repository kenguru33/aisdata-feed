const debug = require('debug')('AisDataFeed')
const AisData = require('./AisData')
const EventEmitter = require('events').EventEmitter

/**
 * @description Emits ais data objects on intervals
 * @param {object} object
 * @param {function():Promise<AisData[]>} object.fetch - fetch function interface
 * @param {number} interval - object.interval which fetch function should be run
 * @param {Logger} logger
 * @param {string} name - feed name
 * @returns {AisDataFeed}
 * @constructor
 */
const AisDataFeed = ({fetch, interval, logger, name}) => {
  let emittedAisData = []
  const eventEmitter = new EventEmitter()
  let id

  const isEmitted = id => {
    return emittedAisData.find(item => item.id === id)
  }

  const emitAisData = aisData => {
    eventEmitter.emit('aisdata', aisData)
    emittedAisData = emittedAisData.filter(item => item.mmsi !== aisData.mmsi)
    emittedAisData.push(aisData)
  }

  return {
    start: () => {
      debug(`Starting feed ${name}`)
      id = setInterval(() => {
        fetch()
          .then(dataArray => {
            if (Array.isArray(dataArray)) {
              debug('Received AisData items:', dataArray.length)
              dataArray.map(data => {
                const aisData = AisData(data)
                if (!aisData) return
                if (isEmitted(aisData.id)) return
                debug(`New AisData detected. Emitting id = ${aisData.id}`)
                emitAisData(aisData)
              })
            } else {
              this.stop(id)
              throw new TypeError(`TypeError: Return type from fetch must be an Array of AisData. Received a ${typeof dataArray}`)
            }
          })
      }, interval)
    },
    stop: () => {
      clearInterval(id)
      debug(`Feed ${name} stopped`)
    },
    subscribe: listener => {
      eventEmitter.on('aisdata', listener)
    }
  }
}

module.exports = AisDataFeed
