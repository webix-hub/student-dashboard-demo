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
					this.app.config.state.selected = id.row;
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
					header:"Curriculum progress",
					template: obj => (
						"<svg viewBox='0 0 140 50'><rect y='20' rx='5' ry='5' width='140' height='11' style='fill:#CCD7E6;' />"
						+"<rect y='20' rx='5' ry='5' width='"+obj.compl*1.4+"' height='11' style='fill: #94a1b3;' />"
						+"<rect y='20' rx='5' ry='5' width='"+obj.achiev*1.4+"' height='11' style='fill:#55CD97;' />"
						+"Sorry, your browser does not support inline SVG."
						+"</svg>"
					)
				},
				{
					id:"",
					fillspace:1, minWidth:120,
					header:"Achievement (%)",
					template: obj => `${obj.achiev} <span class='arrows arrow_up webix_icon mdi mdi-arrow-up'>${obj.achcng}</span>`
				},
				{
					id:"",
					fillspace:1, minWidth:120,
					header: "Completed (%)",
					template: obj => `${obj.compl} <span class='arrows arrow_up webix_icon mdi mdi-arrow-up'>${obj.cmpch}</span>`
				},
				{
					id:"",
					fillspace:1, minWidth:120,
					header: "Problems solved this week",
					template: obj => {
						return obj.prbwk + " "
							+ ( obj.prch >= 0 ? "<span class='arrows arrow_up webix_icon mdi mdi-arrow-up'>" : "<span class='arrows arrow_down webix_icon mdi mdi-arrow-down'>" )
							+ obj.prch + "</span>"; 
					}
				},
				{
					id:"prtot",
					fillspace:1, minWidth:120,
					header:"Total problems solved"
				},
				{ id:"les", header:"Last worked on", fillspace:1, minWidth:120 },
				{ id:"seen", header:"Last seen", fillspace:1, minWidth:120 },
				{
					id:"", header:"Assignments",
					fillspace:1, minWidth:120,
					template: obj => {
						return ( obj.ascmp ? "<span class='assignment_complete webix_icon mdi mdi-check'></span>" + obj.ascmp : "" )
							+ " "
							+ (obj.asinc ? "<span class='assignment_incomplete webix_icon mdi mdi-pencil'></span>" + obj.asinc : "");
					}
				}
			]
		};
	}
	init(view){
		view.parse(students);

		this.on(this.app.config.state.$changes, "selected", id => {
			//select the same student as in list
			if (id){
				view.select(id);
				view.showItem(id);
			}
		});
	}
}
