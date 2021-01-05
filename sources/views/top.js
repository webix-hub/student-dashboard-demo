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
		const theme = this.app.config.theme;
		return {
			view:"toolbar",
			paddingX:12,
			css: theme,
			elements:[
				{ view:"label", label:label[type] },
				{
					view:"label", width:20,
					template:"<span class='webix_icon mdi mdi-help-circle'></span>",
					css:"question",
					tooltip:tooltip[type]
				}
			]
		};
	}
	config(){
		const theme = this.app.config.theme;
		
		const bar = {
			view:"toolbar",
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
						catch(err){/* for blocked cookies */}
						this.$scope.app.config.theme = color;
						this.$scope.app.refresh();
					}
				}
			]
		};

		const dash = {
			view:"dashboard",
			css:theme ? "" : "teacher_dashboard",
			gridColumns:4,
			gridRows:3,
			on:{
				onBeforeDrag: (context, e) => {
					return context.source.getChildViews()[0].$view.contains(e.target);
				}
			},
			cells:[
				{
					view:"panel", x:0, y:0, dx:1, dy:2,
					header:this.toolbar("gpa"),
					resize:true,
					body:StudentsView
				},
				{
					view:"panel", x:1, y:0, dx:3, dy:1,
					header:this.toolbar("subject"),
					resize:true,
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
					resize:true,
					body:StatisticsView
				},
				{
					view:"panel", x:0, y:2, dx:4, dy:1,
					header:this.toolbar("activity"),
					resize:true,
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
