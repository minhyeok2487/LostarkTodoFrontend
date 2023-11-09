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
                <div className="cont">
                    <p>사용해주시고 많은 의견주셔서 너무 감사합니다. 최대한 빠르게 업데이트 하도록 해보겠습니다.</p>
                    <p>11.08 숙제 초기화 오류 안내</p>
                    <ul>
                        <li>초기화를 한번에 하는데, 데이터가 많아져서 메모리 부족 현상이 발생하였습니다.</li>
                        <li>그로인해 금일 일일숙제, 주간숙제 초기화가 안되었습니다. 불편을 드려 죄송합니다.</li>
                    </ul>
                    {/* <ul>
                        <li>서버에 접속이 안되는 경우, 보통 업데이트 중이므로 1~2분 후 접속이 가능합니다.</li>
                        <li>슬라임/메데이아의 경우 서버별로 다르고, 길드가 직접 운영하기 때문에 추가가 어려울 것 같습니다</li>
                    </ul> */}
                </div>
            </div>

            <div className="noticeBox box02">
                <p className="update">개발 예정</p>
                <div className="cont">
                    <ul>
                        <li>카게, 모험섬, 필보, 로웬 주간퀘 등 - 페이지를 따로 분리할 예정입니다.</li>
                        <li>기록남기기 - 숙제로 얻은 수익을 기록하여 그래프 혹은 표로 표시</li>
                        <li>데이터보기 - 일일숙제, 큐브로 얻는 재화량 통계와 현재 경매장 시세를 확인, 귀속 재료도 수익확인</li>
                        <li>친구 요청 및 등록 - 친구 등록시 친구의 주간숙제를 플레이 여부를 확인할 수 있습니다.</li>
                        <li>부계정 추가 - 여러가지로 엮인게 많아 시간이 좀 걸릴거같습니다.</li>
                        <li>캐릭터 info - 로아와, 클로아, 일로아와 유사한 기능</li>
                    </ul>
                </div>
            </div>

            <div className="noticeBox box03">
                <p className="modify">수정 중(현상 확인 중)</p>
                <div className="cont">
                    <ul>
                        <li>간혈적으로 체크된 상태로 보이는데 주간 수익에 포함이 되지 않아 퍼센트가 100%되지 않는 문제가 있습니다.</li>
                    </ul>
                </div>
            </div>

            <div className="noticeBox box04">
                <p className="update">수정 완료</p>
                <div className="cont">
                    <div className="flex">
                        <p className="date">2023.11.10</p>
                        <p className="txt">
                            <ul>
                                <li>일일 숙제 체크시 휴식게이지가 즉각 차감됩니다.</li>
                                <li>단 체크를 해제할 시 휴식게이지 재입력전까지 수익이 다를 수 있습니다.</li>
                                <li>서버 최적화 작업을 진행하였습니다</li>
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