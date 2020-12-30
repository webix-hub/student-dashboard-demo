import {JetView} from "webix-jet";
import {students} from "models/students";

export default class ProgressView extends JetView{
	config(){
		return {
			view:"datatable",
			select:true,
			rowLineHeight:45,
			rowHeight:50,
			css:"progress_table",
			type:{
				itemNew: data => {
					return data.new ? "<span class='new'>New</span>" : "";
				}
			},
			on:{
				onItemClick: id => {
					//select the same student in list
					this.app.callEvent("student:select",[id.row]);
				}
			},
			columns:[
				{
					id:"", header:"Name", template:"#name# {common.itemNew()}",
					fillspace:1, minWidth:170,
					sort:"string"
				},
				{
					id:"",
					fillspace:1, minWidth:170,
					css:"curriculum",
					header:{
						text:"Curriculum<br>students", css:"multiline", height:55,
					},
					template: obj => (
						"<svg viewBox='0 0 140 50'><rect y='20' rx='5' ry='5' width='140' height='11' style='fill:#ccc;' />"
						+"<rect y='20' rx='5' ry='5' width='"+obj.compl*1.4+"' height='11' style='fill:#aaa;' />"
						+"<rect y='20' rx='5' ry='5' width='"+obj.achiev*1.4+"' height='11' style='fill:#37bc98;' />"
						+"Sorry, your browser does not support inline SVG."
						+"</svg>"
					)
				},
				{
					id:"",
					fillspace:1, minWidth:120,
					header:{
						text:"Achievement<br>(%)",
						css:"multiline"
					},
					template: obj => `${obj.achiev} <span class='arrows arrow_up'>&#9652;${obj.achcng}</span>`
				},
				{
					id:"",
					fillspace:1, minWidth:120,
					header:{
						text:"Completed<br>(%)",
						css:"multiline"
					},
					template: obj => `${obj.compl} <span class='arrows arrow_up'>&#9652;${obj.cmpch}</span>`
				},
				{
					id:"",
					fillspace:1, minWidth:120,
					header:{
						text:"Problems solved<br>this week",
						css:"multiline"
					},
					template: obj => {
						return obj.prbwk + " "
							+ ( obj.prch >= 0 ? "<span class='arrows arrow_up'>&#9652;" : "<span class='arrows arrow_down'>&#9662;" )
							+ obj.prch + "</span>"; 
					}
				},
				{
					id:"prtot",
					fillspace:1, minWidth:120,
					header:{
						text:"Total problems<br>solved",
						css:"multiline"
					}
				},
				{ id:"les", header:"Last worked on", fillspace:1, minWidth:120 },
				{ id:"seen", header:"Last seen", fillspace:1, minWidth:120 },
				{
					id:"", header:"Assignments",
					fillspace:1, minWidth:120,
					template: obj => {
						return ( obj.ascmp ? "<span class='assignment_complete'>&#10004;</span>" + obj.ascmp : "" )
							+ " "
							+ (obj.asinc ? "<span class='assignment_incomplete'>&#10000;</span>" + obj.asinc : "");
					}
				}
			]
		};
	}
	init(view){
		view.parse(students);

		this.on(this.app,"student:select", id => {
			//select the same student as in list
			view.select(id);
			view.showItem(id);
		});
	}
}
