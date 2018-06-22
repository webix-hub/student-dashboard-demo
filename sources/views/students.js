import {JetView} from "webix-jet";
import {students} from "models/students";

export default class StudentsView extends JetView {
	config(){
		return {
			view:"list",
			css:"students_list",
			select:true,
			type:{
				template:"#name# {common.itemNew()} {common.itemProgress()}",
				itemNew:function(obj){
					if (obj.new) return "<span class='new'>New</span>";
					else return "";
				},
				itemProgress:function(obj){
					if (obj.progress >= 60){
						return "<span class='good progress'>"+obj.progress+" %</span>";
					} else if (obj.progress < 60 && obj.progress > 55){
						return "<span class='okay progress'>"+obj.progress+" %</span>";
					} else
						return "<span class='bad progress'>"+obj.progress+" %</span>";
				},
				height:60
			},
			on:{
				onAfterSelect: function(id){
					this.getItem(id);
					this.$scope.app.callEvent("student:select",[id]);
					//select the same student in grid
					//load new data for radar and bullets
					//load data to chart	
				}
			}
		};
	}
	init(view){
		students.waitData.then(function(){
			view.parse(students);
			//initial selection for list
			view.select(view.getFirstId());
		});

		this.on(this.app,"student:select",(id)=>{
			// select the same student as in grid
			view.select(id);
			view.showItem(id);
		});
	}
}
