import LocalizedStrings from "react-localization";
import en from "./en";
import hi from "./hi";
import pb from "./pb";
/**
 * @function strings
 * @return localized strings
 * @desc This function returns all localized strings within
 * their respective keys.
 */
export const strings = new LocalizedStrings({
  en,
  hi,
  pb
});

/**
 * @function setInitialLanguage
 * @return nothing
 * @desc This function checks the language key in localstorage.
 * if present, it sets that language else default language to english.
 */
export const setInitialLanguage = () => {
  const lang = localStorage.getItem("current_language");
  if (lang) {
    strings.setLanguage(lang);
  } else {
    strings.setLanguage("en");
    localStorage.setItem("current_language", "en");
  }
};
