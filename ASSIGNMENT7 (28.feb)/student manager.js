// ============================================
// ASSIGNMENT - STUDENT MANAGER
// Student  : Manoj Kumar B
// Date     : 28/02/2026
// ============================================

// Array of Objects to store student marks
var students = [
  { name: "Manoj Kumar B",    marks: [85, 90, 78, 92, 88] },
  { name: "Rahul Kumar",  marks: [70, 65, 80, 75, 72] },
  { name: "Priya Sharma", marks: [95, 98, 92, 97, 99] },
  { name: "Suresh Babu",  marks: [55, 60, 58, 62, 50] },
  { name: "Ananya Rao",   marks: [88, 76, 84, 91, 79] }
];

// Calculate average and display
for (var i = 0; i < students.length; i++) {
  var total = 0;
  for (var j = 0; j < students[i].marks.length; j++) {
    total = total + students[i].marks[j];
  }
  var avg = total / students[i].marks.length;
  console.log("Name: " + students[i].name + " | Marks: " + students[i].marks + " | Average: " + avg.toFixed(2));
}