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

export function newDiff(prev, next) {
  const changes = diffWordsWithSpace(prev, next, { newlineIsToken: true });
  let chunks = [];
  let cursor = 0;
  changes.forEach((change) => {
    if (change.added) {
      chunks = chunks.concat(splitInsertions(change, cursor));
      cursor += change.value.length;
    } else if (change.removed) {
      chunks = chunks.concat(splitDeletions(change, cursor));
    } else {
      cursor += change.value.length;
    }
  });

  return chunks;
}

function splitDeletions(change, cursor) {
  // matches just before EOL followed by any space
  const splitRegex = /(?=\n\s*)/g;
  const lines = change.value.split(splitRegex);
  return lines.map((line) => ({
    type: "delete",
    value: line,
    count: line.length,
    at: cursor,
  }));
}

function splitInsertions(change, cursor) {
  // matches just after EOL followed by any space
  const splitRegex = /(?<=\n\s*)(?!\s)/g;
  const linesChanged = change.value.split(splitRegex);
  const chunks = [];
  let at = cursor;
  linesChanged.forEach((lineChanged) => {
    chunks.push({
      type: "insert",
      value: lineChanged,
      at: at,
    });
    at += lineChanged.length;
  });

  console.log({ change, chunks });
  return chunks;
}
