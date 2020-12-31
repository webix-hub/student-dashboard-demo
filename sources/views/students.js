import {JetView} from "webix-jet";
import {students} from "models/students";

export default class StudentsView extends JetView {
	config(){
		const theme = this.app.getService("theme").getTheme();
		const dark = theme === "contrast";

		return {
			view:"list",
			css:"students_list" + (dark ? " list_dark" : ""),
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
				onAfterSelect: id => this.app.callEvent("student:select",[id])
				//select the same student in grid
				//load new data for radar and bullets
				//load data to chart
			}
		};
	}
	init(view){
		students.waitData.then(() => {
			view.parse(students);
			view.select(view.getFirstId());
		});

		this.on(this.app,"student:select", id => {
			// select the same student as in grid
			view.select(id);
			view.showItem(id);
		});
	}
}
