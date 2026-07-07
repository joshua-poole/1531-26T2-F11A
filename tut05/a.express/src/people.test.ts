import request from "sync-request-curl";
import { port, url } from "./config.json";
import { INVALID_AGE } from "./errors";
import { beforeEach, describe, expect, test } from 'vitest';

const SERVER_URL = `${url}:${port}`;

/**
 * Use the imported `request` library to send a request to the server and retrieve a response
 * Documentation: https://www.npmjs.com/package/sync-request-curl
 */

// NEW REQUESTS
type EmptyObject = Record<string, never>;

const requestClear = (): { status: number; body: EmptyObject } => {
  const res = request("DELETE", SERVER_URL + "/clear", {});
  return { status: res.statusCode, body: JSON.parse(res.body.toString()) };
};

interface ErrorReturn {
  error: string;
  message: string;
}

interface PersonAddReturn {
  personId: number;
}

const requestPeopleAdd = (name: string, age: number): { status: number; body: PersonAddReturn | ErrorReturn } => {
  const res = request("POST", SERVER_URL + "/people/add", { json: { name, age } });
  return { status: res.statusCode, body: JSON.parse(res.body.toString()) };
};

interface PeopleListReturn {
  people: {
    personId: number;
    name: string;
    age: string;
  }[];
}

const requestPeopleList = (minAge: number): { status: number; body: PeopleListReturn | ErrorReturn } => {
  const res = request("GET", SERVER_URL + "/people/list", { qs: { minAge } });
  return { status: res.statusCode, body: JSON.parse(res.body.toString()) };
};

interface PersonViewReturn {
  person: {
    personId: number;
    name: string;
    age: string;
  };
}

const requestPersonView = (personId: number): { status: number; body: PersonViewReturn | ErrorReturn } => {
  const res = request("GET", SERVER_URL + `/person/${personId}`, {});
  return { status: res.statusCode, body: JSON.parse(res.body.toString()) };
};

// Existing tests, now calling requestFunction instead of function
beforeEach(() => {
  requestClear();
});

describe("clear", () => {
  test("Test successful clear return when empty", () => {
    const res = requestClear();

    expect(res.status).toStrictEqual(200);
    expect(res.body).toStrictEqual({});
  });
});

describe("peopleAdd", () => {
  // Using raw request
  test("Test adding successful person return type", () => {
    const res = request("POST", SERVER_URL + "/people/add", { json: { name: "jill", age: 5 } });

    expect(JSON.parse(res.body.toString())).toStrictEqual({ personId: expect.any(Number) });
  });

  // Using requestWrapper (SO MUCH better, can use just like iter1)
  test("Test adding successful person return type", () => {
    const res = requestPeopleAdd("hello", 5);

    expect(res.status).toStrictEqual(200);
    expect(res.body).toStrictEqual({ personId: expect.any(Number) });
  });
});

describe("peopleList", () => {
  test("Test getting successful person details", () => {
    const person = requestPeopleAdd("hello", 5).body as PersonAddReturn;

    const res = requestPeopleList(5);

    expect(res.status).toStrictEqual(200);
    expect(res.body).toStrictEqual({
      people: [
        {
          personId: person.personId,
          name: "hello",
          age: 5,
        },
      ],
    });
  });

  test("Test INVALID_AGE error when minAge is negative", () => {
    requestPeopleAdd("hello", 5);

    const res = requestPeopleList(-5);

    expect(res.status).toStrictEqual(400);
    expect(res.body).toStrictEqual({
      error: INVALID_AGE,
      message: expect.any(String),
    });
  });
});

describe("personView", () => {
  test("Test successful person view", () => {
    const person = requestPeopleAdd("Tam", 22).body as PersonAddReturn;

    const res = requestPersonView(person.personId);

    expect(res.status).toStrictEqual(200);
    expect(res.body).toStrictEqual({
      person: {
        personId: person.personId,
        name: "Tam",
        age: 22,
      },
    });
  });
});
