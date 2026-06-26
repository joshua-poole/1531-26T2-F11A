import { User, UserId, UserInfo, Error } from "./interfaces";

function sum(num1: number, num2: number): number {
  return num1 + num2;
}

function isEven(num: number): boolean {
  if (num % 2 === 0) {
    return true;
  }
  return false;
}

function sumArray(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

const users: User[] = [];

function createUser(email: string, name: string): UserId | Error {
  if (email === '' || name === '') {
    return { error: 'INVALID_DETAILS', message: 'empty email and/or name' };
  }
  
  // generates a random 5 digit number
  const id = Math.floor(Math.random() * 90000) + 10000;

  users.push({
    name: name,
    email: email,
    userId: id
  });

  return { userId: id };
}

function getUser(userId: number): UserInfo | Error {
  const user = users.find((user) => user.userId === userId);
  if (!user) {
    return { error: 'UNAUTHORISED', message: 'Invalid userId' };
  }  
  return user;
}

// console.log(sum('1', '2'));
// console.log(sum(1, 2));

// console.log(sumArray(['a', 'd', 'c']));
// console.log(sumArray([1, 2, 3, 4, 5]));

// console.log(isEven(2));
// console.log(isEven('two'));

let user1 = createUser('valid@email.com', 'userid') as UserId;
console.log(user1);
console.log(getUser(user1.userId));

// let user2 = createUser('valid2@email.com', 1337);
// console.log(user2);
// console.log(getUser(user2.userId));

// let user3 = createUser({ email: 'valid3@email.com'}, 56);
// console.log(user3);
// console.log(getUser(user3.userId));
