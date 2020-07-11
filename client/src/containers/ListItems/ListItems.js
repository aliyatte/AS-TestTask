import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Users" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Articles" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Categories" />
    </ListItem>
  </div>
);