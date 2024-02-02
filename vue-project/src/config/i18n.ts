import { createI18n } from 'vue-i18n';
import frMessages from '@/locales/fr.json';
import enMessages from '@/locales/en.json';

const messages = {
    'FR': frMessages,
    'EN': enMessages,
};

const i18n = createI18n({
  legacy: false,
  locale: 'FR',
  messages,
});

export default i18n;