import React from "react";
import Person from "./interfaces/Person.interface";
import { Card, CardContent, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

const DisplayPerson: React.FC<Person> = ({ children, gender, id, name, parents, spouseId, ...rest }) => {
  const backgroundColor: string = gender === "male" ? "lightblue" : "lightpink";

  return (
    <Card {...rest} style={{ backgroundColor }}>
      <CardContent>
        <ListItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText>{name}</ListItemText>
        </ListItem>
      </CardContent>
    </Card>
  );
};
export default DisplayPerson;
