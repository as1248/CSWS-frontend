import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from'../../components/Header';
import styled from 'styled-components'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import VerifyEmail from '../../components/User/VerifyEmail';
import SelectUniv from '../../components/User/SignUp, SignUpAd/SelectUniv';
import SelectDept from '../../components/User/SignUp, SignUpAd/SelectDept';
import axios from 'axios';
import Footer from "../../components/Footer";
import EmailInput from "../../components/User/EmailInput";
import SendEmailBtn from "../../components/User/SignUp, SignUpAd/SendEmailBtn";
import PasswordInput from "../../components/User/PasswordInput";
import PasswordConfirmInput from "../../components/User/PasswordConfirmInput";
import NameInput from "../../components/User/SignUp, SignUpAd/NameInput";
import StudentNumberInput from "../../components/User/SignUp, SignUpAd/StudentNumberInput";
import SubmitBtn from "../../components/User/SignUp, SignUpAd/SubmitBtn";

const SignUp = () => {
  const [NumberValid, setNumberValid] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [studentNumber, setStudentNumber] = useState();
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordConfirmValid, setPasswordConfirmValid] = useState(false);
  const [notAllow,setNotAllow] = useState(true);
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false);
  const [showEmailField, setShowEmailField] = useState(false);
  const [UnivStu, setUnivStu] = useState('');
  const [DeptStu, setDeptStu] = useState('');

  const handlePassword = (e) => {
    setPassword(e.target.value);
    const regex =
      /^[a-zA-z0-9]{8,20}$/;
    if(regex.test(e.target.value)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  }

  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
    const regex = password;
    if(regex === e.target.value) {
      setPasswordConfirmValid(true);
    } else {
      setPasswordConfirmValid(false);
    }
  }

  const handleStudentNumber = (e) => {
    setStudentNumber(e.target.value);
  }


  const onClickConfirmButton = () => {
    if(password !== passwordConfirm){
      alert('비밀번호를 다시 확인해주세요.');
    } else {
      axios.post('/register/student', { username: email, password: password, name, studentNumber, universityId: UnivStu , departmentId: DeptStu })
        .then(response => {
          navigate('/login');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  const handleKeyDown = (e) => {
    if(e.code === 'Enter' && !notAllow) {
      onClickConfirmButton();
    }
  }

  useEffect(() => {
    if(NumberValid && passwordValid && passwordConfirmValid && name && studentNumber && UnivStu && DeptStu ){
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [NumberValid, passwordValid, passwordConfirmValid, name, studentNumber, UnivStu , DeptStu]);

    const handleButtonClick = () => {
      setShowEmailField(true);
      setSendButtonDisabled(true);
      axios.get('/register/verification',
        { params: { email: email } },
        { withCredentials: true }
      ).then(response => {

      }
      ).catch(error => {
        console.error(error);
      });
    };
  
  return (
    <>
      <Header/>
      <Container component="main" maxWidth="xs" style={{marginBottom:'40px'}}>
        <Box 
          sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
          }}
        >
          <Title>학습자 회원가입</Title>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <EmailInput email={email} setEmail={setEmail} emailValid={emailValid} setEmailValid={setEmailValid} handleKeyDown={handleKeyDown} showEmailField={showEmailField} />
              {!emailValid && email.length > 0 && (
                  <StyledText>올바른 이메일 형식을 입력해주세요</StyledText>
                )}
            </Grid>
            <Grid item xs={3}>
              <SendEmailBtn emailValid={emailValid} sendButtonDisabled={sendButtonDisabled} handleButtonClick={handleButtonClick} />
            </Grid>
          </Grid>
          {showEmailField && <VerifyEmail email={email} onNumberValidChange={setNumberValid}/>}

          <PasswordInput password={password} handlePassword={handlePassword} passwordValid={passwordValid} handleKeyDown={handleKeyDown} />
          {!passwordValid && password.length > 0 && (
              <StyledText>특문자 제외 영문자 숫자로 8자 이상 20자 미만으로 입력해주세요</StyledText>
            )}

          <PasswordConfirmInput passwordConfirm={passwordConfirm} handlePasswordConfirm={handlePasswordConfirm} passwordConfirmValid={passwordConfirmValid} handleKeyDown={handleKeyDown} />
          {!passwordConfirmValid && passwordConfirm.length > 0 && (
              <StyledText>비밀번호가 일치하지 않습니다</StyledText>
            )}

          <NameInput name={name} setName={setName} handleKeyDown={handleKeyDown} />
          <StudentNumberInput studentNumber={studentNumber} handleStudentNumber={handleStudentNumber} handleKeyDown={handleKeyDown} />
          <SelectUniv setUnivStu={setUnivStu} />
          <SelectDept universityId={UnivStu} setDeptStu={setDeptStu} />
          <SubmitBtn notAllow={notAllow} onClickConfirmButton={onClickConfirmButton} />
        </Box>
      </Container>
      <Footer/>
    </>
  );
};

export default SignUp;

const StyledText = styled.div`
  color:red;
  font-size:0.8rem;
`;

const Title = styled.div`
  font-size: 32px;
`;