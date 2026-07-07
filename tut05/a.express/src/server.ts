import express, { json, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { port, url } from './config.json';
import {
  clear,
  peopleAdd,
  personView,
  personEdit,
  peopleList,
  personRemove,
  peopleStats,
} from './people';

const app = express();

// Use middleware that allows for access from other domains (needed for frontend to connect)
app.use(cors());
// Use middleware that allows us to access the JSON body of requests
app.use(json());
// Use middleware to log (print to terminal) incoming HTTP requests (OPTIONAL)
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the root URL of names ages!' });
});

app.post("/people/add", (req: Request, res: Response) => {
  // get the parameters from request body
  console.log(req.body)
  const { name, age } = req.body;
  // call the function to do the thing
  const result = peopleAdd(name, age);
  // handle error cases
  if ('error' in result) {
      res.status(400);
  }
  res.json(result);
});

app.get("/people/list", (req: Request, res: Response) => {
  const minAge = parseInt(req.query.minAge as string);
  const result = peopleList(minAge);
  if ("error" in result) {
    res.status(400);
  }
  res.json(result);
});

app.get("/person/:personid", (req: Request, res: Response) => {
  const personId = parseInt(req.params.personid as string);
  console.log(personId)
  const result = personView(personId);
  if ("error" in result) {
    res.status(400);
  }
  res.json(result);
});

app.put("/person/:personid", (req: Request, res: Response) => {
  const personId = parseInt(req.params.personid as string);
  const { name, age } = req.body;
  const result = personEdit(personId, name, age);
  // handle error cases
  if ("error" in result) {
    res.status(400);
  }
  res.json(result);
});

app.delete("/person/:personid", (req: Request, res: Response) => {
  const personId = parseInt(req.params.personid as string);
  const result = personRemove(personId);
  // handle error cases
  if ("error" in result) {
    res.status(400);
  }
  res.json(result);
});

app.get("/people/stats", (req: Request, res: Response) => {
  const result = peopleStats();
  if ("error" in result) {
    res.status(400);
  }
  res.json(result);
});

app.delete("/clear", (req: Request, res: Response) => {
  const result = clear();
  res.json(result);
});

app.listen(port, () => {
  console.log(`Express Server started and awaiting requests at the URL: '${url}:${port}'`);
});
