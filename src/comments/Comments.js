import { useState, useEffect } from "react";
import { call } from "../service/api-service";
import '../App.css';
import Comment from "./Commnet";
import CommentForm from "./CommentForm";
import Info from "../components/Info";
import DiscordIcon from "../icons/DiscordIcon";

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
            <div className="noticeBox box01">
                <p className="notice">공지사항</p>
                <div className="cont">
                    <ul>
                        <li>개발자 : <DiscordIcon /> 마볼링#2884</li>
                        <li>UI담당자 : <DiscordIcon /> 얀비#7431</li>
                    </ul>
                </div>
                <div className="cont">의견주신 많은 분들 다들 너무 감사합니다. 최대한 빠르게 업데이트 하도록 해보겠습니다.</div>
            </div>

            <div className="noticeBox box02">
                <p className="update">개발 중</p>
                <div className="cont">
                    <ul>
                        <li>기록남기기 - 숙제로 얻은 수익을 기록하여 그래프 혹은 표로 표시</li>
                        <li>데이터보기 - 일일숙제로 얻는 재화량 통계와 현재 경매장 시세를 확인</li>
                    </ul>
                </div>
            </div>

            <div className="noticeBox box03">
                <p className="modify">수정 중(현상 확인 중)</p>
                <div className="cont">
                    <ul>
                        <li>캐릭터 출력기능 변경 페이지, 큐브 티켓 디자인 작업</li>
                        <li>주간 숙제 완료 시 수치가 초과되거나 적은 문제 확인 중</li>
                        <li>카멘 하드12 노말3관 설정시 오류 확인중</li>
                    </ul>
                </div>
            </div>

            <div className="noticeBox box04">
                <p className="update">수정 완료</p>
                <div className="cont">
                    <div className="flex">
                        <p className="date">2023.10.29</p>
                        <p className="txt">
                            <ul>
                                <li>큐브 티켓 메모(카던/가토처럼 수익 계산과 함께 추가) 기능이 추가되었습니다</li>
                            </ul>
                        </p>
                    </div>
                    <Info />
                </div>
            </div>

            <div className="noticeBox box05">
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