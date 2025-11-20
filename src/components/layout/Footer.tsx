import { useLanguage } from '../../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#f5f5f5] border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">{t('footer.about')}</h3>
            <a
              href="#"
              className="text-gray-600 hover:text-[#E30613] transition-colors duration-200"
            >
              {t('footer.aiGovernance')}
            </a>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">{t('footer.contribution')}</h3>
            <a
              href="#"
              className="text-gray-600 hover:text-[#E30613] transition-colors duration-200"
            >
              {t('footer.howToSubmit')}
            </a>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">{t('footer.support')}</h3>
            <a
              href="mailto:ai-transformation@tesa.com"
              className="text-gray-600 hover:text-[#E30613] transition-colors duration-200"
            >
              {t('footer.contactTeam')}
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-300 text-center text-sm text-gray-500">
          {t('footer.internalUse')}
        </div>
      </div>
    </footer>
  );
}
