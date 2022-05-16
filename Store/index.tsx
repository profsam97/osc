import { configureStore } from "@reduxjs/toolkit";
import { authStore } from "./auth";
import { utilitiesStore } from "./utilities";
 const Store = configureStore({
    reducer: {auth: authStore, util: utilitiesStore}
})
export default Store