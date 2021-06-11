import React, { useState } from 'react';
import { Form, Icon, Input, Button, notification } from "antd";
import { emailValidation, minLengthValidation, nombreValidation } from "../../../utils/formValidations";
import { signUpApi } from "../../../api/user";

import "./RegisterForm.scss";

export default function RegisterForm() {
    const [inputs, setInputs] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        repeatPassword: ""
    })

    const [formValid, setFormValid] = useState({
        name: false,
        lastname: false,
        password: false,
        repeatPassword: false,
        email: false
    });
    
    const changeForm = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    };
    
    const inputValidation = e => {
        const { type, name } = e.target;

        if(type === "email") {
            setFormValid({
                ...formValid,
                [name]: emailValidation(e.target)
            })
        }else if(type === "password") {
            setFormValid({
                ...formValid,
                [name]: minLengthValidation(e.target, 6)
            })
        }else {
            setFormValid({
                ...formValid,
                [name]: nombreValidation(e.target)
            })
        }   
    }

    const registrar = async (e) => {
        e.preventDefault();
        const passwordVal = inputs.password;
        const repeatPasswordVal = inputs.repeatPassword;

        if(!inputs.name || !inputs.lastname || !passwordVal || !repeatPasswordVal || !inputs.email ) {
            notification['error']({
                message: "Todos los campos son obligatorios"
            })
        }else {
            if(passwordVal !== repeatPasswordVal) {
                notification['error']({
                    message: "Las contraseñas no coinciden"
                })
            }else {
                // conecatar a la API Y REGISTRAR USUARIO
                const result = await signUpApi(inputs);
                
                if(!result.ok) {
                    notification['error']({
                        message: result.message
                    })
                }else {
                    notification['success']({
                        message: result.message
                    })
                    resetForm();
                }
            }
        }

    }

    const resetForm = () => {
        const inputs = document.getElementsByTagName("input");

        for(let i=0; i<inputs.length; i++) {
            inputs[i].classList.remove("success");
            inputs[i].classList.remove("error");
        }

        setInputs({
            name: "",
            lastname: "",
            password: "",
            repeatPassword: "",
            email: "",
            privacyPolicy: false
        })

        setFormValid({
            name: false,
            lastname: false,
            password: false,
            repeatPassword: false,
            email: false,
            privacyPolicy: false
        })
    }
    
    return (
        <Form className="register-form" onSubmit={registrar} onChange={changeForm} >
            <Form.Item>
                <Input 
                    prefix={<Icon type="user-add" />}
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    className="register-form__input"
                    value={inputs.name}
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<Icon type="user" />}
                    type="text"
                    name="lastname"
                    placeholder="Apellido"
                    className="register-form__input"
                    value={inputs.lastname}
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<Icon type="lock" />}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="register-form__input"
                    value={inputs.password}
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<Icon type="lock" />}
                    type="password"
                    name="repeatPassword"
                    placeholder="Repetir Contraseña"
                    className="register-form__input"
                    value={inputs.repeatPassword}
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<Icon type="mail" />}
                    type="email"
                    name="email"
                    placeholder="Correo Electronico"
                    className="register-form__input"
                    value={inputs.email}
                    onChange={inputValidation}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="register-form__button">Registrar</Button>
            </Form.Item>
        </Form>
    )
}