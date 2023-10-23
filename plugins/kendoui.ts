import { Input } from "@progress/kendo-vue-inputs";
import { Grid,GridNoRecords,GridToolbar } from '@progress/kendo-vue-grid'
import { Button } from '@progress/kendo-vue-buttons';
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
  nuxtApp.vueApp.component("Grid", Grid);
  nuxtApp.vueApp.component("GridNoRecords", GridNoRecords);
  nuxtApp.vueApp.component("GridToolbar", GridToolbar);
  nuxtApp.vueApp.component("Button", Button);
  return {
    provide: {
      loadMessages,
      load,
      moment,
    },
  };
});
