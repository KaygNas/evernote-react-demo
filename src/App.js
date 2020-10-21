import React from 'react';
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

    noteUpdate = (id, noteObj) => {
        let notes = [...this.state.notes];
        for (let note of notes) {
            if (note.id === id) {
                note.title = noteObj.title;
                note.content = noteObj.content;
                break;
            }
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        this.setState({
            notes: notes,
        });
    }

    newNote = (title) => {
        const note = {
            id: Date.now() + title,
            title: title,
            content: '',
        };
        let notes = [note, ...this.state.notes];
        localStorage.setItem("notes", JSON.stringify(notes));
        this.setState({
            notes: notes,
            selectedNote: note,
        });
    }

    deleteNote = async (note) => {
        await this.setState({ notes: this.state.notes.filter(_note => _note.id !== note.id) });
        let selectedNote = {};
        if (this.state.selectedNote.id === note.id && this.state.notes.length > 0) {
            selectedNote = this.state.notes[0];
        } else {
            selectedNote = { id: "", title: "", content: "" };
        };
        this.setState({ selectedNote: selectedNote });
        localStorage.setItem("notes", JSON.stringify(this.state.notes));
    }

    componentDidMount() {
        const notes = JSON.parse(localStorage.getItem("notes"));
        if (!notes) {
            localStorage.setItem("notes", JSON.stringify([]));
        }
        this.setState({ notes: notes });
    }
}

export default App;
