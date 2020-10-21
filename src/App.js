import React from 'react';
import firebase from 'firebase';
import Layout from './layout/layout';
import Sider from './sider/sider';
import Main from './main/main';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            notes: [],
            selectedNote: { id: "", title: "", content: "" },
            isFolded: false,
        };
        this.foldSider = this.foldSider.bind(this);
        this.selectNote = this.selectNote.bind(this);
    }

    render() {
        return (
            <Layout>
                <Sider
                    notes={this.state.notes}
                    selectedNote={this.state.selectedNote}
                    onSelect={this.selectNote}
                    onNewNote={this.newNote}
                    onDeleteNote={this.deleteNote}
                    isFolded={this.state.isFolded}
                ></Sider>
                <Main
                    note={this.state.selectedNote}
                    onFold={this.foldSider}
                    isFolded={this.state.isFolded}
                    noteUpdate={this.noteUpdate}
                ></Main>
            </Layout>
        )
    }

    selectNote(note) {
        this.setState({
            selectedNote: note,
        })
    }

    foldSider() {
        this.setState({
            isFolded: !this.state.isFolded,
        })
    }

    noteUpdate(id, noteObj) {
        firebase
            .firestore()
            .collection('notes')
            .doc(id)
            .update({
                title: noteObj.title,
                content: noteObj.content,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
    }

    newNote = async (title) => {
        let note = {
            id: '',
            title: title,
            content: '',
        };
        await firebase
            .firestore()
            .collection('notes')
            .add({
                title: note.title,
                content: note.content,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        this.setState({
            selectedNote: note,
        });
    }

    deleteNote = async (note) => {
        await this.setState({ notes: this.state.notes.filter(_note => _note.id !== note.id) });
        if (this.state.selectedNote.id === note.id) {
            this.setState({ selectedNote: { id: "", title: "", content: "" } });
        };

        firebase
            .firestore()
            .collection('notes')
            .doc(note.id)
            .delete();
    }

    componentDidMount() {
        firebase
            .firestore()
            .collection('notes')
            .onSnapshot(serverUpdate => {
                const notes = serverUpdate.docs.map(_doc => {
                    const data = _doc.data();
                    data['id'] = _doc.id;
                    return data;
                });
                this.setState({ notes: notes });
            });
    }
}

export default App;
