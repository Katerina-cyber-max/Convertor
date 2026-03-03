import { useState } from 'react'
import TabBar from './components/TabBar'
import StandardConverter from './components/StandardConverter'
import ShoppingConverter from './components/ShoppingConverter'

export default function App() {
  const [activeTab, setActiveTab] = useState('weight')

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF69B4] via-[#FF6B6B] to-[#FFB347] flex flex-col items-center justify-center p-6 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-black text-center mb-8 uppercase tracking-widest">Simple to convert</h1>

      <div className="bg-white border-[3px] border-black rounded-3xl p-6 sm:p-7 md:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'shopping' ? (
          <ShoppingConverter />
        ) : (
          <StandardConverter key={activeTab} mode={activeTab} />
        )}
      </div>
    </div>
  )
}
