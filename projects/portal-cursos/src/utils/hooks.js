import { useContext } from 'react';
import TranslatorContext from '../i18n/TranslatorContext.js';

export function useTranslation() {
  const context = useContext(TranslatorContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
