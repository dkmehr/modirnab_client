import { register } from "register-service-worker";

register("/service-worker.js", {
    ready() {
        console.log("run Service Worker");
    },
    updated() {
        //window.location.reload(true); 
    },
    error(error) {
        console.error("erro Service Worker:", error);
    },
});