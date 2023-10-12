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
            <div>
                <h3>업데이트 느려서 죄송합니다ㅠㅠ</h3>
                <p>"캐릭터 데이터 업데이트"안되는 경우가 종종있어 수정중인데 케이스가 많아 시간이 걸릴꺼같습니다.</p>
                <p>의견주신 많은 분들 다들 너무 감사합니다. 최대한 빠르게 업데이트 하도록 해보겠습니다.</p>
            </div>
            <div>
                <h3 style={{ margin: 0 }}>2023.10.11</h3>
                <strong>
                    <li>주간숙제 관리 버전이 리뉴얼 되었습니다.</li>
                    <li>주간숙제 골드가 관문별로 증가 됩니다</li>
                    <li>우클릭시 전체 체크/해제 됩니다. (이 경우 이전버전과 똑같아서 이전 버전은 내리겠습니다.)</li>
                    <li><a href='https://www.inven.co.kr/board/lostark/4821/94498'>2주 쿨타임레이드의 경우 출력/미출력 변경됩니다(자세한 내용은 인벤게시글을 참고해주세요)</a></li>
                    <li>주간숙제 간단한 메시지 기록을 수정했습니다.</li>
                </strong>
            </div>
            <Info />

            <div>
                <h3>개발 예정</h3>
                <ul>
                    <li><strong>주간 에포나, 토벌전 등 원정대 단위 숙제 추가</strong></li>
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