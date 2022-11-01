import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import AxiosAdapter from './infra/AxiosAdapter';
import CatalogHttpGateway from './gateways/CatalogHttpGateway';
import CheckoutHttpGateway from './gateways/CheckoutHttpGateway';
import FetchAdapter from './infra/FetchAdapter';

const app = createApp(App);
const httpClient = new AxiosAdapter();
// const httpClient = new FetchAdapter();
const catalogGateway = new CatalogHttpGateway(httpClient, "http://localhost:3002");
const checkoutGateway = new CheckoutHttpGateway(httpClient, "http://localhost:3000");
app.provide("catalogGateway", catalogGateway);
app.provide("checkoutGateway", checkoutGateway);
app.mount('#app')
