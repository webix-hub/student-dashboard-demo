import {JetView} from "webix-jet";
import statistics from "models/statistics";
import {getStats} from "models/students";

export default class StatisticsView extends JetView{
	config(){
		const chart = {
			view:"chart",
			localId:"chart",
			type:"bar",
			barWidth:12,
			radius:2,
			borderless: true,
			xAxis:{
				template:"#month#",
				title:"Month"
			},
			yAxis:{
				start:0,
				step:20,
				end:100,
				title:"Grade"
			},
			legend:{
				values:[
					{text:"Avg. performance", color:"#ac92ec"},
					{text:"Student", color:"#5ce1bf"},
					{text:"Avg. change", color:"#556ee6", markerType:"item"}
				],
				valign:"middle",
				align:"right",
				layout:"y"
			},
			series:[
				{
					value:"#student#",
					color:"#5ce1bf",
					tooltip:{
						template:"#student#"
					}
				},
				{
					value:"#avgperf#",
					color: "#ac92ec",
					tooltip:{
						template:"#avgperf#"
					}
				},
				{
					type:"line",
					value:"#change#",
					item:{
						borderColor:"#556ee6",
						color:"#556ee6",
						type:"r",
						radius:1
					},
					line:{
						color:"#556ee6",
						width:1
					},
					tooltip:{
						template:"#change#"
					}
				}
			]
		};

		return {
			padding: 10,
			type:"form",
			rows:[chart]
		};
	}
	init(){
		const chart = this.$$("chart");
		chart.parse(statistics);

		this.on(this.app,"student:select", id => {
			//mix in new student data
			const data = getStats(id);
			let i = 0;
			chart.data.each( item => item.student = data.stats[i++] );
			//repaint legend
			this.newLegend(data.name);
		});
	}
	newLegend(name){
		let chart = this.$$("chart");
		chart.define("legend", {
			values:[
				{text:"Avg. performance", color:"#ac92ec"},
				{text:name, color:"#5ce1bf"},
				{text:"Avg. change", color:"#556ee6", markerType:"item"}
			],
			valign:"middle",
			align:"right",
			layout:"y"
		});
		chart.refresh();
	}
}
