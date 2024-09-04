// 1.Find all the topics and tasks which are thought in the month of October?
// a.topics :
db.topics.find({ date: { $regex: "2020-10-" } });

// b.tasks :
db.tasks.find({ date: { $regex: "2020-10-" } });

// 2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020?
db.company_drives.find(
  { $and: [{ date: { $gt: "2020-10-15" } }, { date: { $lt: "2020-10-31" } }] },
  { participants: 0, _id: 0 }
);

// 3.Find all the company drives and students who are appeared for the placement?
db.company_drives.find();

// 4.Find the number of problems solved by the user in codekata?
db.codekata.find({}, { name: 1, problemsSolved: 1, _id: 0 });

// 5.Find all the mentors with who has the mentee's count more than 15?
db.mentors.find(
  { menteesCount: { $gt: 15 } },
  { name: 1, menteesCount: 1, _id: 0 }
);

// 6.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020?
// a.absent : {
db.attendence.aggregate([
  {
    $match: {
      $and: [
        { absentDates: { $gt: "2020-10-15" } },
        { absentDates: { $lt: "2020-10-31" } },
      ],
    },
  },

    { $count : "UsersAbsent" }
]);

// b.Task Not Submitted :
db.tasks.aggregate([
  {
    $match: {
      $and: [
        { date: { $gt: "2020-10-15" } },
        { date: { $lt: "2020-10-31" } },
        { isCompleted: false },
      ],
    },
  },
  {
    $group: {
      _id: "$title",
      NotSubmitted: {
        $count: {},
      },
    },
  },
  {
    $project: {
      title: "$_id",
      NotSubmitted: 1,
      _id: 0,
    },
  },
]);
