import React from 'react';
import Comment from '../../comments/Commnet';
import CommentInsertForm from './CommentInsertForm';

const CommentList = ({ 
    addComment,
    rootComments,
    getReplies,
    activeComment,
    setActiveComment,
    deleteComment,
    updateComment,
    currentUser
}) => {
    return (
        <div className="comments">
            {/* 
                p.big - 제일 큰 공지
                p.date - 날짜
                div.cont - 내용
                p.update - 개발 예정
                p.modify - 수정 예정
            */}

            <div className="noticeBox box02">
                <p className="update">개발 예정</p>
                <div className="cont">
                    <ul>
                        <li>카게, 모험섬, 필보, 로웬 주간퀘 등 - 페이지를 따로 분리할 예정입니다.</li>
                        <li>기록남기기 - 숙제로 얻은 수익을 기록하여 그래프 혹은 표로 표시</li>
                        <li>데이터보기 - 일일숙제, 큐브로 얻는 재화량 통계와 현재 경매장 시세를 확인, 귀속 재료도 수익확인</li>
                        <li>캐릭터 info - 로아와, 클로아, 일로아와 유사한 기능</li>
                    </ul>
                </div>
            </div>

            {/* <div className="noticeBox box03">
                <p className="modify">수정 중(현상 확인 중)</p>
                <div className="cont">
                    <ul>
                        <li>간혈적으로 체크된 상태로 보이는데 주간 수익에 포함이 되지 않아 퍼센트가 100%되지 않는 문제가 있습니다.</li>
                    </ul>
                </div>
            </div> */}
            <div className="noticeBox box05">
                <CommentInsertForm submitLabel="작성하기" handleSubmit={addComment} />
                <div className="comments-container">
                    {rootComments.map((rootComment) => (
                        <Comment
                            key={rootComment.id}
                            comment={rootComment}
                            replies={getReplies(rootComment.id)}
                            activeComment={activeComment}
                            setActiveComment={setActiveComment}
                            addComment={addComment}
                            deleteComment={deleteComment}
                            updateComment={updateComment}
                            currentUser={currentUser}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommentList;