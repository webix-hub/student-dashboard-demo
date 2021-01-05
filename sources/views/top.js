import {JetView} from "webix-jet";
import StudentsView from "views/students";
import GradesRadarView from "views/gradesradar";
import GradesBulletsView from "views/gradesbullets";
import StatisticsView from "views/statistics";
import ProgressView from "views/progress";

import tooltip from "../helpers/tooltip";
import label from "../helpers/label";

export default class TopView extends JetView{
	//building toolbars
	toolbar(type){
		const dark = this.app.config.dark;
		return {
			view:"toolbar",
			padding:{ left:12 },
			css: dark ? "webix_dark" : "",
			elements:[
				{ view:"label", label:label[type] },
				{
					view:"label", width:20,
					template:"<span class='webix_icon mdi mdi-help-circle'></span>",
					css:"question",
					tooltip:tooltip[type]
				},
				{
					view:"icon", icon:"mdi mdi-menu", css:"panel_drag_handle",
					tooltip:"Drag this panel"
				}
			]
		};
	}
	config(){
		const dark = this.app.config.dark;
		
		const bar = {
			view:"toolbar",
			css: dark ? "webix_dark" : "",
			padding:{ left: 12 },
			elements:[
				{ view:"label", label:"Webix Dashboard for Teachers" },
				{},
				{
					view:"switch",
					label:"Choose toolbar color",
					offLabel:"Light",
					onLabel:"Dark",
					labelWidth:150,
					width: 250,
					value: dark,
					on:{
						onChange: v => {
							this.app.config.dark = v;
							this.refresh();
						}
					}
				}
			]
		};

		const dash = {
			view:"dashboard",
			css:dark ? "" : "teacher_dashboard",
			gridColumns:4,
			gridRows:3,
			on:{
				onBeforeDrag: (context, e) => {
					const cls = e.target.className;
					return !!(cls && (cls.indexOf("mdi-menu") !== -1 || cls.indexOf("panel_drag_handle") !== -1));
				}
			},
			cells:[
				{
					view:"panel", x:0, y:0, dx:1, dy:2,
					header:this.toolbar("gpa"),
					body:StudentsView
				},
				{
					view:"panel", x:1, y:0, dx:3, dy:1,
					header:this.toolbar("subject"),
					body:{
						cols:[
							GradesRadarView,
							GradesBulletsView
						]
					}
				},
				{
					view:"panel", x:1, y:1, dx:3, dy:1,
					header:this.toolbar("average"),
					body:StatisticsView
				},
				{
					view:"panel", x:0, y:2, dx:4, dy:1,
					header:this.toolbar("activity"),
					body:ProgressView
				}
			]
		};

		return {
			rows:[
				bar,
				dash
			]
		};
	}	
}
