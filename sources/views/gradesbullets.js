import {JetView} from "webix-jet";
import subjects from "models/subjects";
import {getGrades} from "models/students";

export default class GradesBulletsView extends JetView {
	// building bullets
	bullets(){
		return subjects.map( subj => ({
			type:"clean",
			cols:[
				{
					template:"<div class='right'>"+subj.name+"</div>",
					width:80
				},
				{
					view:"bullet",
					name:subj.name,
					height:45,
					bands:[
						{ value:100, color:"#eee" }
					],
					barWidth:15,
					stroke:15,
					tickSize:0,
					color:subj.color
				}
			]
		}));
	}
	config(){
		return {
			view:"scrollview",
			scroll:"y",
			gravity:2,
			body:{
				view:"form",
				localId:"bullets",
				type:"clean",
				padding:10,
				rows:this.bullets()
			}
		};
	}
	init(){
		//load new data for radar
		this.on(this.app,"student:select", id => this.loadGrades(id) );
	}
	loadGrades(id){
		//making a JSON object out of the array
		const newGrades = getGrades(id);
		let values = {};
		for (let i = 0; i < newGrades.length; i++){
			values[newGrades[i].subj] = newGrades[i].grade;
		}
		this.$$("bullets").setValues(values);
	}
}
