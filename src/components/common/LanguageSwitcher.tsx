import { useLanguage } from '../../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-[#f2f2f2] rounded-lg p-1">
      <button
        onClick={() => setLanguage('de')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          language === 'de'
            ? 'bg-[#E30613] text-white'
            : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        DE
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          language === 'en'
            ? 'bg-[#E30613] text-white'
            : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        EN
      </button>
    </div>
  );
}
