import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'landing.title': 'Welcome to the Tesa AI Hub',
    'landing.subtitle': 'Discover how AI is transforming how we work.',
    'landing.cta': 'Start your AI Journey',
    'overview.title': 'AI Hub',
    'overview.backToHome': 'Back to Home',
    'overview.newUseCase': 'New Use Case',
    'overview.search': 'Search use cases…',
    'overview.allDepartments': 'All Departments',
    'overview.allStatuses': 'All Statuses',
    'overview.showing': 'Showing',
    'overview.of': 'of',
    'overview.useCases': 'use cases',
    'overview.noResults': 'No use cases found matching your criteria.',
    'overview.tryAdjusting': 'Try adjusting your search or filters.',
    'modal.description': 'Description',
    'modal.ownerDetails': 'Owner Details',
    'modal.useCaseStage': 'Use Case Stage',
    'modal.businessImpact': 'Business Impact',
    'modal.technologyStack': 'Technology Stack',
    'modal.internalLinks': 'Internal Links',
    'modal.rolesResponsibilities': 'Roles and Responsibilities (BITS)',
    'modal.requestRoles': 'Request Roles in BITS →',
    'modal.relatedUseCases': 'Related Use Cases',
    'modal.launchApplication': 'Launch Application',
    'modal.sharepoint': 'SharePoint Documentation →',
    'modal.confluence': 'Confluence Page →',
    'modal.demo': 'Demo Video →',
    'footer.about': 'About this Portal',
    'footer.aiGovernance': 'AI Governance',
    'footer.contribution': 'Use Case Contribution',
    'footer.howToSubmit': 'How to submit a new Use Case',
    'footer.support': 'Support',
    'footer.contactTeam': 'Contact AI Transformation Team',
    'footer.internalUse': 'Internal use only – Property of tesa SE',
    'department.Marketing': 'Marketing',
    'department.R&D': 'R&D',
    'department.Procurement': 'Procurement',
    'department.IT': 'IT',
    'department.HR': 'HR',
    'department.Operations': 'Operations',
    'status.Ideation': 'Ideation',
    'status.Pre-Evaluation': 'Pre-Evaluation',
    'status.Evaluation': 'Evaluation',
    'status.PoC': 'PoC',
    'status.MVP': 'MVP',
    'status.Live': 'Live',
    'status.Archived': 'Archived',
    'newUseCase.title': 'Create New Use Case',
    'newUseCase.step': 'Step',
    'newUseCase.of': 'of',
    'newUseCase.basicInfo': 'Basic Information',
    'newUseCase.useCaseTitle': 'Use Case Title',
    'newUseCase.titlePlaceholder': 'Enter the use case title...',
    'newUseCase.shortDescription': 'Short Description',
    'newUseCase.shortDescPlaceholder': 'Brief summary for the card view...',
    'newUseCase.fullDescription': 'Full Description',
    'newUseCase.fullDescPlaceholder': 'Detailed description of the use case...',
    'newUseCase.classification': 'Classification',
    'newUseCase.department': 'Department',
    'newUseCase.status': 'Status',
    'newUseCase.businessImpact': 'Business Impact',
    'newUseCase.businessImpactPlaceholder': 'Describe the expected business impact...',
    'newUseCase.contactInfo': 'Contact Information',
    'newUseCase.ownerName': 'Owner Name',
    'newUseCase.ownerNamePlaceholder': 'Enter the owner name...',
    'newUseCase.ownerEmail': 'Owner Email',
    'newUseCase.ownerEmailPlaceholder': 'owner@tesa.com',
    'newUseCase.additionalInfo': 'Additional Information',
    'newUseCase.technologyStack': 'Technology Stack',
    'newUseCase.techStackPlaceholder': 'e.g., Python, TensorFlow, AWS',
    'newUseCase.tags': 'Tags',
    'newUseCase.tagsPlaceholder': 'e.g., automation, chatbot, analytics',
    'newUseCase.applicationUrl': 'Application URL',
    'newUseCase.applicationUrlPlaceholder': 'https://...',
    'newUseCase.internalLinks': 'Internal Links',
    'newUseCase.sharepointPlaceholder': 'SharePoint URL',
    'newUseCase.confluencePlaceholder': 'Confluence URL',
    'newUseCase.demoPlaceholder': 'Demo Video URL',
    'newUseCase.bitsPlaceholder': 'BITS Roles Request URL',
    'newUseCase.add': 'Add',
    'newUseCase.back': 'Back',
    'newUseCase.next': 'Next',
    'newUseCase.submit': 'Submit'
  },
  de: {
    'landing.title': 'Willkommen im Tesa AI Hub',
    'landing.subtitle': 'Entdecken Sie, wie KI unsere Arbeitsweise verändert.',
    'landing.cta': 'Starten Sie Ihre KI-Reise',
    'overview.title': 'KI Hub',
    'overview.backToHome': 'Zurück zur Startseite',
    'overview.newUseCase': 'Neuer Use Case',
    'overview.search': 'Use Cases suchen…',
    'overview.allDepartments': 'Alle Abteilungen',
    'overview.allStatuses': 'Alle Status',
    'overview.showing': 'Zeige',
    'overview.of': 'von',
    'overview.useCases': 'Use Cases',
    'overview.noResults': 'Keine Use Cases gefunden, die Ihren Kriterien entsprechen.',
    'overview.tryAdjusting': 'Versuchen Sie, Ihre Suche oder Filter anzupassen.',
    'modal.description': 'Beschreibung',
    'modal.ownerDetails': 'Besitzer-Details',
    'modal.useCaseStage': 'Use Case Phase',
    'modal.businessImpact': 'Geschäftliche Auswirkungen',
    'modal.technologyStack': 'Technologie-Stack',
    'modal.internalLinks': 'Interne Links',
    'modal.rolesResponsibilities': 'Rollen und Verantwortlichkeiten (BITS)',
    'modal.requestRoles': 'Rollen in BITS anfordern →',
    'modal.relatedUseCases': 'Verwandte Use Cases',
    'modal.launchApplication': 'Anwendung starten',
    'modal.sharepoint': 'SharePoint Dokumentation →',
    'modal.confluence': 'Confluence Seite →',
    'modal.demo': 'Demo Video →',
    'footer.about': 'Über dieses Portal',
    'footer.aiGovernance': 'KI-Governance',
    'footer.contribution': 'Use Case Beitrag',
    'footer.howToSubmit': 'Wie man einen neuen Use Case einreicht',
    'footer.support': 'Support',
    'footer.contactTeam': 'Kontakt KI-Transformationsteam',
    'footer.internalUse': 'Nur für den internen Gebrauch – Eigentum der tesa SE',
    'department.Marketing': 'Marketing',
    'department.R&D': 'F&E',
    'department.Procurement': 'Beschaffung',
    'department.IT': 'IT',
    'department.HR': 'Personal',
    'department.Operations': 'Betrieb',
    'status.Ideation': 'Ideenfindung',
    'status.Pre-Evaluation': 'Vor-Evaluierung',
    'status.Evaluation': 'Evaluierung',
    'status.PoC': 'PoC',
    'status.MVP': 'MVP',
    'status.Live': 'Live',
    'status.Archived': 'Archiviert',
    'newUseCase.title': 'Neuen Use Case erstellen',
    'newUseCase.step': 'Schritt',
    'newUseCase.of': 'von',
    'newUseCase.basicInfo': 'Grundinformationen',
    'newUseCase.useCaseTitle': 'Use Case Titel',
    'newUseCase.titlePlaceholder': 'Geben Sie den Use Case Titel ein...',
    'newUseCase.shortDescription': 'Kurzbeschreibung',
    'newUseCase.shortDescPlaceholder': 'Kurze Zusammenfassung für die Kartenansicht...',
    'newUseCase.fullDescription': 'Vollständige Beschreibung',
    'newUseCase.fullDescPlaceholder': 'Detaillierte Beschreibung des Use Case...',
    'newUseCase.classification': 'Klassifizierung',
    'newUseCase.department': 'Abteilung',
    'newUseCase.status': 'Status',
    'newUseCase.businessImpact': 'Geschäftliche Auswirkungen',
    'newUseCase.businessImpactPlaceholder': 'Beschreiben Sie die erwarteten geschäftlichen Auswirkungen...',
    'newUseCase.contactInfo': 'Kontaktinformationen',
    'newUseCase.ownerName': 'Name des Besitzers',
    'newUseCase.ownerNamePlaceholder': 'Geben Sie den Namen des Besitzers ein...',
    'newUseCase.ownerEmail': 'E-Mail des Besitzers',
    'newUseCase.ownerEmailPlaceholder': 'besitzer@tesa.com',
    'newUseCase.additionalInfo': 'Zusätzliche Informationen',
    'newUseCase.technologyStack': 'Technologie-Stack',
    'newUseCase.techStackPlaceholder': 'z.B. Python, TensorFlow, AWS',
    'newUseCase.tags': 'Tags',
    'newUseCase.tagsPlaceholder': 'z.B. Automatisierung, Chatbot, Analytik',
    'newUseCase.applicationUrl': 'Anwendungs-URL',
    'newUseCase.applicationUrlPlaceholder': 'https://...',
    'newUseCase.internalLinks': 'Interne Links',
    'newUseCase.sharepointPlaceholder': 'SharePoint URL',
    'newUseCase.confluencePlaceholder': 'Confluence URL',
    'newUseCase.demoPlaceholder': 'Demo Video URL',
    'newUseCase.bitsPlaceholder': 'BITS Rollen-Anfrage URL',
    'newUseCase.add': 'Hinzufügen',
    'newUseCase.back': 'Zurück',
    'newUseCase.next': 'Weiter',
    'newUseCase.submit': 'Absenden'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('de');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
