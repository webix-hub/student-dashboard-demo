import {JetView} from "webix-jet";

import tooltip from "../helpers/tooltip";
import label from "../helpers/label";

import StudentsView from "views/students";
import GradesRadarView from "views/gradesradar";
import GradesBulletsView from "views/gradesbullets";
import StatisticsView from "views/statistics";
import ProgressView from "views/progress";

export default class ChartsView extends JetView {
	config(){
		const screen = this.app.config.size;
		const theme = this.app.config.theme;
		
		let subjectCharts;
		let dcells;

		if (screen === "small") {
			subjectCharts = {
				rows:[
					GradesRadarView,
					GradesBulletsView
				]
			};

			dcells = [
				{
					view:"panel", 
					x:0, y:0, dx:4, 
					dy: 3,
					header: this.toolbar("subject"),
					resize: true,
					body: subjectCharts
				},
				{
					view:"panel", 
					x: 0, y: 3,
					dx: 4, dy: 2,
					header: this.toolbar("average"),
					resize: true,
					body: StatisticsView
				},
			];
		} else if (screen === "wide") {
			subjectCharts = {
				cols:[
					GradesRadarView,
					GradesBulletsView
				]
			};

			dcells = [
				{
					view: "panel", 
					x: 0,
					y: 0, 
					dx: 1, 
					dy: 2,
					header: this.toolbar("gpa"),
					resize: true,
					body: StudentsView
				},
				{
					view:"panel", 
					x:1,
					y:0, 
					dx:3, 
					dy: 1,
					header: this.toolbar("subject"),
					resize: true,
					body: subjectCharts
				},
				{
					view:"panel", 
					x: 1, y: 1,
					dx: 3, dy: 1,
					header: this.toolbar("average"),
					resize: true,
					body: StatisticsView
				},
				{
					view: "panel", 
					x: 0, y: 2, 
					dx: 4, dy: 1,
					header: this.toolbar("activity"),
					resize: true,
					body: ProgressView
				}
			];
		}

		const dash = {
			view:"dashboard",
			css:theme ? "" : "teacher_dashboard",
			gridColumns: 4,
			gridRows: screen === "small" ? 5 : 3,
			cellHeight: screen === "small" ? 200 : 0,
			on:{
				onBeforeDrag: (context, e) => {
					return context.source.getChildViews()[0].$view.contains(e.target);
				}
			},
			cells: dcells
		};

		return {
			view:"scrollview",
			scroll:"auto",
			body: dash
		};
	}

	//building toolbars
	toolbar(type){
		const theme = this.app.config.theme;
		return {
			view:"toolbar",
			paddingX:12,
			css: theme,
			elements:[
				{ view:"label", label: label[type] },
				{
					view:"label", width:20,
					template:"<span class='webix_icon mdi mdi-help-circle'></span>",
					css:"question",
					tooltip: tooltip[type]
				}
			]
		};
	}
}