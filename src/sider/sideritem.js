import React from 'react';
import {
    DeleteOutlined,
} from '@ant-design/icons';

function SiderItem(props) {
    const note = props.note;
    let isSelected = false;
    if (props.selectedNote !== null) {
        isSelected = props.selectedNote.id === note.id ? true : false;
    }
    const deleteNote = () => {
        if (window.confirm(`确认要删除: ${note.title}？`)) {
            props.onDeleteNote(note);
        }
    }
    return (
        <li className={isSelected ? "note-item selected" : "note-item"} onClick={props.onSelect}>
            <h3>{note.title}</h3>
            <p>{note.content.replace(/<[^>]*>/gm, "")}</p>
            <DeleteOutlined className="icon delete" onClick={deleteNote} />
        </ li>
    )
}

export default SiderItem;