import React, { useEffect, useRef } from 'react';

const KaKaoAd = ({unit, width, height}) => {
    const KakaoLoadOne=()=>{
        let ins = document.createElement('ins');
        let scr = document.createElement('script');
    
        ins.className = 'kakao_ad_area';
        ins.style = "display:none; width:100%;";
        scr.async = 'true';
        scr.type = "text/javascript";
        scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
        ins.setAttribute('data-ad-width', width);
        ins.setAttribute('data-ad-height', height);
        ins.setAttribute('data-ad-unit', unit);
    
        document.querySelector('.adfitOne').appendChild(ins);
        document.querySelector('.adfitOne').appendChild(scr);
      }

    useEffect(() => {
        KakaoLoadOne();
    }, []);

    return (
        <div className='adfitOne'></div>
    );
};

export default KaKaoAd;