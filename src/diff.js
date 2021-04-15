import { diffChars, diffWordsWithSpace } from "diff";

export function diff(prev, next) {
  const changes = diffWordsWithSpace(prev, next, { newlineIsToken: true });
  let newChanges = [];
  changes.forEach((change) => {
    if (change.removed) {
      const [firstDeletion, ...linesRemoved] = change.value.split("\n");
      newChanges.push({
        value: firstDeletion,
        removed: change.removed,
        added: change.added,
        count: firstDeletion.length,
      });

      newChanges = newChanges.concat(
        linesRemoved.map((lineRemoved) => ({
          value: "\n" + lineRemoved,
          removed: change.removed,
          added: change.added,
          count: lineRemoved.length + 1,
        }))
      );
    } else if (change.added) {
      const linesAdded = change.value.split("\n");
      const lastAddition = linesAdded.pop();

      newChanges = newChanges.concat(
        linesAdded.map((line) => ({
          value: line + "\n",
          removed: change.removed,
          added: change.added,
          count: linesAdded.length + 1,
        }))
      );

      newChanges.push({
        value: lastAddition,
        removed: change.removed,
        added: change.added,
        count: lastAddition.length,
      });
    } else {
      newChanges.push(change);
    }
  });
  return newChanges;
}
