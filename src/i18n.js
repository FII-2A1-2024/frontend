import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import enJSON from "./locale/en.json";
import roJSON from "./locale/ro.json";
import LocalStorageBackend from "i18next-localstorage-backend";

i18n.use(initReactI18next).init({
  backend: {
    backends: [LocalStorageBackend],
    backendOptions: [
      {
        expirationTime: 7 * 24 * 60 * 60 * 1000,
      },
    ],
  },
  resources: {
    en: { ...enJSON },
    ro: { ...roJSON },
  },
  lng: localStorage.getItem("language"), // Set the initial language of the App
  fallbackLng: 'en',
});
