export const MENU_ADMIN = [
  {
    key: "classes",
    label: "Classes",
  },
  {
    key: "user",
    label: "Users",
  },
  {
    key: "question-bank",
    label: "Question Bank",
  },
];

export const MENU_TRAINER = [
  {
    key: "classes",
    label: "Classes",
  },
  {
    key: "question-bank",
    label: "Question Bank",
  },
];

export const MENU_STUDENT = [
  {
    key: "classes",
    label: "Classes",
  },
];

export const MENU_LOGOUT = [
  {
    key: "logout",
    label: "Logout",
  },
];

export const USER_COLUMNS = [
  { title: "KTP", dataIndex: "ktp", key: "ktp", responsive: ["lg"] },
  { title: "Name", dataIndex: "name", key: "name", sorter: (a, b) => a.name.length - b.name.length, sortDirections: ["descend", "ascend"] },
  { title: "Email", dataIndex: "email", key: "email", responsive: ["lg"] },
  { title: "Phone", dataIndex: "phone", key: "phone", responsive: ["lg"] },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    responsive: ["lg"],
    filters: [
      {
        text: "Admin",
        value: "admin",
      },
      {
        text: "Trainer",
        value: "trainer",
      },
      {
        text: "Student",
        value: "student",
      },
    ],
    onFilter: (value, record) => record.role.indexOf(value) === 0,
  },
];

export const MATERIAL_COLUMNS = [
  { title: "Name", dataIndex: "name", width: "50%" },
  { title: "Status", dataIndex: "status" },
];

export const MEMBER_COLUMNS = [
  { title: "No", dataIndex: "idx" },
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Rank", dataIndex: "scoreIndex", key: "scoreIndex", sorter: (a, b) => a.scoreIndex - b.scoreIndex },
  { title: "Total Score", dataIndex: "totalScore", key: "totalScore", sorter: (a, b) => b.totalScore - a.totalScore },
  { title: "Role", dataIndex: "role", key: "role" },
]

export const QUESTION_COLUMNS = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Major", dataIndex: "major", key: "major", responsive: ["lg"] },
  { title: "Question Count", dataIndex: "questions_count", key: "questions_count" },
];

export const OPTION_ADD_USER = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "trainer",
    label: "Trainer",
  },
  {
    value: "student",
    label: "Student",
  },
];

export const OPTION_ANSWER_KEY = [
  {
    value: "a",
    label: "a",
  },
  {
    value: "b",
    label: "b",
  },
  {
    value: "c",
    label: "c",
  },
  {
    value: "d",
    label: "d",
  },
  {
    value: "e",
    label: "e",
  },
];
