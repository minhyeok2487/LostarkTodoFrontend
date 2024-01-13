import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as boards from "../../apis/boards";

const BoardInsert = () => {
    // state 설정
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // useNavigate 사용
    const navigate = useNavigate();
    const onInsert = async (title, content) => {
        try {
            const response = await boards.insert(title, content);
            alert("등록 완료");

            // -> 게시글 목록 이동 (히스토리 저장X)
            navigate('/boards');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <h1>게시글 등록</h1>
            <table>
                <tbody>
                    <tr>
                        <td>제목</td>
                        <td>
                            <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>
                            <textarea cols='40' rows='5' value={content} onChange={e => setContent(e.target.value)} />
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

export default BoardInsert;