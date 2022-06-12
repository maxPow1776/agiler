import React from 'react';
import { Button, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import HeaderLogin from '../HeaderLogin/HeaderLogin';
import s from './StartPage.module.css';
import Line from './ChartStartPage/ChartStartPage';
import LogoStartPage from './LogoStartPage/LogoStart';

const { Title, Text } = Typography;

const StartPage = () => {
    return (
        <div>
            <HeaderLogin />
            <div className={s.info}>
                <div className={s.container}>
                    <div className={s.login}>
                        <Title
                            style={{
                                fontSize: '50px',
                                color: '#ffffff',
                                marginTop: '47px',
                                marginBottom: '14px',
                            }}
                        >
                            Agiler
                        </Title>
                        <Text
                            style={{
                                fontSize: '30px',
                                color: '#ffffff',
                            }}
                        >
                            Six Dimensions of Performance
                        </Text>
                        <Button href={'/app'}>GO TO THE DASHBOARD</Button>
                    </div>
                    <Line
                        smooth={true}
                        data={[
                            { time: 'Mon', data: 56 },
                            { time: 'Tue', data: 155 },
                            { time: 'Wed', data: 210 },
                            { time: 'Thu', data: 90 },
                            { time: 'Fri', data: 50 },
                            { time: 'Sat', data: 160 },
                            { time: 'Sun', data: 260 },
                        ]}
                    />
                </div>
            </div>
            <div className={s.about}>
                <div className={s.time}>
                    <ClockCircleOutlined style={{ fontSize: '310px' }} />
                    <div className={s.text}>
                        <Title
                            level={5}
                            style={{
                                color: '#ff4264',
                                fontSize: '30px',
                            }}
                        >
                            Зачем ?
                        </Title>
                        <Text>
                            Для корректной оценки своей
                            <br /> производительности.
                        </Text>
                        <Title
                            level={5}
                            style={{
                                color: '#ff4264',
                                fontSize: '30px',
                            }}
                        >
                            Что будет ?
                        </Title>
                        <Text>
                            Наглядный пример работы, представленный
                            <br /> в виде графика. Сделав выводы по
                            <br />
                            полученному графику, последующее
                            <br /> планирование времени будет более четким
                            <br />и конкретным.
                        </Text>
                    </div>
                </div>
            </div>
            <footer className={s.footer}>
                <div className={s.footerInfo}>
                    {/* <div className={s.logo_footer}>Agiler</div>*/}
                    <LogoStartPage />
                    <Text>agiler.better-call-soul.com</Text>
                </div>
            </footer>
        </div>
    );
};

export default StartPage;
