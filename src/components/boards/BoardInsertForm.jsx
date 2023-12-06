import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BoardInsertForm = ({ onInsert }) => {

    // state 설정
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeContent = (e) => {
        setContent(e.target.value);
    };

    return (
        <div>
            <h1>게시글 등록</h1>
            <table>
                <tbody>
                    <tr>
                        <td>제목</td>
                        <td>
                            <input type='text' value={title} onChange={handleChangeTitle} />
                        </td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>
                            <textarea cols='40' rows='5' value={content} onChange={handleChangeContent} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button onClick={() => onInsert(title, content)}>등록</button>
                <Link to="/boards">목록</Link>
            </div>
        </div>
    );
};

export default BoardInsertForm;