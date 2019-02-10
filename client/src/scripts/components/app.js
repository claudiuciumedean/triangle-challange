import messages from "./app-messages";

export default class App {
    constructor(el) {
        this.el = el;
        this.inputs = [...this.el.querySelectorAll(".input")];

        this.el.querySelector(".submit-button").addEventListener("click", this.calculate.bind(this));
    }

    getData() {
        let obj = {};

        for(let i = 0; i < this.inputs.length; i++) {
            const input = this.inputs[i];
            const val = input.value;

            if(!val || isNaN(parseInt(val))) { 
                ts.ui.Notification.warning(messages.invalidData);
                obj = null;
                break;
            }

            obj[input.name] = val;
        }

        return obj;
    }

    async calculate() {
        const obj = this.getData();
        if(!obj) { return; }

        await fetch("/check-triangle", {
            method: "POST", 
            body: JSON.stringify(obj), 
            headers: { "content-type": "application/json" }
        }).then(response => {
            if(response.status !== 200) {
                ts.ui.Notification.error(messages.invalidRequest);
                return;
            }
            response.json().then(data => this.processData(data));
        });
    }

    processData(data) {
        if(data.statusCode !== 200) {
            ts.ui.Notification.warning(data.message);
            return;
        }
        
        ts.ui.Notification.info(data.message);
    }

    static init() {
        new App(document.querySelector(".triangle-calculator"));
    }
}