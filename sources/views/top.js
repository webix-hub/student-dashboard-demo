import {JetView} from "webix-jet";
import StudentsView from "views/students";
import GradesRadarView from "views/gradesradar";
import GradesBulletsView from "views/gradesbullets";
import StatisticsView from "views/statistics";
import ProgressView from "views/progress";
import TooltipView from "views/tooltip";

export default class TopView extends JetView{
	//building toolbars
	toolbar(label,n){
		return [
			{ view:"label", label:label, minWidth:140 },
			{
				view:"label", width:30,
				template:"<span class='webix_icon fa-question-circle'></span>",
				css:"question", localId:"tooltip"+n
			}
		];
	}
	config(){

		var dashboard = {
			view:"dashboard",
			css:"teacher_dashboard",
			gridColumns:4,
			gridRows:3,
			cells:[
				{
					view:"panel", x:0, y:0, dx:1, dy:2,
					header:{
						view:"toolbar", elements:this.toolbar("Grade by student",1)
					},
					body:StudentsView
				},
				{
					view:"panel", x:1, y:0, dx:3, dy:1,
					header:{
						view:"toolbar", elements:this.toolbar("Grade students by subjects",2)
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
						view:"toolbar", elements:this.toolbar("Individual average grade",3)
					},
					body:StatisticsView
				},
				{
					view:"panel", x:0, y:2, dx:4, dy:1,
					header:{
						view:"toolbar", elements:this.toolbar("Students progress",4)
					},
					body:ProgressView
				}
			]
		};

		return dashboard;
	}
	init(view){
		//add tooltips
		this.tooltip = this.ui(TooltipView);

		let questions = view.$view.querySelectorAll(".question");
		for (let i = 0; i < questions.length; i++){
			webix.event(this.$$("tooltip"+(i+1)).$view,"mouseover",(e)=>{
				this.tooltip.showTooltip(i, webix.html.pos(e));
			});
			webix.event(this.$$("tooltip"+(i+1)).$view,"mouseout",()=>{
				this.tooltip.hideTooltip();
			});
		}
	}
}
