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
				itemNew: obj => {
					return obj.new ? "<span class='new'>New</span>" : "";
				},
				itemProgress: obj => {
					let grade = (obj.progress >= 60) ?  "good" : ( (obj.progress > 55) ? "okay" : "bad" );
					return `<span class='${grade} progress'>${obj.progress} %</span>`;
				},
				height:60
			},
			on:{
				onAfterSelect: id => this.app.config.state.selected = id
				//select the same student in grid
				//load new data for radar and bullets
				//load data to chart
			}
		};
	}
	init(view){
		students.waitData.then(() => {
			view.parse(students);
			view.select(this.app.config.state.selected || view.getFirstId());
		});

		this.on(this.app.config.state.$changes, "selected", id => {
			// select the same student as in grid
			if (id){
				view.select(id);
				view.showItem(id);
			}
		});
	}
}
