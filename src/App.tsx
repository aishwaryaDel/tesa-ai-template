import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import UseCaseOverview from './components/UseCaseOverview';
import { LanguageProvider } from './contexts/LanguageContext';
import { UseCase } from './types';
import { useCaseApi } from './services/api';

type Screen = 'landing' | 'overview';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUseCases = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await useCaseApi.getAllUseCases();
      setUseCases(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load use cases');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentScreen === 'overview') {
      fetchUseCases();
    }
  }, [currentScreen]);

  return (
    <LanguageProvider>
      {currentScreen === 'landing' ? (
        <LandingPage onStartJourney={() => setCurrentScreen('overview')} />
      ) : (
        <UseCaseOverview
          useCases={useCases}
          onBackToHome={() => setCurrentScreen('landing')}
          isLoading={isLoading}
          error={error}
          onRefresh={fetchUseCases}
        />
      )}
    </LanguageProvider>
  );
}

export default App;
