import {JetView} from "webix-jet";
import StudentsView from "views/students";
import GradesRadarView from "views/gradesradar";
import GradesBulletsView from "views/gradesbullets";
import StatisticsView from "views/statistics";
import ProgressView from "views/progress";
import TooltipView from "views/tooltip";

export default class TopView extends JetView{
	//building toolbars
	toolbar(label){
		return [
			{ view:"label", label:label },
			{
				view:"label", width:30,
				template:"<span class='webix_icon fa-question-circle'></span>",
				css:"question"
			}
		];
	}
	config(){
		return {
			view:"dashboard",
			autoFill:true,
			css:"teacher_dashboard",
			gridColumns:4,
			gridRows:3,
			cells:[
				{
					view:"panel", resize:true, x:0, y:0, dx:1, dy:2,
					header:{
						view:"toolbar", elements:this.toolbar("Grade by student")
					},
					body:StudentsView
				},
				{
					view:"panel", resize:true, x:1, y:0, dx:3, dy:1,
					header:{
						view:"toolbar", elements:this.toolbar("Grade students by subjects")
					},
					body:{
						cols:[
							GradesRadarView,
							GradesBulletsView
						]
					}
				},
				{
					view:"panel", resize:true, x:1, y:1, dx:3, dy:1,
					header:{
						view:"toolbar", elements:this.toolbar("Individual average grade")
					},
					body:StatisticsView
				},
				{
					view:"panel", resize:true, x:0, y:2, dx:4, dy:1,
					header:{
						view:"toolbar", elements:this.toolbar("Students progress")
					},
					body:ProgressView
				}
			]
		};
	}
	init(view){
		//add tooltips
		this.tooltip = this.ui(TooltipView);

		let questions = view.$view.querySelectorAll(".question");
		for (let i = 0; i < questions.length; i++){
			webix.event(questions[i],"mouseover",(e)=>{
				this.tooltip.showTooltip(i, webix.html.pos(e));
			});
			webix.event(questions[i],"mouseout",()=>{
				this.tooltip.hideTooltip();
			});
		}
	}
}
