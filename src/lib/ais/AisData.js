const debug = require('debug')('AisData')
const formatcoords = require('formatcoords')
const Joi = require('joi')
const schema = Joi.object().keys({
  mmsi: Joi.string().regex(/^[0-9]*$/).length(9).required(),
  cog: Joi.number().min(0).max(359),
  sog: Joi.number().min(0),
  lat: Joi.number().min(-90).max(90).required(),
  lng: Joi.number().min(-180).max(180).required(),
  timeStamp: Joi.date().timestamp('javascript').required()
})

/**
 * Re
 * @param data
 * @returns {Readonly<AisData>}
 * @constructor
 */
const AisData = data => {
  const {error, value} = validate(data)
  if (error) {
    debug(`AisData is not valid. ${error.message}`)
    return undefined
  }

  return Object.freeze({
    ...{
      id: `${data.mmsi}${data.timeStamp}`
    },
    ...value,
    ...{
      latDm: formatcoords(value.lat, value.lng).format('DDm', {latLonSeparator: ','}).split(',')[0],
      lngDm: formatcoords(value.lat, value.lng).format('DDm', {latLonSeparator: ','}).split(',')[1]
    }
  })
}

const validate = aisData => {
  return Joi.validate(aisData, schema)
}
module.exports = AisData

// latDm: formatcoords(lat, lng).format('DDm', {latLonSeparator: ','}).split(',')[0],
// lngDm: formatcoords(lat, lng).format('DDm', {latLonSeparator: ','}).split(',')[1]
