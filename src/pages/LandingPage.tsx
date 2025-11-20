import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/common/LanguageSwitcher';

interface LandingPageProps {
  onStartJourney: () => void;
}

export default function LandingPage({ onStartJourney }: LandingPageProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <header className="px-8 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <img
            src="/image.png"
            alt="tesa logo"
            className="h-12 w-auto"
          />
          <LanguageSwitcher />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t('landing.title')}
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-slate-300 mb-8">
            {t('landing.subtitle')}
          </h2>
          <button
            onClick={onStartJourney}
            className="bg-[#E30613] text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-[#c00510] transition-all duration-200 hover:shadow-lg transform hover:scale-105"
          >
            {t('landing.cta')}
          </button>
        </div>
      </main>
    </div>
  );
}
