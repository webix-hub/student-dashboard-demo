import {JetView} from "webix-jet";
import StudentsView from "views/students";

export default class StudentsPopup extends JetView {
	constructor(app, config) {
		super(app, config);

		this.toolbarHeight = config.toolbarHeight;
	}

	config(){
		const bar = {
			template: "Students", type: "header",
			css: this.app.config.theme,
		};

		return {
			view:"sidemenu",
			width: 300,
			state: state => {
				state.top = this.toolbarHeight;
				state.height -= this.toolbarHeight;
			},
			body: {
				rows:[
					bar,
					StudentsView
				]
			}
		};
	}

	init(win){
		this.on(this.app.config.state.$changes, "selected", () => {
			setTimeout(() => win.hide(), 100);
		});
	}

	Toggle(){
		const win = this.getRoot();
		if (win.isVisible()) win.hide();
		else win.show(); 
	}
}