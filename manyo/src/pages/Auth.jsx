import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {CATALOG_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../Utils/Consts";
import {login, registration} from "../Http/UserAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ name, setName ] = useState('')
    const [ lastName, setLastName ] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(name, lastName, email, password, phone,  );
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(CATALOG_ROUTE)
            console.log(data);
        } catch (e) {
            alert(e.response.data.message)
        }
        
    }



    return (
        <Container
            className="d-flex justify-content-center align-items-center mt-5"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto mb-1">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    {isLogin ? 
                        <Form> 
                        <span>E-mail</span>
                        <Form.Control
                            className="mb-3 mt-1"
                            placeholder="Введите ваш e-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <span>Пароль</span>
                        <Form.Control
                            className="mb-3 mt-1"
                            placeholder="Введите ваш пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                        </Form>
                        :
                        <Form>
                            <span>Имя (обязательно)</span>
                            <Form.Control
                                placeholder="Введите вашe имя"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="mb-3"
                            />
                            <span>Фамилия (обязательно)</span>
                            <Form.Control
                                placeholder="Введите вашу фамилию"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                className="mb-3"
                            />
                            <span>Номер телефона (обязательно)</span>
                            <Form.Control
                                className="mb-3"
                                placeholder="Введите ваш сотовый номер"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                type="number"
                            />
                            <span>E-mail (обязательно)</span>
                            <Form.Control
                                placeholder="Введите ваш e-mail адрес"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="mb-3"
                            />
                            <span>Пароль (обязательно)</span>
                            <Form.Control
                                placeholder="Введите ваш пароль"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                                className="mb-3"
                            />
                        </Form>
                    }
                    <Row className="d-flex justify-content-between mt-2  pl-3 pr-3">
                        {isLogin ?
                            <div className="mb-2">
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div className="mb-2">
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;