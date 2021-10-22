type StudentId = `${number}`;
type Subject = string; // TODO does it need restrictions?
type InputRecord = [StudentId, Subject];
type Input = InputRecord[];
type OutputStudentIds = `${StudentId},${StudentId}`;

const input: Input = [
  ["1", "Economics"],
  ["1", "Software development"],
  ["2", "Science"],
  ["3", "Software development"],
  ["4", "Science"],
  ["5", "Software development"],
  ["5", "Economics"],
  ["5", "Mathematics"],
];

const getIntersectionOfTwoArrays = (arrA: Subject[], arrB: Subject[]): Subject[] => {
  if (arrA.length < arrB.length) {
    [arrA, arrB] = [arrB, arrA];
  }
  return arrA.filter((elem: Subject): boolean => arrB.includes(elem));
}

const studentUniqueIds: StudentId[] = Array.from(new Set(
  input.map((inputRecord) => inputRecord[0]).sort()
));

const getFullSubjectsArrayByStudentId = (id: StudentId, input: Input): Subject[] => {
  return input.filter((inputRecord: InputRecord) => {
    if (inputRecord[0] === id) {
      return inputRecord[1];
    }
  }).map(inputRecord => inputRecord[1]);
}

const getAggregateObjectWhereStudentIdMatchesFullSubjectsArray = (uniqueIds: StudentId[], input: Input): Record<StudentId, Subject[]> => { // TODO rename refactor
  return uniqueIds.reduce((aggregateObject: Record<StudentId, Subject[]>, id: StudentId) => {
    aggregateObject[id] = getFullSubjectsArrayByStudentId(id, input);
    return aggregateObject;
  }, {} as Record<StudentId, Subject[]>);
}

const getOutput = (input: Input): Record<OutputStudentIds, Subject[]> => {

  const objectStudent = getAggregateObjectWhereStudentIdMatchesFullSubjectsArray(studentUniqueIds, input);

  return studentUniqueIds.reduce((output: Record<OutputStudentIds, Subject[]>, idA: StudentId, index: number, ids: StudentId[]) => {
    const restIds: StudentId[] = ids.slice(index + 1);
    restIds.reduce((output: Record<OutputStudentIds, Subject[]>, idB: StudentId) => {
      output[`${idA},${idB}`] = getIntersectionOfTwoArrays(objectStudent[idA], objectStudent[idB]);
      return output;
    }, output as Record<OutputStudentIds, Subject[]>);
    return output;
  }, {} as Record<OutputStudentIds, Subject[]>)
}

console.log(getOutput(input));

