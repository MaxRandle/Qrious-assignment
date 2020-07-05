import React from "react";
import PersonComponent from "./Person";
import Person from "./interfaces/Person.interface";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  flexRowContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  flexColumnContainer: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "stretch",
    // padding: theme.spacing(3, 0, 0, 0),
  },
  rowItem: {
    padding: theme.spacing(3, 1, 0, 1),
    flexGrow: 1,
  },
}));

interface Props {
  people: Array<Person>;
  className?: string;
}

const Tree: React.FC<Props> = ({ people, className }) => {
  const classes = useStyles();

  const findRootPair = (people: Array<Person>): Array<Person> => {
    if (people.length === 1) {
      return people;
    }
    // returns an array with one or two people
    for (let i = 0; i < people.length; i++) {
      const person = people[i];
      if (person.parents.length === 0) {
        const [spouse] = people.filter((p: Person): Boolean => p.id === person.spouseId);
        if (spouse && spouse.parents.length === 0) {
          return [person, spouse];
        }
      }
    }
    throw new Error("no root pair found");
  };

  const getChildren = (person: Person, people: Array<Person>): Array<Person> =>
    people.filter((p: Person): Boolean => person.children.includes(p.id));

  const buildSubtree = (person: Person, people: Array<Person>): Array<Person> => {
    // recursive function that builds a subtree of decendants of a given person
    let res: Array<Person> = [{ ...person, parents: [] }];

    const [spouse] = people.filter((p: Person): Boolean => p.id === person.spouseId);
    if (spouse) {
      res.push(spouse);

      const children = getChildren(person, people);
      children.forEach((child: Person): void => {
        res.push(...buildSubtree(child, people));
      });
    }
    return res;
  };

  const partitionTree = (people: Array<Person>): Array<Array<Person>> => {
    const rootPair = findRootPair(people);
    console.log("root pair", rootPair);

    const children = getChildren(rootPair[0], people);
    console.log("children", children);

    // one partition/subtree for each child of the root pair.
    const subtrees = children.map((child: Person): Array<Person> => buildSubtree(child, people));
    console.log("subtrees", subtrees);
    return subtrees;
  };

  const root = findRootPair(people);
  const subtrees = partitionTree(people);

  return (
    <div className={clsx(className, classes.flexColumnContainer)}>
      {root.map((person) => (
        <PersonComponent key={person.id} {...person} />
      ))}
      <div className={classes.flexRowContainer}>
        {subtrees.map((subtree, idx) => (
          <Tree key={idx} className={classes.rowItem} people={subtree} />
        ))}
      </div>
    </div>
  );
};

export default Tree;
