import { Person, getData } from './dataStore';
import { DUPLICATE_NAME, INVALID_AGE, INVALID_NAME, INVALID_PERSON_ID, NO_PEOPLE } from './errors';

///////////////////////////////////////////////////////////////////////////////

export function clear() {
  getData().people = [];
  return {};
}

export function peopleAdd(name: string, age: number) {
  const data = getData();

  if (name === '') {
    return { error: INVALID_NAME, message: 'Name is an empty string' };
  }
  if (findPersonByName(name)) {
    return { error: DUPLICATE_NAME, message: 'Name already exists.' };
  }
  if (age <= 0) {
    return { error: INVALID_AGE, message: 'Age is not strictly positive.' };
  }

  const person = { name, age, personId: data.numPeopleCreated };
  data.people.push(person);
  data.numPeopleCreated += 1;

  return { personId: person.personId };
}

export function peopleList(minAge: number) {
  const data = getData();

  if (minAge < 0) {
    return { error: INVALID_AGE, message: 'minAge must be non-negative' };
  }

  const people = data.people
    .filter(p => p.age >= minAge)
    .sort((p1, p2) => p2.age - p1.age || p1.name.localeCompare(p2.name));

  return { people };
}

export function personView(personId: number) {
  const person = findPerson(personId);

  if (person === undefined) {
    return { error: INVALID_PERSON_ID, message: 'no such person with given id' };
  }

  return { person };
}

export function personEdit(personId: number, name: string, age: number) {
  const person = findPerson(personId);
  if (!person) {
    return { error: INVALID_PERSON_ID, message: 'no such person with given id' };
  }
  if (name === '') {
    return { error: INVALID_NAME, message: 'Name is an empty string' };
  }
  if (age <= 0) {
    return { error: INVALID_AGE, message: 'Age is not strictly positive.' };
  }
  if (getData().people.find(person => person.name === name && person.personId != personId)) {
    return { error: DUPLICATE_NAME, message: 'Name already exists.' };
  }

  person.name = name;
  person.age = age;

  return {};
}

export function personRemove(personId: number) {
  if (!findPerson(personId)) {
    return { error: INVALID_PERSON_ID, message: 'person with given id does not exist' };
  }

  const data = getData();
  data.people = getData().people.filter(person => person.personId !== personId);

  return {};
}

export function peopleStats() {
  const data = getData();
  if (data.people.length === 0) {
    return { error: NO_PEOPLE, message: 'no entries available in the data store' };
  }

  return {
    stats: {
      minAge: Math.min(...data.people.map(nameAge => nameAge.age)),
      maxAge: Math.max(...data.people.map(nameAge => nameAge.age)),
      averageAge: data.people.reduce((sum, nameAge) => sum + nameAge.age, 0) / data.people.length,
    }
  };
}

///////////////////////////////////////////////////////////////////////////////

const findPerson = (personId: number): Person | undefined => {
  return getData().people.find(person => person.personId === personId);
};

const findPersonByName = (name: string): Person | undefined => {
  return getData().people.find(person => person.name === name);
};
