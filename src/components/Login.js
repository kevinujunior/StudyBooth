import styled from 'styled-components'


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
                            <button type="submit" class="registerbtn">Signup for StudyBooth</button>
                        </form>
                        
                        </div>
                    </div>
                    <img src="/images/login_slider_2.png" alt =""/>
                </Hero>
                </Section>
        </Container>
    )
};

//Allows you to control the image otherwise it will extend upto boundarires

const Container = styled.div`
    padding: 2px;
    /* background-color: #f5f5f5;  */
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
    
    & > a{
        width: 135px;
        height: 34px;
        /* on a phone device give some extra padding*/
        @media(max-width: 768px){
            /* padding: 0 5px; */
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

`;


const Section = styled.section`

`;

const Hero = styled.div`    
   
    max-width: 1250px;
    display: flex;
    justify-content: space-between;
    align-items: top;
    flex-wrap: wrap;
    position: relative;
    margin: auto;
    z-index: 1;

    .main-welcome{
        
        width: 40%; 
        align-items: left;
        z-index:1;
        @media(max-width:900px){
            width:100%;
            padding:0px;
        }

    }

    .welcome{
        margin-top: 150px;
        z-index:2;
        width: 100%; 
        font-size: 72px;
        font-weight: 500;
        line-height: 80px;
        @media(max-width: 900px) {
            padding-top: 10px;
            width:100%;
            text-align: center;
            font-weight:600;
            font-size:30px;
            line-height: 50px;
            margin:auto;
        }
        
    }


    .about-text{
  
        padding-top: 20px;
        padding-left: 10px;
        margin-bottom: 20px; 
        @media(max-width:900px){
            font-size: 0;
            padding:0;
            margin-bottom: 10px;
        }
    }

    .emailz{
        width:100%;
        margin: auto;
        align-items: center;
        position: relative;
        justify-content: space-around;
        flex-wrap: nowrap;
        @media(max-width:900px){
            padding:0;
            margin:0;
        }
       
        }

    input[type=text]{
        border-radius: 5px;
        width: 50%;
        margin-right: 10px;
        margin-left:5px;
        padding: 15px;
        display: inline-block;
        border: 1.5px solid black;
        background: #fff; 
        stroke: #04AA6D;
    }

    .registerbtn {
        border-radius: 5px;
        background-color: #04AA6D;
        color: white;
        padding: 15px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        opacity: 0.9;
    }

    img{
        width: 60%;
        margin-right: 0;
        z-index: 0;
        @media(max-width:900px){
            width:100%
    
        }

        }

`;


export default Login
