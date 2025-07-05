import { useState } from 'react';
import { useTranslation } from '../utils/hooks.js';
import { getCurrentTheme, toggleTheme } from '../utils/theme.js';

function Configuration() {
  const { translate, currentLanguage, changeLanguage } = useTranslation();
  const [theme, setTheme] = useState(getCurrentTheme());

  const handleThemeSwitch = () => {
    const newTheme = toggleTheme();
    setTheme(newTheme);
  };

  const handleLanguageSwitch = () => {
    const newLang = currentLanguage === 'es' ? 'en' : 'es';
    changeLanguage(newLang);
  };

  return (
    <section className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-lg bg-primary rounded-xl shadow-lg p-8 border-4 border-secondary flex flex-col gap-8">
        <h1 className="text-3xl font-extrabold text-secondary text-center mb-4">{translate('configuration')}</h1>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="text-xl text-secondary font-bold">{translate('theme')}</span>
            <button
              onClick={handleThemeSwitch}
              className="px-4 py-2 bg-accent text-primary rounded font-bold hover:opacity-80 transition-opacity"
            >
              {theme === 'light' ? translate('darkMode') + ' 🌙' : translate('lightMode') + ' ☀️'}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl text-secondary font-bold">{translate('language')}</span>
            <button
              onClick={handleLanguageSwitch}
              className="px-4 py-2 bg-accent text-primary rounded font-bold hover:opacity-80 transition-opacity"
            >
              {currentLanguage === 'es' ? 'EN' : 'ES'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Configuration;
