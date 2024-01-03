import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from "../../config/api-config";


const NotificationComponent = () => {
    const [currentUserCount, setCurrentUserCount] = useState(0);

    useEffect(() => {
        // 로컬 스토리지에서 username 가져오기
        const username = localStorage.getItem("username");
        var link = API_BASE_URL + "/v3/notification";
        if (username) {
            link += `?username=${username}`;
        } 

        // EventSource를 통해 SSE 연결
        const eventSource = new EventSource(link);

        // 이벤트 리스너 등록
        eventSource.addEventListener("message", (event) => {
            try {
                const parsedData = JSON.parse(event.data);
                setCurrentUserCount(parsedData);
            } catch (error) {
                console.error("Error parsing data:", error);
            }
        });

        // 컴포넌트가 언마운트될 때 EventSource 닫기
        return () => {
            eventSource.close();
        };
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

    return (
        <span style={{color:"var(--text-color)"}}>[실시간 접속자수 : {currentUserCount} 명]</span>
    );
};

export default NotificationComponent;
