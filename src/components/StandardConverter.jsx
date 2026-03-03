import { useState, useMemo } from 'react'
import { UNITS, convert, getUnitLabel } from '../utils/conversions'

const DEFAULTS = {
  weight: { fromUnit: 'lbs', toUnit: 'kg', direction: 'us-to-eu' },
  length: { fromUnit: 'miles', toUnit: 'km', direction: 'us-to-eu' },
  temp:   { fromUnit: 'F',    toUnit: 'C',  direction: 'us-to-eu' },
}

export default function StandardConverter({ mode }) {
  const { fromUnit: defaultFrom, toUnit: defaultTo, direction: defaultDir } = DEFAULTS[mode]

  const [fromUnit, setFromUnit] = useState(defaultFrom)
  const [toUnit, setToUnit] = useState(defaultTo)
  const [direction, setDirection] = useState(defaultDir)
  const [inputValue, setInputValue] = useState('')

  const availableFromUnits = direction === 'us-to-eu' ? UNITS[mode].us : UNITS[mode].eu

  const result = useMemo(
    () => convert(mode, fromUnit, toUnit, inputValue),
    [mode, fromUnit, toUnit, inputValue],
  )

  const handleFromUnitChange = (e) => {
    setFromUnit(e.target.value)
  }

  const handleSwap = () => {
    const swapped = result !== null ? result.toFixed(2) : ''
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setDirection((d) => (d === 'us-to-eu' ? 'eu-to-us' : 'us-to-eu'))
    if (swapped) setInputValue(swapped)
  }

  const displayToUnit = mode === 'temp' ? `°${toUnit}` : toUnit

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="text-xs font-bold text-black mb-2 block uppercase tracking-wide">
          {getUnitLabel(fromUnit, direction === 'eu-to-us')}
        </label>
        <div className="flex gap-2 bg-white border-[3px] border-black rounded-2xl p-1 w-full">
          <input
            className="flex-1 border-none py-3.5 px-3.5 text-2xl sm:text-3xl font-bold text-black bg-transparent outline-none min-w-0"
            type="number"
            placeholder="0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <select
            className="border-none py-2.5 px-3.5 text-sm font-bold text-black bg-[#FFE88F] rounded-xl cursor-pointer outline-none"
            value={fromUnit}
            onChange={handleFromUnitChange}
          >
            {availableFromUnits.map((u) => (
              <option key={u} value={u}>
                {mode === 'temp' ? `°${u}` : u}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center items-center relative my-1">
        <span className="text-black">↓</span>
        <button
          className="absolute bg-[#FF69B4] border-[3px] border-black w-[50px] h-[50px] rounded-full cursor-pointer text-[22px] font-bold flex items-center justify-center active:rotate-180 active:scale-95 transition-transform duration-150"
          onClick={handleSwap}
          aria-label="Swap units"
        >
          ⇄
        </button>
      </div>

      <div>
        <label className="text-xs font-bold text-black mb-2 block uppercase tracking-wide">
          {getUnitLabel(toUnit, direction === 'us-to-eu')}
        </label>
        <div className="bg-[#B8E6B8] border-[3px] border-black rounded-full p-7 w-full text-center aspect-square flex flex-col items-center justify-center">
          <div className="text-4xl sm:text-5xl font-bold text-black mb-1.5 leading-none break-all">
            {result !== null ? result.toFixed(2) : '—'}
          </div>
          <div className="text-sm font-bold text-black uppercase">{displayToUnit}</div>
        </div>
      </div>
    </div>
  )
}
