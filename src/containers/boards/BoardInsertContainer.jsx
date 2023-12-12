import React, {useEffect} from 'react';
import * as boards from '../../apis/boards';
import BoardInsertForm from '../../components/boards/BoardInsertForm';
import {useNavigate} from 'react-router-dom';

// 게시글 등록 
const BoardInsertContainer = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if (accessToken === null || !accessToken) {
            alert("로그인 후 이용해주세요!");
            navigate("/login");
        }
    }, []);

    const onInsert = async (title, content) => {
        try {
            const response = await boards.insert(title, content);
            alert("등록 완료");

            // -> 게시글 목록 이동
            navigate('/boards');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <BoardInsertForm onInsert={onInsert}/>
    );
};

export default BoardInsertContainer;