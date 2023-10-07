import { Input } from "@progress/kendo-vue-inputs";

import {
  IntlProvider,
  load,
  loadMessages,
  LocalizationProvider,
} from "@progress/kendo-vue-intl";

import moment from "moment";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("LocalizationProvider", LocalizationProvider);
  nuxtApp.vueApp.component("Input", Input);
  return {
    provide: {
      loadMessages,
      load,
      moment,
    },
  };
});
