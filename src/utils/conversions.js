export const UNITS = {
  weight: {
    us: ['lbs', 'oz'],
    eu: ['kg', 'g'],
    conversions: {
      'lbs-kg': 0.453592,
      'lbs-g': 453.592,
      'oz-kg': 0.0283495,
      'oz-g': 28.3495,
      'kg-lbs': 2.20462,
      'kg-oz': 35.274,
      'g-lbs': 0.00220462,
      'g-oz': 0.035274,
    },
  },
  length: {
    us: ['miles', 'ft', 'in'],
    eu: ['km', 'm', 'cm'],
    conversions: {
      'miles-km': 1.60934,
      'miles-m': 1609.34,
      'miles-cm': 160934,
      'ft-km': 0.0003048,
      'ft-m': 0.3048,
      'ft-cm': 30.48,
      'in-km': 0.0000254,
      'in-m': 0.0254,
      'in-cm': 2.54,
      'km-miles': 0.621371,
      'km-ft': 3280.84,
      'km-in': 39370.1,
      'm-miles': 0.000621371,
      'm-ft': 3.28084,
      'm-in': 39.3701,
      'cm-miles': 0.00000621371,
      'cm-ft': 0.0328084,
      'cm-in': 0.393701,
    },
  },
  temp: {
    us: ['F'],
    eu: ['C'],
    conversions: {
      'F-C': (val) => (val - 32) * 5 / 9,
      'C-F': (val) => (val * 9 / 5) + 32,
    },
  },
}

const UNIT_LABELS = {
  g: 'Grams',
  kg: 'Kilograms',
  oz: 'Ounces',
  lbs: 'Pounds',
  cm: 'Centimeters',
  m: 'Meters',
  km: 'Kilometers',
  in: 'Inches',
  ft: 'Feet',
  miles: 'Miles',
  F: 'Fahrenheit',
  C: 'Celsius',
}

export function getUnitLabel(unit, isEU) {
  return `${UNIT_LABELS[unit]} (${isEU ? 'EU' : 'US'})`
}

export function convert(mode, fromUnit, toUnit, value) {
  const val = parseFloat(value)
  if (isNaN(val)) return null

  const key = `${fromUnit}-${toUnit}`

  if (mode === 'temp') {
    const fn = UNITS.temp.conversions[key]
    return fn ? fn(val) : null
  }

  const factor = UNITS[mode]?.conversions[key]
  return factor != null ? val * factor : null
}
