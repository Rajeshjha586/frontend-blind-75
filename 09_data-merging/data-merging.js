/**
 * @param {Array<{user: number, duration: number, equipment: Array<string>}>} sessions
 * @return {Array}
 */
export default function mergeData(sessions) {
  const userMap = new Map();
  const result = [];

  for (const session of sessions) {
    const { user, duration, equipment } = session;

    if (!userMap.has(user)) {
      const sessionCopy = {
        user,
        duration,
        equipment: [...equipment],
      };
      userMap.set(user, sessionCopy);
      result.push(sessionCopy);
    } else {
      // Merge into existing user's data
      const existing = userMap.get(user);
      existing.duration += duration;

      // Merge and deduplicate equipment
      const equipmentSet = new Set([...existing.equipment, ...equipment]);
      existing.equipment = [...equipmentSet].sort();
    }
  }

  return result;

  //   return sessions.reduce((acc, session) => {
  //     const { user, duration, equipment } = session;
  //     const existing = acc.find((entry) => entry.user === user);
  //     if (existing) {
  //       existing.duration += duration;
  //       for (let eq of equipment) {
  //         if (!existing.equipment.includes(eq)) {
  //           existing.equipment.push(eq);
  //         }
  //       }
  //       existing.equipment.sort();
  //     } else {
  //       acc.push({
  //         user,
  //         duration,
  //         equipment: [...equipment],
  //       });
  //     }
  //     return acc;
  //   }, []);
}

const sessions = [
  { user: 8, duration: 50, equipment: ["bench"] },
  { user: 7, duration: 150, equipment: ["dumbbell"] },
  { user: 1, duration: 10, equipment: ["barbell"] },
  { user: 7, duration: 100, equipment: ["bike", "kettlebell"] },
  { user: 7, duration: 200, equipment: ["bike"] },
  { user: 2, duration: 200, equipment: ["treadmill"] },
  { user: 2, duration: 200, equipment: ["bike"] },
];

console.log(mergeData(sessions));
// [
//   { user: 8, duration: 50, equipment: ['bench'] },
//   { user: 7, duration: 450, equipment: ['bike', 'dumbbell', 'kettlebell'] },
//   { user: 1, duration: 10, equipment: ['barbell'] },
//   { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
// ];
