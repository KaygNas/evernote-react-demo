import React from 'react';
import Quill from 'react-quill';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import { debounce } from "../utils";
import "./quill.snow.css";
import "./style.scss";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.note.id,
            title: props.note.title,
            content: props.note.content,
            onFold: props.onFold,
            noteUpdate: props.noteUpdate,
        }

        this.updateContent = this.updateContent.bind(this);
    }

    componentDidUpdate() {
        if (this.props.note.id !== this.state.id) {
            this.setState({
                id: this.props.note.id,
                title: this.props.note.title,
                content: this.props.note.content,
            })
        }
    }

    updateTitle = async (title) => {
        await this.setState({
            title: title,
        });
        this.updateDate();
    }

    updateContent = async (content) => {
        await this.setState({
            content: content,
        });
        this.updateDate();
    }

    updateDate = debounce(() => {
        if (this.state.id) {
            this.state.noteUpdate(this.state.id, {
                title: this.state.title,
                content: this.state.content,
            })
        }
    }, 1000)

    render() {
        const icon = this.props.isFolded ? <MenuUnfoldOutlined></MenuUnfoldOutlined> : <MenuFoldOutlined></MenuFoldOutlined>;
        return (
            <section className="main">
                <header>
                    <span className="fold-icon" onClick={this.state.onFold}>{icon}</span>
                    <input type="text" value={this.state.title} onChange={(e) => { this.updateTitle(e.target.value) }} />
                </header>
                <Quill className="editor" value={this.state.content || ""} onChange={this.updateContent}></Quill>
            </section>
        )
    }

}

export default Main;