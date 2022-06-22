import "./styles/app.css";
import { JetApp, EmptyRouter, HashRouter } from "webix-jet";
import { createState } from "jet-restate";

export default class MyApp extends JetApp{
	constructor(config){
		const state = createState({
			selected: 0
		});

		let theme = "";
		try{
			theme = webix.storage.local.get("theme_students_dashboard");
		}
		catch(err){
			webix.message("You blocked cookies. The theme won't be restored after page reloads.","debug");
		}

		const defaults = {
			id 		: APPNAME,
			version : VERSION,
			router 	: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug 	: !PRODUCTION,
			start 	: "/top/charts",
			theme	: theme || "",
			state
		};

		super({ ...defaults, ...config });
	}
}

if (!BUILD_AS_MODULE){
	webix.ready(() => {
		if (!webix.env.touch && webix.env.scrollSize)
			webix.CustomScroll.init();
		webix.ui.fullScreen();

		const app = new MyApp();

		const size =  () => document.body.offsetWidth > 800 ? "wide" : "small";
		app.config.size = size();

		webix.event(window, "resize", function(){
			const newSize = size();
			if (newSize != app.config.size){
				app.config.size = newSize;
				app.refresh();
			}
		});

		app.render();
	});
}