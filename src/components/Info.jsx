import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
function Info() {
    return (

        <div className="pathNote" style={{ maxHeight: 500, overflow: "auto" }}>
            <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography style={{ fontWeight: "bold" }}>전체 패치노트 보기</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <ul className="pathDetail">
                            <li>
                                <p className="date">2023.11.28</p>
                                <ul>
                                    <li>깐부(친구) 개발중입니다.</li>
                                    <li>전체적인 디자인을 수정하였습니다.</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.11.18</p>
                                <ul>
                                    <li>깐부(친구) 개발중입니다.</li>
                                    <li>일일 숙제, 레이드, 주간 숙제 체크 권한으로 상대방에게 권한을 줄 수 있습니다.</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.11.12</p>
                                <ul>
                                    <li>깐부(친구)추가 기능 개발중입니다.</li>
                                    <li>현재 상대방이 요청을 수락하면 보는건 가능합니다.</li>
                                    <li>추가적인 수정 권한, 공유 내용 선정 기능 개발중입니다.</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.11.10</p>
                                <ul>
                                    <li>일일 숙제 체크시 휴식게이지가 즉각 차감됩니다.</li>
                                    <li>단 체크를 해제할 시 휴식게이지 재입력전까지 수익이 다를 수 있습니다.</li>
                                    <li>카오스던전 1수만 해도 일일 수익이 증가되도록 변경하였습니다.</li>
                                    <li>서버 최적화 작업을 진행하였습니다</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.11.07</p>
                                <ul>
                                    <li>이전 관문이 없어서 주간 레이드 체크시 에러가 발새되는 문제를 해결하였습니다.</li>
                                    <li>주간 레이드 체크 우클릭시 전주에 한 2주기 레이드가 체크되어서 주간 수익이 초과되는 문제를 해결하였습니다.</li>
                                    <li>캐릭터 정보 업데이트시 미출력 캐릭터 출력되는 문제를 해결하였습니다.</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.10.31</p>
                                <ul>
                                    <li>주간 숙제 완료 시 수치가 초과되는 문제를 해결하였습니다</li>
                                    <li>캐릭터 출력기능 변경 페이지, 큐브 티켓 디자인이 리뉴얼 되었습니다.</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.10.29</p>
                                <ul>
                                    <li>캐릭터 출력 내용 수정 디자인 1차 수정</li>
                                    <li>큐브 티켓 메모(카던/가토처럼 수익 계산과 함께 추가) 기능이 추가</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.10.26</p>
                                <ul>
                                    <li>방명록 디자인 리뉴얼 및 각종 버그 수정</li>
                                    <li>도가토 주간 리셋 수정되었습니다</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.10.18</p>
                                <ul>
                                    <li>디자인 리뉴얼</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.10.14</p>
                                <ul>
                                    <li>캐릭터 업데이트 기능이 수정되었습니다. 캐릭터 닉네임이 변경되도 정상 작동됩니다.</li>
                                    <li>에포나의뢰가 휴식게이지 계산방식으로 변경되었습니다</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.10.11</p>
                                <ul>
                                    <li>주간숙제 관리 버전이 리뉴얼 되었습니다.</li>
                                    <li>우클릭시 전체 체크/해제 됩니다. (이경우 이전버전과 똑같아서 이전 버전은 내리겠습니다.)</li>
                                    <li><a href='https://www.inven.co.kr/board/lostark/4821/94498'>2주 쿨타임레이드의 경우 출력/미출력 변경됩니다(자세한 내용은 인벤게시글을 참고해주세요)</a></li>
                                    <li>주간숙제 간단한 메시지 기록을 수정했습니다.</li>
                                    <li>다크모드를 추가했습니다.</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.10.10</p>
                                <ul>
                                    <li>주간숙제 관리 버전이 리뉴얼 되었습니다.</li>
                                    <li>우클릭시 전체 체크/해제 됩니다.(전체가 체크되야 주간수익에 들어갑니다. 이부분은 추후 수정하겠습니다.)</li>
                                    <li>이전버전이 편하신 분은 상단 탭에서 "이전버전"에 있습니다. </li>
                                    <li>2주 쿨타임레이드의 경우 출력/미출력 변경됩니다(자세한 내용은 인벤에 올리겠습니다.)</li>
                                    <li>일주일 넘기기 테스트 버튼으로 테스트를 해보시고 버그가 있다면 제보해주시면 감사하겠습니다.(11일 수요일 패치전에 삭제할 예정입니다.)</li>
                                    <li>휴식게이지가 10일때 줄어드는 경우를 수정했습니다.</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.10.05</p>
                                <ul>
                                    <li>주간숙제 관리를 리뉴얼중입니다.</li>
                                    <li>API KEY 업데이트 기능을 추가하였습니다.<br />(캐릭터 업데이트 기능 사용시 API KEY가 필요합니다.)</li>
                                    <li>중복 캐릭터 삭제 기능을 추가하셨습니다.</li>
                                    <li>회원가입시 중복으로 가입되는 문제를 수정하였습니다.</li>
                                    <li>휴식게이지가 10일때 줄어드는 경우를 수정했습니다.</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.10.01</p>
                                <ul>
                                    <li>캐릭터 업데이트 기능이 수정되었습니다. 화면 오른쪽 하단 "+"버튼에서 사용하실 수 있습니다</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.09.30</p>
                                <ul>
                                    <li>임시 캐릭터 출력 선택 기능이 추가되었습니다<br />
                                        오른쪽하단 "+"버튼을 통해 캐릭터마다 출력하고 싶은 내용을 선택할 수 있습니다.<br />
                                        주간 에포나, 토벌전 등 여러가지 숙제 추가 후 추가 업데이트 하겠습니다.</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.09.28</p>
                                <ul>
                                    <li>전체적인 디자인 수정이 되었습니다. 모바일도 어느정도 깔끔합니다(아마도..?)</li>
                                    <li>서버별 분리 기능이 추가되었습니다. 일일 수익, 주간 수익, 캐릭터 순서 변경이 서버별로 분리됩니다.</li>
                                    <li>서버별 도전 가디언 토벌/어비스 던전이 추가되었습니다. (단, 아직 주간 수익에는 포함되지 않습니다.)</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.09.22</p>
                                <ul>
                                    <li>주간숙제 간단한 메모기능을 추가하였습니다.</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.09.19</p>
                                <ul>
                                    <li>골드 획득 지정 캐릭터 기능을 추가하였습니다.<br />
                                        지정된 캐릭터만 주간숙제에 골드가 추가됩니다.(최대3개, 내림차순)</li>
                                    <li>캐릭터 정보 업데이트 기능이 수정되었습니다.<br />
                                        클릭 시 전투레벨, 아이템레벨, 캐릭터 이미지등의 데이터를 새로받아옵니다.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.09.18</p>
                                <ul>
                                    <li>일일숙제 휴식게이지 출력 디자인을 수정하였습니다. 클릭시 휴식게이지를 수정할 수 있습니다.</li>
                                    <li>캐릭터 순서 변경 기능은 화면이 일정크기 이상일때만 사용하실 수 있습니다.</li>
                                    <li>캐릭터 정보갱신 기능 수정중으로 버튼을 임시 삭제했습니다.</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.09.15</p>
                                <ul>
                                    <li>카오스던전 계몽1과 베스칼 통계데이터를 추가하였습니다.</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.09.14</p>
                                <ul>
                                    <li>모바일 사용 불편함으로 인해 캐릭터 정렬 기능을 분리하였습니다. 저장 아이콘 클릭시 변경된 순서가 저장됩니다.</li>
                                    <li>주간 숙제는 앞에서부터 6개의 캐릭터만 관리할 수 있습니다. 순서를 바꾸어도 기존에 저장된 내용을 유지합니다</li>
                                    <li>주간 수익 계산을 수정하였습니다. 앞에서부터 6개의 캐릭터만 주간 수익에 포함됩니다.</li>
                                    <li>주간 숙제를 3개 이상 추가 할 수 있습니다. 단, 3개 초과시에도 주간 수익에 포함되는건 수정중입니다.</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.09.13</p>
                                <ul>
                                    <li>주간숙제 추가/삭제와 수익을 임시 수정하였습니다.</li>
                                </ul>
                            </li>
                            <li>
                                <p className="date">2023.09.12</p>
                                <ul>
                                    <li>캐릭터 이미지 url이 없는경우 정상적으로 가입처리가 되지 않는 문제를 임시수정하였습니다.</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default Info;