import {JetView} from "webix-jet";
import {getGrades} from "models/students";

export default class GradesRadarView extends JetView {
	config(){
		return {
			view:"chart",
			type:"radar",
			preset:"area",
			value:"#grade#",
			xAxis:{
				template:"#subj#"
			},
			yAxis:{
				start:0,
				end:100,
				step:20
			},
			fill:"#967adc",
			line:{
				color:"#967adc"
			}
		};
	}
	init(view){
		this.on(this.app,"student:select",(id)=>{
			//load new data for radar
			view.parse(getGrades(id));
		});
	}
}
