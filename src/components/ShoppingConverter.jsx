import { useState, useMemo } from 'react'

export default function ShoppingConverter() {
  const [priceInput, setPriceInput] = useState('')

  const result = useMemo(() => {
    const val = parseFloat(priceInput)
    if (isNaN(val)) return null
    return val * 2.20462
  }, [priceInput])

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="text-xs font-bold text-black mb-2 block uppercase tracking-wide">Price per pound (USD)</label>
        <div className="flex gap-2 bg-white border-[3px] border-black rounded-2xl p-1 w-full">
          <input
            className="flex-1 border-none py-3.5 px-3.5 text-2xl sm:text-3xl font-bold text-black bg-transparent outline-none min-w-0"
            type="number"
            placeholder="5.99"
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
            step="0.01"
          />
          <span className="border-none py-2.5 px-3.5 text-sm font-bold text-black bg-[#FFE88F] rounded-xl flex items-center">$/lb</span>
        </div>
      </div>

      <div className="flex justify-center items-center my-1">
        <span className="text-black">↓</span>
      </div>

      <div>
        <label className="text-xs font-bold text-black mb-2 block uppercase tracking-wide">Price per kilogram (USD)</label>
        <div className="bg-[#B8E6B8] border-[3px] border-black rounded-2xl p-5 text-center">
          <div className="text-3xl sm:text-4xl font-bold text-black mb-1">
            {result !== null ? `$${result.toFixed(2)}` : '—'}
          </div>
          <div className="text-sm font-bold text-black uppercase">$/kg</div>
        </div>
      </div>
    </div>
  )
}
