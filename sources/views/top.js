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
		return [
			{ view:"label", label:label[type] },
			{
				view:"label", width:40,
				template:"<span class='webix_icon fas fa-question-circle'></span>",
				css:"question",
				tooltip:tooltip[type]
			}
		];
	}
	config(){
		return {
			view:"dashboard",
			css:"teacher_dashboard",
			gridColumns:4,
			gridRows:3,
			cells:[
				{
					view:"panel", x:0, y:0, dx:1, dy:2,
					header:{
						view:"toolbar", padding:{ left:12 }, 
						elements:this.toolbar("gpa")
					},
					body:StudentsView
				},
				{
					view:"panel", x:1, y:0, dx:3, dy:1,
					header:{
						view:"toolbar", padding:{ left:12 }, 
						elements:this.toolbar("subject")
					},
					body:{
						cols:[
							GradesRadarView,
							GradesBulletsView
						]
					}
				},
				{
					view:"panel", x:1, y:1, dx:3, dy:1,
					header:{
						view:"toolbar", padding:{ left:12 }, 
						elements:this.toolbar("average")
					},
					body:StatisticsView
				},
				{
					view:"panel", x:0, y:2, dx:4, dy:1,
					header:{
						view:"toolbar", padding:{ left:12 }, 
						elements:this.toolbar("activity")
					},
					body:ProgressView
				}
			]
		};
	}
}
