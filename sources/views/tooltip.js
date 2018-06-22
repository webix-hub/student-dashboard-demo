import {JetView} from "webix-jet";

export default class TooltipView extends JetView {
	config(){
		return {
			view:"tooltip",
			template:"#value#",
			css:"teacher_tooltip"
		};
	}
	showTooltip(tp,pos){
		const tooltips = [
			{"id":1,"value":"Shows the overall GPA by student"},
			{"id":2,"value":"Shows the progress of a particular student by subjects"},
			{"id":3,"value":"Shows the progress of a particular student in the context of average performance by department"},
			{"id":4,"value":"Shows the overall activity and progress over the period by student"}
		];
		this.getRoot().show(tooltips[tp],pos);
	}
	hideTooltip(){
		this.getRoot().hide();
	}
}
