import styled from 'styled-components'
import React from 'react';

const Login = (props) => {
    return (

        <Container>
            <Nav>
                
                <a href="/">
                    <img src ="/images/login-logo.svg" alt=""/>
                </a>
                <div>
                    <Join>Join now</Join>
                    <SignIn> Sign In</SignIn>
                </div>
            </Nav>
            <Section> 
                <Hero>
                    <div class= "main-welcome">
                    <h1 class="welcome"> Welcome to StudyBooth.</h1>
                    <p class="about-text">lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum</p>
                    <div class="emailz"> 
                        <form>
                          <input type="text" placeholder="Enter Email" name="email" id="email" required></input>
                            <button type="submit" class="registerbtn-desktop">Signup for StudyBooth</button>
                        </form>
                        
                        </div>
                    </div>
                    <img src="/images/login_slider_2.png" alt =""/>
                </Hero>
                </Section>
        </Container>
    )
};



const Container = styled.div`
  
    width: 100%;
`;


const Nav = styled.nav`
  
    max-width : 1250px;
    margin: auto;
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

        @media(max-width:320px){
            width: 20vw;
          
            margin-top:6vw;
           
        }
       
        @media(min-width: 320px) and (max-width:767px) {
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

    & > div{
        
     @media(min-width: 320px) and (max-width:767px) {
         /* background-color: black; */
        
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
            
            width: 100%;
            margin: auto;
            padding: auto;
        }
        @media(min-width: 320px) and (max-width:767px) {
            
            width: 100%;
            margin: 5px;
           
     }
     @media(min-width: 767px) and (max-width:1023px) {
    
            margin:auto;
            width:100%;
            height: auto;
        }  

    }

    .welcome{
        margin-top: 130px;
        z-index:2;
        width: auto; 
        font-size: 72px;
        font-weight: 500;
        line-height: 80px;
        display: inline-block;
        position: relative;
       

        @media(min-width:767px) and (max-width:1024px){
          margin:20px;
          width:100%;
          padding:0;
          font-size: 54px;

      }

        @media(max-width:767px) and (min-width:320px){
          margin:5px;
        font-size:8vw;
          width:100%;
          padding:0;

      }

      @media(max-width:320px) and (min-width:50px){
          line-height: normal;
          margin-top:5px;
        font-size:8vw;
          width:100%;
          padding:5px;

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
        width:40%;   
        display: flex;
        flex-wrap :nowrap ;
        justify-content: space-between;
    
        @media(min-width: 320px) and (max-width:767px) {
       
            width : 100%;
        
        }

        @media(min-width: 767px) and (max-width:1023px) {
          
            width : 100%;
            height: auto;
        } 
       
        }




    input[type=text]{
        border-radius: 5px;
        
        margin-right: 10px;
        margin-left:5px;
        padding: 15px;
        border: 1.5px solid black;
        background: #fff; 
        stroke: #04AA6D;
        width:90%;

        @media(min-width:50px) and (max-width:767px){
    
            font-size: 4vw;
            width: 40vw;
            padding: 2vw;
           
        }
      
      
    }

    .registerbtn-desktop {
        border-radius: 5px;
        background-color: #04AA6D;
        color: white;
        padding: 15px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        opacity: 0.9;

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
    }
   
  
       

`;


export default Login
