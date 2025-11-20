import { X } from 'lucide-react';
import { UseCase } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface UseCaseDetailModalProps {
  useCase: UseCase;
  onClose: () => void;
  relatedUseCases: UseCase[];
  onRelatedClick: (id: string) => void;
}

const statusColors: Record<string, string> = {
  Live: 'bg-green-600',
  MVP: 'bg-blue-600',
  PoC: 'bg-orange-500',
  Evaluation: 'bg-yellow-600',
  'Pre-Evaluation': 'bg-purple-600',
  Ideation: 'bg-gray-500',
  Archived: 'bg-gray-400'
};

const stages = ['Ideation', 'Pre-Evaluation', 'Evaluation', 'PoC', 'MVP', 'Live', 'Archived'];

const defaultImages: Record<string, string> = {
  Marketing: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
  'R&D': 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800',
  Procurement: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=800',
  IT: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
  HR: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800',
  Operations: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800'
};

export default function UseCaseDetailModal({
  useCase,
  onClose,
  relatedUseCases,
  onRelatedClick
}: UseCaseDetailModalProps) {
  const { t } = useLanguage();
  const imageUrl = useCase.image_url || defaultImages[useCase.department];
  const statusColor = statusColors[useCase.status] || 'bg-gray-500';
  const currentStageIndex = stages.indexOf(useCase.status);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          <div className="relative h-[200px] w-full overflow-hidden rounded-t-lg">
            <img
              src={imageUrl}
              alt={useCase.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-4xl font-bold">
                {t(`department.${useCase.department}`)}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {useCase.title}
            </h1>
            <div className="flex items-center gap-3">
              <span
                className={`${statusColor} text-white px-3 py-1 rounded-full text-sm font-medium`}
              >
                {t(`status.${useCase.status}`)}
              </span>
              <span className="text-gray-600 font-medium">{t(`department.${useCase.department}`)}</span>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">{t('modal.description')}</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {useCase.full_description}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">{t('modal.ownerDetails')}</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900 font-medium">{useCase.owner_name}</p>
                <p className="text-gray-600">{t(`department.${useCase.department}`)}</p>
                <a
                  href={`mailto:${useCase.owner_email}`}
                  className="text-[#E30613] hover:underline"
                >
                  {useCase.owner_email}
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{t('modal.useCaseStage')}</h2>
              <div className="relative">
                <div className="flex justify-between mb-2">
                  {stages.map((stage, index) => (
                    <div
                      key={stage}
                      className={`flex-1 text-center ${
                        index <= currentStageIndex
                          ? 'text-[#E30613] font-medium'
                          : 'text-gray-400'
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full mx-auto mb-1 ${
                          index <= currentStageIndex ? 'bg-[#E30613]' : 'bg-gray-300'
                        }`}
                      />
                      <span className="text-xs hidden sm:inline">{t(`status.${stage}`)}</span>
                    </div>
                  ))}
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E30613] transition-all duration-500"
                    style={{
                      width: `${((currentStageIndex + 1) / stages.length) * 100}%`
                    }}
                  />
                </div>
              </div>
            </section>

            {useCase.business_impact && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-2">{t('modal.businessImpact')}</h2>
                <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  {useCase.business_impact}
                </p>
              </section>
            )}

            {useCase.technology_stack.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-2">{t('modal.technologyStack')}</h2>
                <div className="flex flex-wrap gap-2">
                  {useCase.technology_stack.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {Object.keys(useCase.internal_links).length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-2">{t('modal.internalLinks')}</h2>
                <div className="space-y-2">
                  {useCase.internal_links.sharepoint && (
                    <a
                      href={useCase.internal_links.sharepoint}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[#E30613] hover:underline"
                    >
                      {t('modal.sharepoint')}
                    </a>
                  )}
                  {useCase.internal_links.confluence && (
                    <a
                      href={useCase.internal_links.confluence}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[#E30613] hover:underline"
                    >
                      {t('modal.confluence')}
                    </a>
                  )}
                  {useCase.internal_links.demo && (
                    <a
                      href={useCase.internal_links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[#E30613] hover:underline"
                    >
                      {t('modal.demo')}
                    </a>
                  )}
                </div>
              </section>
            )}

            {useCase.internal_links.bits && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-2">{t('modal.rolesResponsibilities')}</h2>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <a
                    href={useCase.internal_links.bits}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#E30613] hover:underline font-medium"
                  >
                    {t('modal.requestRoles')}
                  </a>
                </div>
              </section>
            )}

            {relatedUseCases.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-3">{t('modal.relatedUseCases')}</h2>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {relatedUseCases.map((related) => (
                    <div
                      key={related.id}
                      onClick={() => onRelatedClick(related.id)}
                      className="flex-shrink-0 w-64 bg-gray-50 rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow duration-200"
                    >
                      <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {related.short_description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4">
          <button
            onClick={() => {
              if (useCase.application_url) {
                window.open(useCase.application_url, '_blank');
              }
            }}
            disabled={!useCase.application_url}
            className={`w-full px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              useCase.application_url
                ? 'bg-[#E30613] text-white hover:bg-[#c00510]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {t('modal.launchApplication')}
          </button>
        </div>
      </div>
    </div>
  );
}
