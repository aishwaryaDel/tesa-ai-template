import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Department, UseCaseStatus } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface NewUseCaseModalProps {
  onClose: () => void;
  onSubmit: (data: NewUseCaseData) => void;
}

export interface NewUseCaseData {
  title: string;
  short_description: string;
  full_description: string;
  department: Department;
  status: UseCaseStatus;
  owner_name: string;
  owner_email: string;
  business_impact: string;
  technology_stack: string[];
  tags: string[];
  application_url: string;
  internal_links: {
    sharepoint?: string;
    confluence?: string;
    demo?: string;
    bits?: string;
  };
}

const departments: Department[] = ['Marketing', 'R&D', 'Procurement', 'IT', 'HR', 'Operations'];
const statuses: UseCaseStatus[] = ['Ideation', 'Pre-Evaluation', 'Evaluation', 'PoC', 'MVP', 'Live'];

export default function NewUseCaseModal({ onClose, onSubmit }: NewUseCaseModalProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState<NewUseCaseData>({
    title: '',
    short_description: '',
    full_description: '',
    department: 'IT',
    status: 'Ideation',
    owner_name: '',
    owner_email: '',
    business_impact: '',
    technology_stack: [],
    tags: [],
    application_url: '',
    internal_links: {}
  });

  const [techStackInput, setTechStackInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.title.trim() !== '' &&
               formData.short_description.trim() !== '' &&
               formData.full_description.trim() !== '';
      case 2:
        return true;
      case 3:
        return formData.owner_name.trim() !== '' &&
               formData.owner_email.trim() !== '' &&
               /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.owner_email);
      case 4:
        return true;
      default:
        return false;
    }
  };

  const addTechStack = () => {
    if (techStackInput.trim() && !formData.technology_stack.includes(techStackInput.trim())) {
      setFormData({
        ...formData,
        technology_stack: [...formData.technology_stack, techStackInput.trim()]
      });
      setTechStackInput('');
    }
  };

  const removeTechStack = (tech: string) => {
    setFormData({
      ...formData,
      technology_stack: formData.technology_stack.filter(t => t !== tech)
    });
  };

  const addTag = () => {
    if (tagsInput.trim() && !formData.tags.includes(tagsInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagsInput.trim()]
      });
      setTagsInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('newUseCase.title')}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  index + 1 <= currentStep ? 'bg-[#E30613]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {t('newUseCase.step')} {currentStep} {t('newUseCase.of')} {totalSteps}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {t('newUseCase.basicInfo')}
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('newUseCase.useCaseTitle')} <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={t('newUseCase.titlePlaceholder')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('newUseCase.shortDescription')} <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder={t('newUseCase.shortDescPlaceholder')}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('newUseCase.fullDescription')} <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={formData.full_description}
                  onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                  placeholder={t('newUseCase.fullDescPlaceholder')}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {t('newUseCase.classification')}
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('newUseCase.department')} <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value as Department })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {t(`department.${dept}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('newUseCase.status')} <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as UseCaseStatus })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {t(`status.${status}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('newUseCase.businessImpact')}
                </label>
                <textarea
                  value={formData.business_impact}
                  onChange={(e) => setFormData({ ...formData, business_impact: e.target.value })}
                  placeholder={t('newUseCase.businessImpactPlaceholder')}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {t('newUseCase.contactInfo')}
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('newUseCase.ownerName')} <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.owner_name}
                  onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                  placeholder={t('newUseCase.ownerNamePlaceholder')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('newUseCase.ownerEmail')} <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  value={formData.owner_email}
                  onChange={(e) => setFormData({ ...formData, owner_email: e.target.value })}
                  placeholder={t('newUseCase.ownerEmailPlaceholder')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {t('newUseCase.additionalInfo')}
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('newUseCase.technologyStack')}
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
                    placeholder={t('newUseCase.techStackPlaceholder')}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all"
                  />
                  <button
                    onClick={addTechStack}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {t('newUseCase.add')}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.technology_stack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tech}
                      <button
                        onClick={() => removeTechStack(tech)}
                        className="hover:text-blue-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('newUseCase.tags')}
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder={t('newUseCase.tagsPlaceholder')}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all"
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {t('newUseCase.add')}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('newUseCase.applicationUrl')}
                </label>
                <input
                  type="url"
                  value={formData.application_url}
                  onChange={(e) => setFormData({ ...formData, application_url: e.target.value })}
                  placeholder={t('newUseCase.applicationUrlPlaceholder')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('newUseCase.internalLinks')}
                </label>
                <div className="space-y-3">
                  <input
                    type="url"
                    value={formData.internal_links.sharepoint || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      internal_links: { ...formData.internal_links, sharepoint: e.target.value }
                    })}
                    placeholder={t('newUseCase.sharepointPlaceholder')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all"
                  />
                  <input
                    type="url"
                    value={formData.internal_links.confluence || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      internal_links: { ...formData.internal_links, confluence: e.target.value }
                    })}
                    placeholder={t('newUseCase.confluencePlaceholder')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all"
                  />
                  <input
                    type="url"
                    value={formData.internal_links.demo || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      internal_links: { ...formData.internal_links, demo: e.target.value }
                    })}
                    placeholder={t('newUseCase.demoPlaceholder')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all"
                  />
                  <input
                    type="url"
                    value={formData.internal_links.bits || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      internal_links: { ...formData.internal_links, bits: e.target.value }
                    })}
                    placeholder={t('newUseCase.bitsPlaceholder')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            {t('newUseCase.back')}
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                isStepValid()
                  ? 'bg-[#4A90E2] text-white hover:bg-[#3a7bc8]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {t('newUseCase.next')}
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#E30613] text-white rounded-lg hover:bg-[#c00510] transition-colors"
            >
              {t('newUseCase.submit')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
