import styled from 'styled-components'
import React, { useState } from 'react';
import './css/LandingPage.css'
import { useHistory } from 'react-router';

const LandingPage = (props) => {
    const [email, setemail] = useState();
    let history = useHistory();
    return (
        <Container>
            <Nav>
                <a href="/">
                    <img src ="/images/login-logo.svg" alt=""/>
                </a>
                <div>
                    <Join href ="/signup">Join now</Join>
                    <SignIn href ="/login"> Sign In</SignIn>
                </div>
            </Nav>
            <Section> 
                <Hero>
                    <div class= "main-welcome">
                    <h1 class="welcome"> Welcome to StudyBooth.</h1>
                    <p class="about-text">lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum</p>
                    <div class="emailz"> 
                          <input type="text" placeholder="Enter Email" name="email" id="email" 
                                value={email}
                                onChange={e => setemail(e.target.value)} required></input>
                          <button type="submit" class="registerbtn-desktop" 
                          onClick={() => {
                            history.push({
                                pathname: '/signup',
                                email: email,
                            });}}>Signup</button>                    
                        </div>
                    </div>
                    <img src="/images/login_slider_2.png" alt =""/>
                </Hero>
                
                </Section>
        </Container>
    )
};



const Container = styled.div`
background-color: skyblue;
height: 100%;
width:100%;
position:fixed;
/* margin:10px; */
  
`;


const Nav = styled.nav`

    max-width : 1250px;
    margin: auto;
    margin-top:20px;
    padding: 12px 0 16px;
    display: flex;
    align-items: center;
    position: relative;
    /* allow space between content in a row*/
    justify-content: space-between;
    /* does not let content in same line to go on next line*/
    flex-wrap: nowrap;
    width:100%;

        @media(min-width:50px) and (max-width:320px){
            /* max-width: 310px; */
            width:auto;
            padding:  4vw;
            
        }

        @media(min-width: 321px) and (max-width:767px) {
            max-width: 760px;
            padding:  10px 0 12px;
       
        }
      
        @media(min-width: 768px) and (max-width:1022px){
            max-width: 900px;
            padding: 12px 0 16px;
    
        }

        @media(min-width: 1023px){
            padding: 12px 0 16px;
            max-width:1250px;
        
        }


    
    & > a{
     
        width: 120px;
        height: 34px;
        /* padding:2%; */

        @media(max-width:360px){
            width: 20vw;
            margin-top:initial;
           height: initial;
        }
       
        @media(min-width: 360px) and (max-width:767px) {
            /* padding:10px; */
            width: 90px;
            height: 25px;
            margin: 10px;
        }
        /* on a phone device give some extra padding*/
       

        @media(min-width: 768px) and (max-width:1022px){
            padding:5px;
            width: 120px;
            height: 34px;
          
        }

        @media(min-width: 1023px){
            padding:5px;
            width: 120px;
            height: 34px;
        
        }

       
    }

   
 

 
`;

const Join = styled.a`
    
    font-size: 16px;
    padding: 10px 12px;
    text-decoration: none;
    border-radius: 4px;
    color: rgba(0,0,0,0.6);
    margin: 12px;
    cursor: pointer;
    &:hover{
        background-color: rgba(0,0,0,0.08);
        color: rgba(0,0,0,0.9);
        text-decoration: none;
    }
    @media(max-width:320px){
            font-size: 3.5vw;
            padding: 2vw 3vw;
            margin: 0;
            margin-bottom: 10vw;
        }

    @media(min-width: 320px) and (max-width:767px) {

            font-size: 12px;
            padding: 8x 10px;
            margin: 0;
            margin-bottom: 5px;
       
        }
      
        @media(min-width: 768px) and (max-width:1022px){
            max-width: 900px;
            padding: 12px 0 16px;
    
        }

        @media(min-width: 1023px){
            padding: 12px 0 16px;
            max-width:1250px;
        
        }


`;

const SignIn = styled.a`

    box-shadow: inset 0 0 0 1px #0a66c2;
    color: #0a66c2;
    border-radius: 24px;
    transition-duration: 167ms;
    font-size: 16px; 
    font-weight: 600;
    line-height: 40px;
    padding: 10px 24px;
    text-align: center;
    background-color: rgba(0,0,0,0);
    cursor: pointer;
    text-decoration: none;
    &:hover{
        background-color: rgba(112,181,249,0.15);
        color: #0a66c2;
        text-decoration: none;
        cursor: pointer;
      
    }

    @media(min-width: 50px) and (max-width:320px) {
      
        font-size: 3.5vw;
      border-radius: 15px;
      padding: 2vw 3vw;
      /* margin: 5vw; */
      margin-bottom: 10vw;
      
     
 
  }

    @media(min-width: 320px) and (max-width:767px) {
      
            font-size: 12px; 
            border-radius: 15px;
            margin: 5px;
            padding: 8px 10px;
       
        }
      
        @media(min-width: 768px) and (max-width:1022px){
            font: 7vw;
            max-width: 900px;
            padding: 10px 24px;
            border-radius: 16px;
    
        }

        @media(min-width: 1023px){
            border-radius: 24px;
            padding: 10px 24px;
            max-width:1250px;
        
        }
  

`;


const Section = styled.section`
width: 100%; 

`;

const Hero = styled.div`    

    max-width: 1250px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    position: relative;
    margin: auto;
    z-index: 1;


  
    .main-welcome{
      
        width: 40%;
        z-index:1;

    
        @media(max-width:319px){
            
            width: auto;
            margin: auto;
            padding: 0px;
        }
        @media(min-width: 320px) and (max-width:767px) {
            
            width: 100%;
            margin: 5px;
           
     }
     @media(min-width: 767px) and (max-width:1023px) {
    
            margin:auto;
            width:100%;
            height: auto;
            padding: 5px;
            
        }  

    }

    .welcome{
        margin-top: 130px;
        z-index:2;
        width: 100%; 
        font-size: 72px;
        font-weight: 500;
        line-height: 80px;
        display: inline-block;
        position: relative;
        text-align:center;
       

        @media(min-width:767px) and (max-width:1024px){
          margin:20px;
          max-width: 100%;
          padding:0;
          font-size: 54px;

      }

        @media(max-width:767px) and (min-width:320px){
          margin:5px;
        font-size:7vw;
        max-width: 100%;
          padding:0;

      }

      @media(max-width:320px) and (min-width:50px){
          line-height: normal;
          margin-top:20px; 
        font-size:8vw;
          max-width: 100%;
        margin-left: auto;
          padding:auto;

      }

        
    }


    .about-text{
        padding-top: 20px;
        padding-left: 10px;
        margin-bottom: 20px; 
        @media(max-width:767px) {
            display:none;
        }
    }

    .emailz{
       
        /* max-width : 1250px; */
    margin: auto; 
    padding: 12px 0 16px;
    display: flex;
    align-items: center;
    position: relative;
    /* allow space between content in a row*/
    justify-content: space-between;
    /* does not let content in same line to go on next line*/
    flex-wrap: nowrap;
    max-width:100%;
   
    
    @media(max-width:767px) {
            max-width:100%;
            padding: 1.5vw 2vw;
            font-size: 3vw;
            margin: 0;
         
        }
       
        }




    input[type=text]{
        border-radius: 10px;
        border: 1.5px solid black;
        background: #fff; 
        stroke: #04AA6D;
        width:100%;   
        padding   :10px ;
        margin-right:10px;

        @media(max-width:767px) {
            width:100%;
            padding: 1.5vw 2vw;
            font-size: 3vw;
        }
      
    }



    .registerbtn-desktop {
        border-radius: 8px;
        background-color: #04AA6D;
        color: white;
        padding: 10px 16px;
        margin: 8px;
        border: none;
        cursor: pointer;
        opacity: 0.8;
        width: 50%;
        font-size: 16px;

        @media(max-width:767px) {
            width:35vw;
            padding: 2vw 2vw;
            font-size: 3vw;
        }
    }

    img{
        width: 60%;
        margin-right: 0;
        z-index: -2;
     
        @media(max-width:1023px){
            width:100%
        }

        @media(max-width:500px){
            margin-top:60px;
        }
    }
   
  
       

`;


export default LandingPage
