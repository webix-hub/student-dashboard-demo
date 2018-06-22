import {JetView} from "webix-jet";
import {students} from "models/students";

export default class ProgressView extends JetView{
	config(){
		return {
			view:"datatable",
			select:true,
			rowLineHeight:45,
			rowHeight:50,
			css:"my_style",
			type:{
				itemNew:function(data){
					if (data.new) return "<span class='new'>New</span>";
					else return "";
				}
			},
			on:{
				onItemClick: (id) => {
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
					header:{
						text:"Curriculum<br>students", css:"multiline", height:55,
					}, 
					template:function(obj){
						let html = "<svg viewBox='0 0 140 50'><rect y='20' rx='5' ry='5' width='140' height='11' style='fill:#ccc;' />"
						+"<rect y='20' rx='5' ry='5' width='"+obj.compl*1.4+"' height='11' style='fill:#aaa;' />"
						+"<rect y='20' rx='5' ry='5' width='"+obj.achiev*1.4+"' height='11' style='fill:#37bc98;' />"
						+"Sorry, your browser does not support inline SVG."
						+"</svg>";
						return html;
					}
				},
				{
					id:"",
					fillspace:1, minWidth:120,
					header:{
						text:"Achievement<br>(%)",
						css:"multiline"
					},
					template:"#achiev# <span class='arrows arrow_up'>&#9652;#achcng#</span>",
				},
				{
					id:"",
					fillspace:1, minWidth:120,
					header:{
						text:"Completed<br>(%)",
						css:"multiline"
					},
					template:"#compl# <span class='arrows arrow_up'>&#9652;#cmpch#</span>"
				},
				{
					id:"",
					fillspace:1, minWidth:120,
					header:{
						text:"Problems solved<br>this week",
						css:"multiline"
					},
					template:(data)=>{
						return data.prbwk + " "
							+ ( data.prch >= 0 ? "<span class='arrows arrow_up'>&#9652;" : "<span class='arrows arrow_down'>&#9662;" )
							+ data.prch + "</span>"; 
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
					template:function(data){
						return ( data.ascmp ? "<span class='assignment_complete'>&#10004;</span>" + data.ascmp : "" )
							+ " "
							+ (data.asinc ? "<span class='assignment_incomplete'>&#10000;</span>" + data.asinc : "");
					}
				}
			]
		};
	}
	init(view){
		view.parse(students);

		this.on(this.app,"student:select",(id)=>{
			//select the same student as in list
			view.select(id);
			view.showItem(id);
		});
	}
}
