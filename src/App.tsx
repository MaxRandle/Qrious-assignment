import React from "react";
import Tree from "./Tree";
import Person from "./interfaces/Person.interface";
import { familyTree } from "./data";

function App() {
  const checkMatchingChildren = (person1: Person, person2: Person): Boolean => {
    // check if two people have the same children
    if (person1.id === person2.id) {
      throw new Error("person1 and person2 are the same person");
    }
    if (person1.children.length !== person2.children.length) {
      return false;
    }

    const sorted1 = person1.children.sort((a: number, b: number): number => a - b);
    const sorted2 = person2.children.sort((a: number, b: number): number => a - b);

    for (let i = 0; i < sorted1.length; i++) {
      if (sorted1[i] !== sorted2[i]) {
        return false;
      }
    }
    return true;
  };

  const findSpouse = (person: Person, people: Array<Person>): Person | undefined => {
    // spouse if they both have the same children
    let spouse: Person | undefined;
    // can't have a spouse if they have no children
    if (person.children.length === 0) {
      return undefined;
    }

    // remove person from tree so that it wont try to match with itself
    const filteredPeople = people.filter((p: Person): Boolean => p !== person);

    const spouseFound = filteredPeople.some(
      (potentialSpouse: Person): Boolean => {
        spouse = potentialSpouse;
        return checkMatchingChildren(person, potentialSpouse);
      }
    );
    return spouseFound ? spouse : undefined;
  };

  const familyTreeWithSpouses = familyTree.map(
    (person: Person, idx: number): Person => {
      const spouse = findSpouse(person, familyTree);
      return { ...person, spouseId: spouse ? spouse.id : undefined };
    }
  );

  return (
    <div>
      <Tree people={familyTreeWithSpouses} />
    </div>
  );
}

export default App;
