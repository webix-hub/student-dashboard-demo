import {JetView} from "webix-jet";

import StudentsPopup from "views/studentspopup";

export default class TopView extends JetView{
	config(){
		const theme = this.app.config.theme;
		const screen = this.app.config.size;
		
		const bar = {
			view:"toolbar",
			localId:"bar",
			height:56,
			css: theme,
			padding:{ left: 12, right:12 },
			elements:[
				{ view:"label", label:"Webix Dashboard for Teachers" },
				{},
				{
					view:"icon",
					tooltip:"Click to change the theme",
					icon:"webix_icon mdi mdi-invert-colors", 
					color:theme,
					click:function(){
						let color = this.config.color;
						color = !color ? "webix_dark" : "";
						try{
							webix.storage.local.put("theme_students_dashboard",color);
						}
						catch(err){
							/* for blocked cookies */
							webix.message("Enable cookies if you want to store the current theme");
						}
						this.$scope.app.config.theme = color;
						this.$scope.app.refresh();
					}
				}
			]
		};

		if (screen === "small") {
			bar.elements.unshift({
				view:"icon",
				icon:"webix_icon mdi mdi-menu",
				click: () => this.ToggleList(),
			});
		}

		const ui = {
			minWidth: 200,
			rows:[
				bar,
				{ $subview: true }
			]
		};

		if (screen === "small") {
			ui.rows.splice(1, 0, {
				view: "tabbar", options: [
					{ id: "charts", value:"Charts" },
					{ id: "progress", value:"Tasks table" }
				],
				on: {
					onChange: v => {
						this.show(v);
					}
				}
			});
		}

		return ui;
	}

	init() {
		if (this.app.config.size === "small") {
			this.StudentsPopup = this.ui(new StudentsPopup(this.app, {
				toolbarHeight: this.$$("bar").$height + 10
			}));
		}
	}

	ToggleList(){
		this.StudentsPopup.Toggle();
	}
}
