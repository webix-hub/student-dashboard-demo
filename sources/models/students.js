export const students = new webix.DataCollection({
	url:"data/students.json"
});

// for bullet and radar
export function getGrades(id){
	return webix.copy(students.getItem(id).grades);
}

//for average-individual chart
export function getStats(id){
	const student = students.getItem(id);
	return {
		stats:student.months,
		name:student.name
	};
}
