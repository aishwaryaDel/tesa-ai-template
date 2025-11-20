import { useState, useMemo } from 'react';
import { useCaseApi } from '../services/api';
import { Search, Home, Plus } from 'lucide-react';
import { UseCase, Department, UseCaseStatus } from '../types';
import UseCaseCard from '../components/domain/UseCaseCard';
import UseCaseDetailModal from '../components/domain/UseCaseDetailModal';
import NewUseCaseModal, { NewUseCaseData } from '../components/domain/NewUseCaseModal';
import Footer from '../components/layout/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/common/LanguageSwitcher';

interface UseCaseOverviewProps {
  useCases: UseCase[];
  onBackToHome: () => void;
  isLoading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
}

const departments: Array<'All' | Department> = [
  'All',
  'Marketing',
  'R&D',
  'Procurement',
  'IT',
  'HR',
  'Operations'
];

const statuses: Array<'All' | UseCaseStatus> = [
  'All',
  'Ideation',
  'Pre-Evaluation',
  'Evaluation',
  'PoC',
  'MVP',
  'Live',
  'Archived'
];

export default function UseCaseOverview({ useCases, onBackToHome, isLoading = false, error = null, onRefresh }: UseCaseOverviewProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<'All' | Department>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | UseCaseStatus>('All');
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [showNewUseCaseModal, setShowNewUseCaseModal] = useState(false);

  const filteredUseCases = useMemo(() => {
    return useCases.filter((useCase) => {
      const matchesSearch =
        searchQuery === '' ||
        useCase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        useCase.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        useCase.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDepartment =
        selectedDepartment === 'All' || useCase.department === selectedDepartment;

      const matchesStatus = selectedStatus === 'All' || useCase.status === selectedStatus;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [useCases, searchQuery, selectedDepartment, selectedStatus]);

  const relatedUseCases = useMemo(() => {
    if (!selectedUseCase) return [];
    return useCases.filter((uc) =>
      selectedUseCase.related_use_case_ids.includes(uc.id)
    );
  }, [selectedUseCase, useCases]);

  const handleRelatedClick = (id: string) => {
    const useCase = useCases.find((uc) => uc.id === id);
    if (useCase) {
      setSelectedUseCase(useCase);
    }
  };

  const handleNewUseCaseSubmit = async (data: NewUseCaseData) => {
    try {
      await useCaseApi.createUseCase(data);
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Failed to create use case:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-3 items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <img
                src="/image.png"
                alt="tesa logo"
                className="h-12 w-auto"
              />
              <button
                onClick={onBackToHome}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                <Home className="w-4 h-4" />
                <span className="hidden lg:inline">{t('overview.backToHome')}</span>
              </button>
            </div>
            <div className="flex justify-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {t('overview.title')}
              </h1>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowNewUseCaseModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-white bg-[#E30613] rounded-lg hover:bg-[#c00510] transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">{t('overview.newUseCase')}</span>
              </button>
              <LanguageSwitcher />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('overview.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-full lg:max-w-[640px] pl-10 pr-4 py-3 bg-[#f2f2f2] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E30613] transition-all duration-200"
              />
            </div>

            <div className="flex gap-4 flex-col sm:flex-row">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value as 'All' | Department)}
                className="px-4 py-3 bg-[#f2f2f2] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E30613] cursor-pointer transition-all duration-200"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'All' ? t('overview.allDepartments') : t(`department.${dept}`)}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as 'All' | UseCaseStatus)}
                className="px-4 py-3 bg-[#f2f2f2] border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E30613] cursor-pointer transition-all duration-200"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === 'All' ? t('overview.allStatuses') : t(`status.${status}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-red-800 font-medium">Error loading use cases</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Retry
              </button>
            )}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#E30613]"></div>
            <p className="mt-4 text-gray-600">Loading use cases...</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              {t('overview.showing')} {filteredUseCases.length} {t('overview.of')} {useCases.length} {t('overview.useCases')}
            </div>

            {filteredUseCases.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-500">{t('overview.noResults')}</p>
                <p className="text-gray-400 mt-2">{t('overview.tryAdjusting')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUseCases.map((useCase) => (
                  <UseCaseCard
                    key={useCase.id}
                    useCase={useCase}
                    onClick={() => setSelectedUseCase(useCase)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      {selectedUseCase && (
        <UseCaseDetailModal
          useCase={selectedUseCase}
          onClose={() => setSelectedUseCase(null)}
          relatedUseCases={relatedUseCases}
          onRelatedClick={handleRelatedClick}
        />
      )}

      {showNewUseCaseModal && (
        <NewUseCaseModal
          onClose={() => setShowNewUseCaseModal(false)}
          onSubmit={handleNewUseCaseSubmit}
        />
      )}
    </div>
  );
}
