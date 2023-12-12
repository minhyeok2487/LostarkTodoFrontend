import React from 'react';
import { Link, useParams } from 'react-router-dom';

/*게시글 수정 - 미개발*/
const BoardUpdateContainer = () => {
    const { no } = useParams(); //url경로에 있는 param
    return (
        <div>
            <h1>게시글 조회</h1>
            <h3>번호 {no}</h3>
            <Link to='/boards'>목록</Link>
            <hr />
        </div>
    );
};

export default BoardUpdateContainer;