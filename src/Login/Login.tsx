import React, { useState, useEffect } from "react";
import "./Login.scss"
import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { useNavigate } from "react-router-dom";
import { Input, Label, Form, FormGroup } from 'reactstrap';


function Login(props: any) {

  let navigation = useNavigate()

  useEffect(() => {
    document.body.classList.add('auth');
    return () => {
      document.body.classList.remove('auth');
    }
  }, []);

  const [size] = useState<SizeType>('large');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelected] = useState(false);
  const [postUrl, setPostUrl] = useState('/signAssociation');
  const [typeUser, setTypeUser] = useState('association');

  const login = () => {
    let url = 'http://localhost:8000' + postUrl;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          navigation('/', {state: {token: data.token, user: typeUser}})
        })
      } else {
        console.log('error');
      }})
    .catch((error) => {
      console.log(error);
    })
  }

  const setPlaceholder = () => {
    return isSelected ? "Titre de l'association ou email" : 'Email'
  }

  return (
    <div className="container">
      <div className="box-container">
        <div className="title-container">
          <p className="main_title"> HiVolunteer </p>
          </div>
          <div className="can-toggle can-toggle--size-large login_box">
            <Input
              id="states"
              type="checkbox"
              checked={isSelected}
              onChange={() => {
                setSelected(!isSelected)
                if (isSelected) {
                  setPostUrl('/signUser')
                  setTypeUser('user')
                } else {
                  setPostUrl('/signAssociation')
                  setTypeUser('association')
                }
              }}
            />
            <Label for="states">
              <div className="can-toggle__switch" data-checked="Association" data-unchecked="Bénévole"></div>
            </Label>
          </div>
          <Form className="login-container">
            <FormGroup floating>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e:any) => setEmail(e.target.value)}
                onKeyPress={(e:any) => {
                  if (e.key === 'Enter') {
                    login()
                  }
                }}
              />
              <Label for='email'>Email</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e:any) => setPassword(e.target.value)}
                onKeyPress={(e:any) => {
                  if (e.key === 'Enter') {
                    login()
                  }
                }}
              />
              <Label for='password'>Password</Label>
            </FormGroup>
          </Form>
          {/* <div className="login-container">
            <Input placeholder={setPlaceholder()} type="email" onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
          </div> */}
          <div className="reset-container">
            <p className="reset"> Mot de passe oublié ? </p>
          </div>
          <div>
          <Button className="ant-btn-primary" size={size} onClick={login}>
            Connexion
          </Button>
          </div>
          <div className="line-container">
            <div className="line"></div>
            <p className="or"> ou </p>
            <div className="line"></div>
          </div>
          <div className="oauth-container" />
          <div className="register-container">
            <p className="register"> Pas de compte ? </p>
            <p className="register" style={{'textDecoration': 'underline', 'marginLeft': '5px', 'cursor': 'pointer'}} onClick={() => {navigation('/register')}}> Créer un compte </p>
          </div>
      </div>
    </div>
  );
}
export default Login;
