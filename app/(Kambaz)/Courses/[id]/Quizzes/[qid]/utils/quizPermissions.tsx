
export function canEditQuiz(userRole: string): boolean {
  return userRole === "FACULTY";
}

export function canTakeQuiz(userRole: string): boolean {
  return userRole === "FACULTY" || userRole === "STUDENT";
}

export function canSeePreview(userRole: string): boolean {
  return userRole === "FACULTY" || userRole === "STUDENT";
}
