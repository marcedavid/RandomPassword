import React,{useEffect, useState} from 'react';
import './App.css';
import styled from 'styled-components'; 
import { ButtonMinus, ButtonCheck, ButtonPlus, ButtonGen } from './components/buttons';
import genPass from './functions/generatePass';
import CopyToClipboard from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
    const [config, changeConfig] = useState({
      numeroDeCaracteres: 8,
      simbolos: true,
      numeros: true,
      mayusculas: true
    });
    const notify = () => toast("Copiado al portapapeles", {
      position: toast.POSITION.BOTTOM_CENTER ,
      theme: 'dark' ,
      autoClose: 250 ,
      hideProgressBar: true,
      backgroundColor: '#fffff' ,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
      </svg>
      
    });

    const [passGen, changePassGen] = useState('')

    useEffect(() =>{
      changePassGen(genPass(config));
    }, [config]);
    
    const increaseChar = () => {
      changeConfig((prevConfig) => {
        const newConfig = {...prevConfig};
        newConfig.numeroDeCaracteres += 1;
        return newConfig;
      });
     
    }
    const decreaseChar = () => {
      if(config.numeroDeCaracteres > 1){
        changeConfig((prevConfig) => {
          const newConfig = {...prevConfig};
          newConfig.numeroDeCaracteres -= 1;
          return newConfig;
          });
        }
  }
  
  const toggleSimbolos = () =>{
      changeConfig((prevConfig) => {
        const newConfig = {...prevConfig};
        newConfig.simbolos = !newConfig.simbolos;
        return newConfig;
      });
  }
  const toggleNumeros = () =>{
      changeConfig((prevConfig) => {
        const newConfig = {...prevConfig};
        newConfig.numeros = !newConfig.numeros;
        return newConfig;
      });
  }
  const toggleMayus = () =>{
    changeConfig((prevConfig) => {
      const newConfig = {...prevConfig};
      newConfig.mayusculas = !newConfig.mayusculas;
      return newConfig;
      });
  }    
  const onSubmit = (e) => {
      e.preventDefault();
      changePassGen(genPass(config));
    }    

    return (
      <div className='contenedor'>
        <Title>
          <h1>Password Generator</h1>
          <p>
            by Marce David
          </p>
        </Title>
        <form onSubmit={onSubmit}>
          <Fila>
            <label>Numero de caracteres:</label>
            <Controls>
              <ButtonMinus click={decreaseChar} />
              <span>{config.numeroDeCaracteres}</span>
              <ButtonPlus click={increaseChar} />
            </Controls>
          </Fila>
          <Fila>
            <label>Simbolos</label>
            <ButtonCheck select={config.simbolos} click={toggleSimbolos}/>
          </Fila>
          <Fila>
            <label>Numeros</label>
            <ButtonCheck select={config.numeros} click={toggleNumeros} />
          </Fila>
          <Fila>
            <label>Mayusculas</label>
            <ButtonCheck select={config.mayusculas} click={toggleMayus} />
          </Fila>
          <Fila>
            <ButtonGen />
            <CopyToClipboard text={passGen}>
              <Input type='text' readOnly={true} value={passGen} onClick={notify}/>
            </CopyToClipboard>
            <ToastContainer />
          </Fila>
        </form>
      </div>
    );
 }
 export default App ; 

 const Title = styled.div`
  margin-bottom: 50px;

  h1 , p{
    text-align: center;
    font-size: 35px;
  }

  p{
    font-size: 20px;
  }
  `;
const Fila = styled.div`
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  `;
const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  
  & > * {
    flex: 1;
  }

  span {
    line-height: 40px;
    background: #33257E;
  }
`;
const Input = styled.input`
  width: 100%;
  background: none;
  border-radius: 4px;
  color: #e5e5e5;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  transition: all .3s ease;

  &:hover {
    border: 1px solid rgba(255,255,255, .50);
  }

  &::selection{
    background: #001219;
  }

  &::-moz-selection{
    background: #001219;
  }
`;