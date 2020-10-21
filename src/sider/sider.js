import React from 'react';
import SiderItem from './sideritem';
import "./style.scss"
import {
    PlusOutlined,
} from '@ant-design/icons';
import icon from "../images/evernote.png"

class Sider extends React.Component {
    constructor() {
        super();
        this.state = {
            creating: false,
        }
        this.createNewNote = this.createNewNote.bind(this);
    }

    onCreateTap = () => {
        this.setState({
            creating: !this.state.creating,
        })
    }

    createNewNote = async (e) => {
        const title = document.getElementById("newTitle").value;
        await this.props.onNewNote(title);
        this.setState({
            creating: false,
        })
    }

    render() {
        console.log("start to render sider",this.state);
        const notes = this.props.notes;
        const list = notes ?
            notes.map(note => <SiderItem
                key={note.id}
                note={note}
                selectedNote={this.props.selectedNote}
                onSelect={() => { this.props.onSelect(note) }}
                onDeleteNote={this.props.onDeleteNote}
            ></SiderItem>) :
            <li>add a new note!</li>;

        return (
            <aside className={this.props.isFolded ? "sider hiden" : "sider"}>
                <div className="topbar">
                    <img className="favicon" alt="evernote icon" src={icon}></img>
                    <span className="app-name">印象笔记 React版</span>
                </div>
                {
                    this.state.creating ?
                        <div >
                            <input id="newTitle" className="new-title" autoFocus type="text" placeholder="输入笔记标题"></input>
                            <button type="button" onClick={this.createNewNote} className="button confirm">创建</button><button type="button" className="button cancel" onClick={this.onCreateTap}>取消</button>
                        </div> :
                        <button className="button" onClick={this.onCreateTap}>
                            <PlusOutlined className="icon" />创建新笔记
                        </button>
                }
                <ul>{list}</ul>
            </aside>
        )
    }
}

export default Sider;