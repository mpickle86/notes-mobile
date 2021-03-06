import React from "react";
import {View, ScrollView, Text} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import NotesListItem from "./NotesListItem";

function NotesList(props) {
  const styles = props.styles;
  let sortedNotes = [];

  switch (props.sortBy) {
    case "modified-desc":
      sortedNotes = props.notes.sort((a, b) => {
        return a.lastUpdated < b.lastUpdated;
      });
      break;
    case "modified-asc":
      sortedNotes = props.notes.sort((a, b) => {
        return a.lastUpdated > b.lastUpdated;
      });
      break;
    case "created-desc":
      sortedNotes = props.notes.sort((a, b) => {
        return a.id < b.id;
      });
      break;
    case "created-asc":
      sortedNotes = props.notes.sort((a, b) => {
        return a.id > b.id;
      });
      break;
    case "alph":
      sortedNotes = props.notes.sort((a, b) => {
        return a.title[0] > b.title[0];
      });
      break;
    case "alph-reverse":
      sortedNotes = props.notes.sort((a, b) => {
        return a.title[0] < b.title[0];
      });
      break;
    default:
      sortedNotes = props.notes.sort((a, b) => {
        return a.lastUpdated < b.lastUpdated;
      });
      break;
  }

  const notesListItems = sortedNotes.map(item => {
    return (
      <NotesListItem
        key={item.id}
        note={item}
        styles={styles}
        handleOpenEditor={props.handleOpenEditor}
        handleOpenDeleteModal={props.handleOpenDeleteModal}
      />
    );
  });  

  return (
    <View style={styles.listContainer}>
      
      <ScrollView style={styles.list}>
        {notesListItems}
      </ScrollView>
      <TouchableOpacity
          style={styles.createNoteButton}
          onPress={props.handleOpenEditor}
        >
          <Text style={styles.createNoteButtonText}>+</Text>
      </TouchableOpacity>
    </View>
    
  );
}

export default NotesList;