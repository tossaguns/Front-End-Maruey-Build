import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";

import "primevue/resources/themes/lara-light-green/theme.css";
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
//prime flex
import routerCustomer from "./router/customer";

import store from "./store/index";

import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

import OrganizationChart from 'primevue/organizationchart'
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Menu from "primevue/menu";
import Menubar from "primevue/menubar";
import Checkbox from "primevue/checkbox";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Chip from "primevue/chip";
import SelectButton from "primevue/selectbutton";
import InputSwitch from "primevue/inputswitch";
import Sidebar from "primevue/sidebar";
import Image from "primevue/image";
import Card from "primevue/card";
import Tag from "primevue/tag";
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import FileUpload from "primevue/fileupload";
import InputNumber from 'primevue/inputnumber';
import ScrollTop from 'primevue/scrolltop'
import Knob from 'primevue/knob'
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import FloatLabel from 'primevue/floatlabel';
import Calendar from 'primevue/calendar';
import ConfirmPopup from 'primevue/confirmpopup';
import Paginator from "primevue/paginator";
import AutoComplete from 'primevue/autocomplete';
import Chart from 'primevue/chart';

import MultiSelect from 'primevue/multiselect';
import Editor from 'primevue/editor';
import RadioButton from 'primevue/radiobutton';
import Rating from 'primevue/rating';
const app = createApp(App);

app.use(PrimeVue);
app.use(store);
app.use(ToastService);
app.use(ConfirmationService);
app.use(routerCustomer);

app.component("FloatLabel",FloatLabel);
app.component("AutoComplete",AutoComplete);
app.component("Accordion",Accordion);
app.component("AccordionTab",AccordionTab);
app.component("OrganizationChart",OrganizationChart);
app.component("Knob",Knob);
app.component("ScrollTop",ScrollTop);
app.component("Chart",Chart);
app.component("Calendar",Calendar);
app.component("ConfirmPopup", ConfirmPopup);
app.component("Paginator", Paginator);

app.component("Toast", Toast);
app.component("ConfirmDialog", ConfirmDialog);
app.component("InputText", InputText);
app.component("Button", Button);
app.component("Menu", Menu);
app.component("Menubar", Menubar);
app.component("Checkbox", Checkbox);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Chip", Chip);
app.component("SelectButton", SelectButton);
app.component("InputSwitch", InputSwitch);
app.component("InputNumber", InputNumber);

app.component("Sidebar", Sidebar);
app.component("Image", Image);
app.component("Card", Card);
app.component("Tag", Tag);
app.component("Dialog", Dialog);
app.component("Textarea", Textarea);
app.component("Dropdown", Dropdown);
app.component("FileUpload", FileUpload);
app.component("MultiSelect", MultiSelect);
app.component("Editor", Editor);
app.component("RadioButton", RadioButton);
app.component("Rating", Rating);
app.mount("#app");
