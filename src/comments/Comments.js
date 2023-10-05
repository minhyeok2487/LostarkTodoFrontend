import { useState, useEffect } from "react";
import { call } from "../service/api-service";
import './Comments.css';
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
            <div>
                <h3 style={{ margin: 0 }}>2023.10.05</h3>
                <strong>
                    <li>주간숙제 관리를 리뉴얼중입니다.</li>
                    <li>API KEY 업데이트 기능을 추가하였습니다. (캐릭터 업데이트 기능 사용시 API KEY가 필요합니다.)</li>
                    <li>중복 캐릭터 삭제 기능을 추가하셨습니다.</li>
                    <li>회원가입시 중복으로 가입되는 문제를 수정하였습니다.</li>
                </strong>
            </div>
            <Info />

            <div>
                <h3>개발 예정</h3>
                <ul>
                    <li><strong>주간 에포나, 토벌전 등 원정대 단위 숙제 추가</strong></li>
                    <li><strong>2주 쿨타임 레이드 체크</strong> - 사람들마다 플레이하는 방식이 달라, 최대한 많은 분들의 요구사항을 만족할 수 있고 편하게 쓰실 수 있는 방법을 고안중입니다.(좀 걸릴것 같습니다..ㅠㅠ) </li>
                    <li><strong>기록남기기</strong> - 숙제로 얻은 수익을 기록하여 그래프 혹은 표로 볼 수있게 하려고 합니다. </li>
                    <li><strong>데이터보기</strong> - 일일숙제로 얻는 재화량 통계와 현재 경매장 시세를 확인할 수 있게 하려고 합니다. </li>
                </ul>
            </div>
            <h3 className="comments-title">방명록</h3>
            <div className="comment-form-title">
                <p>하고싶으신 말씀 남겨주시면 됩니다</p>
            </div>
            <CommentForm submitLabel="Write" handleSubmit={addComment} />
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
    );
};

export default Comments;