export function getOptimalCourseSelection(courses, category, maxHours) {
  const filteredCourses = courses.filter(course => course.categoria === category);
  const courseCount = filteredCourses.length;
  const maxDeciHours = Math.round(maxHours * 10);
  const dpTable = Array.from({ length: courseCount + 1 }, () => Array(maxDeciHours + 1).fill(0));

  // Build DP table
  for (let courseIndex = 1; courseIndex <= courseCount; courseIndex++) {
    const course = filteredCourses[courseIndex - 1];
    const courseDeciHours = Math.round(course.duracion * 10);
    const courseValue = course.valor;
    for (let availableTime = 0; availableTime <= maxDeciHours; availableTime++) {
      if (courseDeciHours <= availableTime) {
        dpTable[courseIndex][availableTime] = Math.max(
          dpTable[courseIndex - 1][availableTime],
          dpTable[courseIndex - 1][availableTime - courseDeciHours] + courseValue
        );
      } else {
        dpTable[courseIndex][availableTime] = dpTable[courseIndex - 1][availableTime];
      }
    }
  }

  // Backtrack to find selected courses
  let availableTime = maxDeciHours;
  const selectedCourses = [];
  for (let courseIndex = courseCount; courseIndex > 0; courseIndex--) {
    if (dpTable[courseIndex][availableTime] !== dpTable[courseIndex - 1][availableTime]) {
      const course = filteredCourses[courseIndex - 1];
      selectedCourses.push(course);
      availableTime -= Math.round(course.duracion * 10);
    }
  }
  return selectedCourses.reverse();
}
