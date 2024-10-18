import { useEffect, useRef } from "react"
import useGame from "@/stores/useGame.jsx"

export default function Interface()
{
    const setNav = useGame((state) => state.setNav)
    const nav = useGame((state) => state.nav)
    const setMenu = useGame((state) => state.setMenu)
    const onCur = useGame((state) => state.onCur)
    const setCur = useGame((state) => state.setCur)
    const onMenu = useGame((state) => state.onMenu)

    const arrowRef = useRef()
    const navRef = useRef()
    const titleRef = useRef()
    const menuRef = useRef()
    const conTitleRef = useRef(null)
    const slideRef = useRef(null)

    const cursor = document.querySelector('.inner-cursor')

    var cnt
    let imgSlide

    function ArrowSvg(props)
    {
        let dropShadow
        if(props.sha ===1)
            dropShadow = 'drop-shadow(2px 2px 0 rgba(0,0,0,.5)'
        else if(props.sha ===2)
            dropShadow = 'drop-shadow(2px -2px 0 rgba(0,0,0,.5)'
        else if(props.sha ===3)
            dropShadow = 'drop-shadow(-2px -2px 0 rgba(0,0,0,.5)'

        return<svg style={{transform: props.rot, filter: dropShadow}} fill="#f2ffca" height="80px" width="80px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 302.816 302.816">
            <path d="M241.053,78.136c0.01-0.224,0.031-0.448,0.03-0.672c0-0.345-0.024-0.686-0.049-1.027
                c-0.01-0.141-0.01-0.283-0.023-0.424c-0.032-0.322-0.086-0.638-0.138-0.955c-0.027-0.166-0.045-0.332-0.077-0.496
                c-0.054-0.271-0.127-0.535-0.196-0.801c-0.053-0.21-0.1-0.422-0.162-0.631c-0.064-0.21-0.145-0.414-0.217-0.621
                c-0.091-0.257-0.176-0.516-0.281-0.769c-0.064-0.157-0.144-0.306-0.213-0.46c-0.133-0.29-0.262-0.581-0.413-0.864
                c-0.07-0.131-0.153-0.254-0.227-0.384c-0.166-0.29-0.33-0.581-0.518-0.862c-0.144-0.216-0.307-0.418-0.461-0.626
                c-0.134-0.18-0.256-0.365-0.399-0.54c-0.317-0.39-0.655-0.762-1.012-1.119c-0.002-0.002-0.004-0.005-0.006-0.007L174.208,4.393
                c-5.857-5.858-15.355-5.858-21.213,0c-5.858,5.857-5.858,15.355,0,21.213l35.13,35.13c-59.791,5.858-111.389,50.117-123.7,112.007
                c-4.736,23.817-3.136,48.02,4.125,70.432c0.112,0.348,0.215,0.7,0.331,1.047c6.663,20.032,17.873,38.595,33.157,54.118
                c0.614,0.624,1.276,1.167,1.964,1.66c2.601,1.866,5.658,2.816,8.726,2.816c0.475,0,0.95-0.022,1.423-0.067
                c3.313-0.314,6.545-1.727,9.101-4.244c5.903-5.813,5.977-15.31,0.164-21.213c-3.604-3.66-6.909-7.542-9.926-11.598
                c-18.44-24.791-25.755-56.355-19.64-87.097c9.72-48.866,50.676-83.772,97.979-88.071l-38.835,38.836
                c-5.858,5.858-5.858,15.355,0,21.213c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.464,10.606-4.394l62.41-62.411
                c0.022-0.022,0.045-0.046,0.067-0.068l0.007-0.006c0.013-0.013,0.023-0.027,0.036-0.04c0.338-0.339,0.659-0.694,0.963-1.065
                c0.088-0.106,0.162-0.219,0.246-0.327c0.217-0.279,0.432-0.559,0.629-0.854c0.115-0.172,0.213-0.351,0.32-0.527
                c0.146-0.24,0.296-0.476,0.429-0.725c0.125-0.234,0.232-0.475,0.343-0.713c0.095-0.202,0.195-0.399,0.281-0.606
                c0.128-0.308,0.233-0.622,0.34-0.936c0.051-0.15,0.11-0.295,0.156-0.448c0.128-0.421,0.231-0.847,0.321-1.275
                c0.012-0.055,0.03-0.107,0.041-0.163c0.001-0.004,0.001-0.009,0.002-0.013c0.097-0.492,0.171-0.987,0.218-1.484
                C241.041,78.652,241.041,78.394,241.053,78.136z"/>
        </svg>
    }

    useEffect(() =>
    {
        if(nav=='none')
        {
            titleRef.current.children[0].innerHTML='ABOUT'
        }
        else
        {
            cnt = 0
            slideRef.current.children[cnt].checked = true
            cnt++
            imgSlide = setInterval(() =>
            {
                slideRef.current.children[cnt].checked = true
                cnt++
                if(cnt>3)cnt=0
            },5000)
            if(nav=='ggf')
            {
                titleRef.current.children[0].innerHTML='GOOD GRIND FARM'
                conTitleRef.current.innerHTML='GOOD GRIND FARM'
            }
            else if(nav=='field')
            {
                titleRef.current.children[0].innerHTML='FARMING'
                conTitleRef.current.innerHTML='FARMING'
            }
            else if(nav=='rr')
            {
                titleRef.current.children[0].innerHTML='RED ROCK BOWL'
                conTitleRef.current.innerHTML='RED ROCK BOWL'
            }
            else if(nav=='sup')
            {
                titleRef.current.children[0].innerHTML='SUP'
                conTitleRef.current.innerHTML='SUP'
            }
            else if(nav=='sauna')
            {
                titleRef.current.children[0].innerHTML='SAUNA'
                conTitleRef.current.innerHTML='SAUNA'
            }
            else if(nav=='tanne')
            {
                titleRef.current.children[0].innerHTML='TANNE'
                conTitleRef.current.innerHTML='TANNE'
            }
            else if(nav=='info')
            {
                titleRef.current.children[0].innerHTML='INFORMATION'
                conTitleRef.current.innerHTML='INFORMATION'
            }
        }
        return() => clearInterval(imgSlide)
    }, [nav])
    useEffect(() =>
    {
        if(onMenu == false)
            if(onCur=='none')
            {
                arrowRef.current.classList.remove('off')
                Array.from(arrowRef.current.children).map((e) =>
                {
                    e.classList.remove('active', 'passive')
                })
            }
            else if(onCur=='ggf')
            {
                Array.from(arrowRef.current.children).map((e) =>
                {
                    if(e.classList[1] == 'ggf')
                    {
                        e.classList.remove('passive')
                        e.classList.add('active')
                    }
                    else
                        e.classList.add('passive')
                })
            }
            else if(onCur=='field')
            {
                Array.from(arrowRef.current.children).map((e) =>
                {
                    if(e.classList[1] == 'field')
                    {
                        e.classList.remove('passive')
                        e.classList.add('active')
                    }
                    else
                        e.classList.add('passive')
                })
            }
            else if(onCur=='rr')
            {
                Array.from(arrowRef.current.children).map((e) =>
                {
                    if(e.classList[1] == 'rr')
                    {
                        e.classList.remove('passive')
                        e.classList.add('active')
                    }
                    else
                        e.classList.add('passive')
                })
            }
            else if(onCur=='sup')
            {
                Array.from(arrowRef.current.children).map((e) =>
                {
                    if(e.classList[1] == 'sup')
                    {
                        e.classList.remove('passive')
                        e.classList.add('active')
                    }
                    else
                        e.classList.add('passive')
                })
            }
            else if(onCur=='sauna')
            {
                Array.from(arrowRef.current.children).map((e) =>
                {
                    if(e.classList[1] == 'sauna')
                    {
                        e.classList.remove('passive')
                        e.classList.add('active')
                    }
                    else
                        e.classList.add('passive')
                })
            }
            else if(onCur=='tanne')
            {
                Array.from(arrowRef.current.children).map((e) =>
                {
                    if(e.classList[1] == 'tanne')
                    {
                        e.classList.remove('passive')
                        e.classList.add('active')
                    }
                    else
                        e.classList.add('passive')
                })
            }
            else if(onCur=='info')
            {
                Array.from(arrowRef.current.children).map((e) =>
                {
                    if(e.classList[1] == 'info')
                    {
                        e.classList.remove('passive')
                        e.classList.add('active')
                    }
                    else
                        e.classList.add('passive')
                })
            }
    }, [onCur])

    useEffect(() =>
    {
        if(onMenu)
            arrowRef.current.classList.add('off')
        else
        {
            arrowRef.current.classList.remove('off')
            Array.from(arrowRef.current.children).map((e) =>
            {
                e.classList.remove('active', 'passive')
            })
        }
    }, [onMenu])

    function cursorGrow()
    {
        cursor.classList.add('grow')
    }
    function cursorDecline()
    {
        cursor.classList.remove('grow')
    }
    function navClose()
    {
        cursor.classList.remove('grow')
        navRef.current.classList.remove('active')
        navRef.current.classList.add('close')
        setTimeout(() =>
        {
            navRef.current.classList.remove('close')
            setNav('none')
            setMenu(false)
            setCur('none')
        }, 1000)
    }
    function changeNav(target)
    {
        cursor.classList.remove('grow')
        menuRef.current.classList.add('active')
        titleRef.current.classList.add('active')
        setTimeout(() =>
        {
            setNav(target)
        }, 500)
        setTimeout(() =>
        {
            titleRef.current.classList.remove('active')
            menuRef.current.classList.remove('active')
        }, 1000)
    }
    function backNav()
    {
        cursor.classList.remove('grow')
        menuRef.current.classList.add('active')
        titleRef.current.classList.add('active')
        setTimeout(() =>
        {
            setNav('none')
            setMenu(true)
            titleRef.current.children[0].innerHTML = 'ABOUT'
        }, 500)
        setTimeout(() =>
        {
            titleRef.current.classList.remove('active')
            menuRef.current.classList.remove('active')
        }, 1100)
    }
    function navOpen()
    {
        cursor.classList.remove('grow')
        setNav('none')
        setMenu(true)
        setCur('off')
        navRef.current.classList.add('active')
        titleRef.current.classList.add('start')
        setTimeout(() =>
        {
            titleRef.current.classList.remove('start')
        }, 1100)
    }

    return <>
        <div ref={arrowRef} className="arrowField">
            <div className="arrowBox ggf" style={{top: '480px', left: '1350px'}}>
                <ArrowSvg rot="translate(-10px, 40px) rotate(-110deg) scale(-1,1)" sha={1} />
                <div className="wavy">
                    <span style={{'--del': 1}}>G</span>
                    <span style={{'--del': 2}}>G</span>
                    <span style={{'--del': 3}}>F</span>
                </div>
            </div>
            <div className="arrowBox field" style={{top: '300px', right: '1250px'}}>
                <div className="wavy">
                    <span style={{'--del':1}}>F</span>
                    <span style={{'--del':2}}>A</span>
                    <span style={{'--del':3}}>R</span>
                    <span style={{'--del':4}}>M</span>
                </div>
                <ArrowSvg rot="translate(10px, 30px) rotate(100deg) scale(1)" sha={2} />
            </div>
            <div className="arrowBox rr" style={{top: '750px', left: '750px'}}>
                <ArrowSvg rot="translate(10px, -25px) rotate(-20deg) scale(1)" sha={1} />
                <div className="wavy">
                    <span style={{'--del':1}}>R</span>
                    <span style={{'--del':2}}>E</span>
                    <span style={{'--del':3}}>D</span>
                    <span style={{'--del':4}}>R</span>
                    <span style={{'--del':5}}>O</span>
                    <span style={{'--del':6}}>C</span>
                    <span style={{'--del':7}}>K</span>
                </div>
            </div>
            <div className="arrowBox sup" style={{top: '700px', right: '1300px'}}>
                <div className="wavy">
                    <span style={{'--del':1}}>S</span>
                    <span style={{'--del':2}}>U</span>
                    <span style={{'--del':3}}>P</span>
                </div>
                <ArrowSvg rot="translate(-15px, 55px) rotate(150deg) scale(1)" sha={3} />
            </div>
            <div className="arrowBox sauna" style={{top: '200px', left: '1250px'}}>
                <ArrowSvg rot="translate(0px, 50px) rotate(-130deg) scale(-1,1)" sha={2} />
                <div className="wavy">
                    <span style={{'--del':1}}>S</span>
                    <span style={{'--del':2}}>A</span>
                    <span style={{'--del':3}}>U</span>
                    <span style={{'--del':4}}>N</span>
                    <span style={{'--del':5}}>A</span>
                </div>
            </div>
            <div className="arrowBox tanne" style={{top: '100px', right: '870px'}}>
                <div className="wavy">
                    <span style={{'--del':1}}>T</span>
                    <span style={{'--del':2}}>A</span>
                    <span style={{'--del':3}}>N</span>
                    <span style={{'--del':4}}>N</span>
                    <span style={{'--del':5}}>E</span>
                </div>
                <ArrowSvg rot="translate(20px, 15px) rotate(80deg) scale(1)" sha={2} />
            </div>
            <div className="arrowBox info" style={{top:'540px', right: '1080px'}}>
                <div className="wavy">
                    <span style={{'--del':1}}>I</span>
                    <span style={{'--del':2}}>N</span>
                    <span style={{'--del':3}}>F</span>
                    <span style={{'--del':4}}>O</span>
                </div>
                <ArrowSvg rot="translate(20px, 15px) rotate(110deg) scale(-1,1)" sha={3} />
            </div>
        </div>
        <div className="nav_box" ref={navRef}>
            <div className="nav_titleBx" ref={titleRef}>
                <h1 className="nav_title">ABOUT</h1>
            </div>
            <div className="nav_menu" ref={menuRef}>
                {nav == 'none' &&<ul className="nav_list">
                    <li 
                        className="nav_item" 
                        onPointerEnter={cursorGrow}
                        onPointerLeave={cursorDecline}
                        onClick={() => changeNav('ggf')}
                    >
                        <span />
                        <a className="nav_link">
                            GOOD GRIND FARM
                        </a>
                    </li>
                    <li 
                        className="nav_item" 
                        onPointerEnter={cursorGrow}
                        onPointerLeave={cursorDecline}
                        onClick={() => changeNav('field')}
                    >
                        <a className="nav_link">
                            FARM
                        </a>
                    </li>
                    <li 
                        className="nav_item" 
                        onPointerEnter={cursorGrow}
                        onPointerLeave={cursorDecline}
                        onClick={() => changeNav('rr')}
                    >
                        <a className="nav_link">
                            RED ROCK 
                        </a>
                    </li>
                    <li 
                        className="nav_item" 
                        onPointerEnter={cursorGrow}
                        onPointerLeave={cursorDecline}
                        onClick={() => changeNav('sup')}
                    >
                        <a className="nav_link">
                            SUP
                        </a>
                    </li>
                    <li 
                        className="nav_item"  
                        onPointerEnter={cursorGrow}
                        onPointerLeave={cursorDecline}
                        onClick={() => changeNav('sauna')}
                    >
                        <a className="nav_link">
                            SAUNA
                        </a>
                    </li>
                    <li 
                        className="nav_item" 
                        onPointerEnter={cursorGrow}
                        onPointerLeave={cursorDecline}
                        onClick={() => changeNav('tanne')}
                    >
                        <a className="nav_link">
                            TANNE
                        </a>
                    </li>
                    <li 
                        className="nav_item" 
                        onPointerEnter={cursorGrow}
                        onPointerLeave={cursorDecline}
                        onClick={() => changeNav('info')}
                    >
                        <a className="nav_link">
                            INFORMATION
                        </a>
                    </li>
                    <li 
                        className="nav_item" 
                        onPointerEnter={cursorGrow}
                        onPointerLeave={cursorDecline}
                    >
                        <a className="nav_link">
                            ONLINE SHOP
                        </a>
                    </li>
                    <li
                        className="nav_icon"
                    >
                        <div className="nav_iconBx">
                            <i className="ri-instagram-line" onPointerEnter={cursorGrow} onPointerLeave={cursorDecline}></i>
                        </div>
                        <div className="nav_iconBx">
                            <i className="ri-facebook-circle-line" onPointerEnter={cursorGrow} onPointerLeave={cursorDecline}></i>
                        </div>
                        <div className="nav_iconBx">
                            <i className="ri-twitter-x-fill" onPointerEnter={cursorGrow} onPointerLeave={cursorDecline}></i>
                        </div>
                    </li>
                </ul>}
                {nav !== 'none'&&<div className="nav_content">
                    <h1 className="nav_conTitle" ref={conTitleRef}></h1>

                    <div className="imgBx">
                        <div className="slider">
                            <div className="slides" ref={slideRef}>
                                <input type="radio" name="radio-btn" id="radio1" />
                                <input type="radio" name="radio-btn" id="radio2" />
                                <input type="radio" name="radio-btn" id="radio3" />
                                <input type="radio" name="radio-btn" id="radio4" />

                                <div className="slide first">
                                    <img src={'./img/' + nav + '1.jpg'} />
                                </div>
                                <div className="slide">
                                    <img src={'./img/' + nav + '2.jpg'} />
                                </div>
                                <div className="slide">
                                    <img src={'./img/' + nav + '3.jpg'} />
                                </div>
                                <div className="slide">
                                    <img src={'./img/' + nav + '4.jpg'} />
                                </div>
                                <div className="navigation_auto">
                                    <div className="auto_btn1" />
                                    <div className="auto_btn2" />
                                    <div className="auto_btn3" />
                                    <div className="auto_btn4" />
                                </div>
                            </div>
                            <div className="navigation_manual">
                                <label htmlFor="radio1" className="manual_btn" onPointerEnter={cursorGrow} onPointerLeave={cursorDecline} />
                                <label htmlFor="radio2" className="manual_btn" onPointerEnter={cursorGrow} onPointerLeave={cursorDecline} />
                                <label htmlFor="radio3" className="manual_btn" onPointerEnter={cursorGrow} onPointerLeave={cursorDecline} />
                                <label htmlFor="radio4" className="manual_btn" onPointerEnter={cursorGrow} onPointerLeave={cursorDecline} />
                            </div>
                        </div>
                    </div>
                    {nav=='ggf'&&<div className="textWrap">
                        <div className="textBx">
                            <h3>Goods</h3>
                            <div>
                                GoodGrindFarmオリジナルグッズの製作、販売を行っています。
                            </div>
                        </div>
                        <div className="textBx">
                            <h3>Live Silk Screen Printing</h3>
                            <div>
                                お好みの位置、色でオリジナルデザインをプリントできます。<br />
                                各種ボディのご用意ありますが、持ち込みも可能ですのでお気軽にご相談ください。
                            </div>
                        </div>
                        <div className="textBx">
                            <h3>Tiy-Dye Workshop</h3>
                            <div>
                                土日営業期間中随時、タイダイ(絞り染め)ワークショップを受付けています。<br />
                                Tシャツ、トートバッグ、手ぬぐいなどの各種ボディのご用意あります。<br />
                                子供から大人まで楽しむことができます。
                            </div>
                        </div>
                        <div className="textBx">
                            <h3>Wheel Donut</h3>
                            <div>
                                スケートボードのWHEELの形をしたミニサイズドーナツ🍩<br />
                                原材料にはGoodGrindFarmのある谷根のコシヒカリ米粉と里芋を使った、ヴィーガンドーナツをお楽しみください。<br />
                                ドーナツ生地は卵、乳製品、小麦不使用です。
                            </div>
                        </div>
                    </div>}
                    {nav=='field'&&<div className="textWrap">
                        <div className="textBx">
                            <h3>GOOD GRIND FARMING</h3>
                            <div>
                                GoodGrindFarmは谷根集落に畑を所有し、化学肥料や家畜糞尿、農薬を使用せずに野菜や薬草の栽培を行っています。<br />
                                土壌微生物や土壌小動物、雑草との共生の中で、雑味がなく味や香りの濃い野菜が育ちます。
                            </div>
                        </div>
                        <div className="textBx">
                            <h3>循環と遷移</h3>
                            <div>
                                植物が育つ時、微生物や昆虫、小動物が育ち、やがて亡骸は土となりその上に新しい生命が育ちます。<br/>
                                自然は生命の循環を繰り返し、少しずつ地力を蓄積させ、草原はやがて森に遷移していきます。<br/>
                                その過程で生まれる黒い腐植土は微生物の棲みかとなり、ミネラル豊富な植物を育てます。<br/>
                                多様な生命が共生する畑も、この循環と遷移が見られます。
                            </div>
                        </div>
                        <div className="textBx">
                            <h3>共生</h3>
                            <div>
                                多様な雑草が共生することで、その下には多様な土壌小動物、微生物が棲みつきバランスが保たれています。<br/>
                                地下部では低肥料などの条件で、カビの一種である糸状菌が植物根と共生し、植物が吸収しづらいアミノ酸などの栄養素を補給します。<br/>
                                この共生菌は他の作物や雑草とも共生し、土壌中に菌糸ネットワークを張り巡らせ栄養素や抗生物質などのやり取りをしている可能性が指摘されています。
                            </div>
                        </div>
                        <div className="textBx">
                            <h3>土と発酵</h3>
                            <div>
                                農法を探究していく中で、土壌菌と人の腸内細菌の類似性に興味を持ちました。<br/>
                                土にとって良いものは腸にとって良く、腸に良いものは土にとっても良いのではないかと考えるようになりました。<br/>
                                GoodGrindFarmでは土にとっての発酵食として植物性由来の原料を基に、発酵菌や微生物遺体によって野菜や土壌に作用する発酵肥料の製作を行い、栽培に用いています。
                            </div>
                        </div>
                    </div>}
                    {nav=='rr'&&<div className="textWrap">
                        <div className="textBx">
                            <h3>Rule</h3>
                            <div className="text_bull bull1">基本的にプライベートパークです。</div>
                            <div className="text_bull">GGF土日営業時(13:00-18:00)に限り、滑走可能です。<br/>野菜もしくはGGFグッズ¥1,000以上購入で滑走料無料といたします。<br/>EAT VEGETABLES and RIDE<br/>(購入しない場合、滑走料¥500)</div>
                            <div className="text_bull">初心者の方は日曜9:00-滑走できます。</div>
                            <div className="text_bull">土日でもイベント出店時、雨天時、冬季休業中はcloseいたします。</div>
                            <div className="text_bull">パーク内外での事故、怪我、トラブル等に関してGoodGrindFarmは一切の責任を負いません。全て自己責任になります。<br/>ただし、万が一事故、怪我、トラブル等が発生した場合は速やかにご報告ください。</div>
                            <div className="text_bull">常に事故、怪我、物損等のリスクが伴います。各自で保険に加入してください。</div>
                            <div className="text_bull">子供はヘルメット等のプロテクターを着用してください。</div>
                            <div className="text_bull">駐車場やゴミ捨てなどのマナーを守ってください。</div>
                            <div className="text_bull">パーク外の道路で滑走しないでください。</div>
                            <div className="text_bull">相談に応じて営業時間外でパークの貸切(¥10,000-/2h)が可能です。<br/>事前にご連絡ください。</div>
                        </div>
                    </div>}
                    {nav=='sup'&&<div className="textWrap">
                        <div className="textBx">
                            <h3>青海川SUPツアー</h3>
                            <div>お手軽に楽しみながら、青海川・米山の景色を堪能するSUP体験。<br/>恋人岬の裏まで周り、洞窟を巡りながらプライベート空間にお連れするSUPクルーズ。<br/><br/>お客様のご要望に応じて、ご案内させていただきます。<br/>
                            はじめての方大歓迎です！<br/>お気軽にお問い合わせください。</div>
                        </div>
                        <div 
                        className="nav_item" 
                        onPointerEnter={cursorGrow}
                        onPointerLeave={cursorDecline}
                        >
                            <a className="nav_link">
                                お問い合わせ
                            </a>
                        </div>
                    </div>}
                    {nav=='sauna'&&<div className="textWrap">
                        <div className="textBx">
                            <h3>野サウナ</h3>
                            <div>利用料金のない秘境のサウナ。<br/>誰でも無料で入れる野湯のようなサウナ『野サウナ』運営はサウナ好きの皆さんからの寄付で成り立っています。<br/>
                            水風呂は新潟の名水「きつね塚湧水」。山からの湧き水は上質でとても柔らかく、水温は真夏の8月でも12℃の低い温度を保ち、疲れが癒されると愛されています。</div>
                        </div>
                        <div className="textBx">
                            <h3>ハーブ蒸留水</h3>
                            <div>
                                谷根に自生する薬草や、goodgrindfarm で栽培しているハーブをロウリュウで全身に浴びることができます。<br/>
                                減圧蒸留という手法で精製された、純度が高い蒸留水です。<br/>
                                他にも化粧水などのスキンケアや香料としてもおすすめです！
                            </div>
                        </div>
                        <div className="textBx">
                            <h3>利用表</h3>
                            <div className="text_bull bull1">
                                無料予約(個人)<br/>¥0-<br/>月、水、金<br/>9:00-12:00, 14:00-17:00
                            </div>
                            <div className="text_bull">
                                貸切予約<br/>¥10000-<br/>月、火、水、木、金<br/>9:00-12:00, 14:00-17:00
                            </div>
                        </div>
                        <div 
                        className="nav_item" 
                        onPointerEnter={cursorGrow}
                        onPointerLeave={cursorDecline}
                        >
                            <a className="nav_link">
                                予約フォーム
                            </a>
                        </div>
                    </div>}
                    {nav=='tanne'&&<div className="textWrap">
                        <div className="textBx">
                            <h3>谷根</h3>
                            <div>
                                谷根(たんね)集落は日本海の近くにありながら、米山などの山々に囲まれた場所に位置しています。<br/>
                                綺麗な水が豊富にあり風通りがよく寒暖差のある環境は、風味豊かな野菜や米、山菜を育みます。<br/>
                                GoodGrindFarmでは季節ごとの旬な谷根の野菜、米、山菜を集荷、採取し販売させていただいてます。
                            </div>
                        </div>
                        <div className="textBx">
                            <h3>米山当帰</h3>
                            <div>
                                セリ科植物である当帰(トウキ)の根は、婦人病に効くとされ日本の伝統的な生薬の材料として用いられてきました。<br/>
                                柏崎市の米山に古くから自生していた米山当帰は、一時期まで米山登山のお土産として山頂で販売され、魔除けや芳香剤、虫除けとして利用されてきました。<br/>
                                GoodGrindFarmでは米山当帰を栽培し、食用販売としての研究を行っています。
                            </div>
                        </div>
                    </div>}
                    {nav=='info'&&<div className="textWrap">
                        <div className="textBx">
                            <h3>Farmers&apos; lodge</h3>
                            <div>
                                新潟県柏崎市の谷根(たんね)で野菜を栽培。<br/>
                                土日は店舗にて谷根集落の野菜や山菜、雑貨をはじめ、<br/>
                                シルクスクリーンプリントやタイダイ(絞り染め)体験、<br/>
                                スケートボードなどを楽しむことができます。
                            </div>
                        </div>
                        <div className="textBx">
                            <h3>Shop info</h3>
                            <div>
                                GOOD GRIND FARM<br/>
                                新潟県柏崎市谷根3186-4<br/>
                                営業時間：土日13:00-18:00<br/>
                                米山ICから車で15分、青海川駅から車で5分
                            </div>
                        </div>
                        {/* <div className="textBx">
                            <h3>Map</h3>
                        </div>
                        <div className="textBx">
                            <h3>Schedule</h3>
                            <div></div>
                        </div> */}
                        <div 
                        className="nav_item" 
                        onPointerEnter={cursorGrow}
                        onPointerLeave={cursorDecline}
                        >
                            <a className="nav_link">
                                ONLINE SHOP
                            </a>
                        </div>
                        <div className="nav_icon">
                            <div className="nav_iconBx">
                                <i className="ri-instagram-line" onPointerEnter={cursorGrow} onPointerLeave={cursorDecline}></i>
                            </div>
                            <div className="nav_iconBx">
                                <i className="ri-facebook-circle-line" onPointerEnter={cursorGrow} onPointerLeave={cursorDecline}></i>
                            </div>
                            <div className="nav_iconBx">
                                <i className="ri-twitter-x-fill" onPointerEnter={cursorGrow} onPointerLeave={cursorDecline}></i>
                            </div>
                        </div>
                    </div>}


                    <div 
                        className="nav_btn nav_back" 
                        onPointerEnter={cursorGrow}
                        onPointerLeave={cursorDecline}
                        onClick={() =>backNav()}
                    >
                        <i className="ri-arrow-left-line"></i>
                    </div>
                </div>
                }
                <div 
                    className="nav_btn nav_close" 
                    onPointerEnter={cursorGrow}
                    onPointerLeave={cursorDecline}
                    onClick={() => navClose()}
                >
                    <i className="ri-close-line"></i>
                </div>
            </div>
        </div>
        <div
            className="nav_toggle" 
            onPointerEnter={cursorGrow}
            onPointerLeave={cursorDecline}
            onClick={() => navOpen()}
        >
            <i className="ri-apps-2-line"></i>
        </div>
    </>
}