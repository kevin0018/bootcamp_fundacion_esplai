import { useState } from 'react';
import TranslatorContext from './TranslatorContext.js';
import { translations } from './dictionary.js';

function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('language') || 'es';
  });

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  const translate = (key) => {
    return translations[currentLanguage]?.[key] || key;
  };

  const contextValue = {
    currentLanguage,
    changeLanguage,
    translate,
    availableLanguages: Object.keys(translations),
  };

  return (
    <TranslatorContext.Provider value={contextValue}>
      {children}
    </TranslatorContext.Provider>
  );
}

export default LanguageProvider;
