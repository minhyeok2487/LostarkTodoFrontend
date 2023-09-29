import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
function Info() {
    return (

        <div>
            <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography style={{fontWeight:"bold"}}>전체 패치노트 보기</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ margin: 20, fontWeight: 600 }}>
                        문의 사항은 디스코드 <span style={{ color: "red" }}>마볼링#2884</span>로 DM주시면 최대한 빠르게 답변해드리겠습니다.
                    </Typography>
                    <div style={{ fontWeight: 600, lineHeight: 2 }}>
                        <ul>
                            <h1>[패치노트]</h1>
                            <h3>2023.09.30</h3>
                            <li>임시 캐릭터 출력 선택 기능이 추가되었습니다<br />
                                오른쪽하단 "+"버튼을 통해 캐릭터마다 출력하고 싶은 내용을 선택할 수 있습니다.<br />
                                주간 에포나, 토벌전 등 여러가지 숙제 추가 후 추가 업데이트 하겠습니다.</li>
                            <h3>2023.09.28</h3>
                            <li>전체적인 디자인 수정이 되었습니다. 모바일도 어느정도 깔끔합니다(아마도..?)</li>
                            <li>서버별 분리 기능이 추가되었습니다. 일일 수익, 주간 수익, 캐릭터 순서 변경이 서버별로 분리됩니다.</li>
                            <li>서버별 도전 가디언 토벌/어비스 던전이 추가되었습니다. (단, 아직 주간 수익에는 포함되지 않습니다.)</li>
                            <h3>2023.09.22</h3>
                            <li>주간숙제 간단한 메모기능을 추가하였습니다.</li>
                            <h3>2023.09.19</h3>
                            <li>골드 획득 지정 캐릭터 기능을 추가하였습니다.<br />
                                지정된 캐릭터만 주간숙제에 골드가 추가됩니다.(최대3개, 내림차순)</li>
                            <li>캐릭터 정보 업데이트 기능이 수정되었습니다.<br />
                                클릭 시 전투레벨, 아이템레벨, 캐릭터 이미지등의 데이터를 새로받아옵니다.
                            </li>
                            <h3>2023.09.18</h3>
                            <li>일일숙제 휴식게이지 출력 디자인을 수정하였습니다. 클릭시 휴식게이지를 수정할 수 있습니다.</li>
                            <li>캐릭터 순서 변경 기능은 화면이 일정크기 이상일때만 사용하실 수 있습니다.</li>
                            <li>캐릭터 정보갱신 기능 수정중으로 버튼을 임시 삭제했습니다.</li>
                            <h3>2023.09.15</h3>
                            <li>카오스던전 계몽1과 베스칼 통계데이터를 추가하였습니다.</li>
                            <h3>2023.09.14</h3>
                            <li>모바일 사용 불편함으로 인해 캐릭터 정렬 기능을 분리하였습니다. 저장 아이콘 클릭시 변경된 순서가 저장됩니다.</li>
                            <li>주간 숙제는 앞에서부터 6개의 캐릭터만 관리할 수 있습니다. 순서를 바꾸어도 기존에 저장된 내용을 유지합니다</li>
                            <li>주간 수익 계산을 수정하였습니다. 앞에서부터 6개의 캐릭터만 주간 수익에 포함됩니다.</li>
                            <li>주간 숙제를 3개 이상 추가 할 수 있습니다. 단, 3개 초과시에도 주간 수익에 포함되는건 수정중입니다.</li>
                            <h3>2023.09.13</h3>
                            <li>주간숙제 추가/삭제와 수익을 임시 수정하였습니다.</li>
                            <h3>2023.09.12</h3>
                            <li>캐릭터 이미지 url이 없는경우 정상적으로 가입처리가 되지 않는 문제를 임시수정하였습니다.</li>
                        </ul>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default Info;