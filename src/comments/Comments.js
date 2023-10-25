import { useState, useEffect } from "react";
import { call } from "../service/api-service";
import '../App.css';
import Comment from "./Commnet";
import CommentForm from "./CommentForm";
import Info from "../components/Info";

const Comments = () => {
    const [backendComments, setBackendComments] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const rootComments = backendComments.filter(
        (backendComment) => backendComment.parentId === 0
    );
    const getReplies = (commentId) =>
        backendComments
            .filter((backendComment) => backendComment.parentId === commentId)
            .sort(
                (a, b) =>
                    new Date(a.lastModifiedDate).getTime() - new Date(b.lastModifiedDate).getTime()
            );

    useEffect(() => {
        call("/member", "GET", null)
            .then((response) => {
                setCurrentUser(response);
            })
            .catch((error) => { console.log(error.errorMessage) });
        // 초기 캐릭터 정보 불러오기
        call("/comments", "GET", null)
            .then((response) => {
                setBackendComments(response);
            })
            .catch((error) => { console.log(error.errorMessage) });

    }, []);

    const addComment = (text, parentId = null) => {
        const updateContent = {
            body: text,
            parentId: parentId
        };
        call("/comments", "POST", updateContent)
            .then((response) => {
                setBackendComments(response);
                setActiveComment(null);
            })
            .catch((error) => { console.log(error.errorMessage) });
    };

    const updateComment = (text, commentId) => {
        const updateContent = {
            body: text,
            id: commentId
        };
        call("/comments", "PATCH", updateContent)
            .then((response) => {
                setBackendComments(response);
                setActiveComment(null);
            })
            .catch((error) => {
                console.log(error.errorMessage)
            });
    };

    const deleteComment = (commentId) => {
        const updateContent = {
            id: commentId,
        };
        if (window.confirm("삭제하시겠습니까?")) {
            call("/comments", "DELETE", updateContent)
                .then((response) => {
                    setBackendComments(response);
                })
                .catch((error) => { console.log(error.errorMessage) });
        }
    };

    return (
        <div className="comments">
            {/* 
                p.big - 제일 큰 공지
                p.date - 날짜
                div.cont - 내용
                p.update - 개발 예정
                p.modify - 수정 예정
            */}
            <div class="noticeBox box01">
                <p class="notice">공지사항</p>
                <div class="cont">
                    의견주신 많은 분들 다들 너무 감사합니다. 최대한 빠르게 업데이트 하도록 해보겠습니다.
                </div>
            </div>

            <div class="noticeBox box02">
                <p class="update">개발 중</p>
                <div class="cont">
                    <ul>
                        <li>주간 에포나/토벌전 등 원정대 단위 숙제 추가</li>
                        <li>기록남기기 - 숙제로 얻은 수익을 기록하여 그래프 혹은 표로 표시</li>
                        <li>데이터보기 - 일일숙제로 얻는 재화량 통계와 현재 경매장 시세를 확인</li>
                    </ul>
                </div>
            </div>

            <div class="noticeBox box03">
                <p class="modify">수정 중(현상 확인 중)</p>
                <div class="cont">
                    <ul>
                        <li>도가토 주간 리셋 확인 중</li>
                        <li>주간 숙제 완료 시 수치가 초과되거나 적은 문제 확인 중</li>
                    </ul>
                </div>
            </div>

            <div class="noticeBox box04">
                <p class="update">수정 완료</p>
                <div class="cont">
                    <div class="flex">
                        <p class="date">2023.10.18</p>
                        <p class="txt">디자인 리뉴얼 되었습니다. 도움을 주신 퍼블리셔님 감사합니다</p>
                    </div>
                    <Info />
                </div>
            </div>

            <div class="noticeBox box05">
                <CommentForm submitLabel="작성하기" handleSubmit={addComment} />
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

export default Comments;