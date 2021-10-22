const input = [
["1", "Economics"],
["1", "Software development"],
["2", "Science"],
["3", "Software development"],
["4", "Science"],
["5", "Software development"],
["5", "Economics"],
["5", "Mathematics"],
];

const output = {
"1,2": [],
"1,3": ["Software development"],
"1,4": [],
"1,5": ["Economics", "Software development"],
"2,3": [],
"2,4": ["Science"],
"2,5": [],
"3,4": [],
"3,5": ["Software development"],
"4,5": [],
};

input — пары из айди студента и предмета
output — обьект где ключами являются пары студентов в формате ${studentIdA},${sutendIdB}
значения это общие для студентов предметы
если у студентов нет общих предметов — оставить пустой массив
важно: не должно быть повторений пар студентов по типу '1,2' и '2,1'
