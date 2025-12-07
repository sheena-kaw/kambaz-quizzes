export default function calculateQuizScore(questions: any, answers: any) {
  let totalPoints = 0;
  let earnedPoints = 0;

  const results = questions.map((q: any) => {
    totalPoints += q.points;

    let isCorrect = false;
    const studentAnswer = answers[q._id];

    // Check if answer is correct based on question type
    if (q.questionType === "MULTIPLE_CHOICE") {
      isCorrect = studentAnswer === q.choices.find((c: any) => c.isCorrect)?._id;
    } else if (q.questionType === "TRUE_FALSE") {
      isCorrect = studentAnswer === q.correctAnswer;
    } else if (q.questionType === "FILL_IN_THE_BLANK") {
      isCorrect = q.possibleAnswers.some((a: any) =>
        a.caseInsensitive
          ? a.text.toLowerCase() === studentAnswer?.toLowerCase()
          : a.text === studentAnswer
      );
    }

    if (isCorrect) {
      earnedPoints += q.points;
    }

    return {
      questionId: q._id,
      isCorrect,
      pointsEarned: isCorrect ? q.points : 0,
    };
  });

  return {
    results,
    earnedPoints,
    totalPoints,
    percentage: Math.round((earnedPoints / totalPoints) * 100),
  };
}
