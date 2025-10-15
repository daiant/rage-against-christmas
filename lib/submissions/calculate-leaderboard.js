// FIXME: Horrible performance
const isFastestSubmission = (submission, allSubmissions) => {
  return allSubmissions.filter(s => s.problem_id === submission.problem_id && s.status === 'correct').sort((a, b) => a.execution_time - b.execution_time).at(0).id === submission.id;
}

const calculateLeaderBoard = (submissions) => {
  const userLeaderboard = new Map();

  submissions.forEach(submission => {
    if (!userLeaderboard.has(submission.user_id)) {
      userLeaderboard.set(submission.user_id, { submissions: {}, submissionsLength: 0, score: 0, username: submission.username });
    }

    const user = userLeaderboard.get(submission.user_id);
    user.submissions[submission.problem_id] = [...user.submissions[submission.problem_id] ?? [], {
      ...submission,
      fastest: isFastestSubmission(submission, submissions)
    }];
  });

  Array.from(userLeaderboard.values()).forEach(user => {
    Object.values(user.submissions).forEach(problemSubmissions => {
      user.submissionsLength += problemSubmissions.length;
      if (problemSubmissions.find(s => s.status === 'correct')) {
        user.score += 1;
      }
      if (problemSubmissions.some(s => s.fastest)) {
        user.score += 1;
      }
    });
  });

  return Array.from(userLeaderboard.values()).sort((a, b) => b.score - a.score);
}

module.exports = { calculateLeaderBoard }