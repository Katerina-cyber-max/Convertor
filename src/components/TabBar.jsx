const TABS = [
  { id: 'weight', label: '⚖️ WEIGHT' },
  { id: 'length', label: '📏 LENGTH' },
  { id: 'shopping', label: '🛍️ SHOPPING' },
  { id: 'temp', label: '🌡️ TEMP' },
]

export default function TabBar({ activeTab, onTabChange }) {
  return (
    <div className="flex gap-2 mb-7 flex-wrap">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`flex-1 min-w-[80px] py-3 px-4 rounded-2xl border-[3px] border-black text-xs font-bold uppercase transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer${activeTab === tab.id ? ' bg-black text-white scale-[1.02]' : ' bg-white text-black'}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
