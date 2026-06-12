let userData = [
  {
    name: 'Jack',
    age: 20,
    height: 187,
  },
  {
    name: 'Jill',
    age: 19,
    height: 168,
  },
  {
    name: 'Jason',
    age: 23,
    height: 194,
  },
];

//////////////////// TODO: Fix the style of the code below ////////////////////

// Is there someone taller than 190cm? What about 195cm?
let flag = 1;
for (const user of userData) {
  if (user.height > 190) {
    console.log(true);
    flag = 0;
  }
}``
if (flag) {
  console.log(false);
}

// What is Jason's age?
let jason;
for (const user of userData) {
  if (user.name === 'Jason') {
    jason = user;
  }
}
console.log(`Jasons age is: ${jason.age}`);

// What's the average height of all users?
let x = 0;
for (const user in userData) {
  x += user.height;
}
let y = x / userData.length
console.log(y);
