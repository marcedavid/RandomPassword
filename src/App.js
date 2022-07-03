import React,{useState} from 'react';
import './App.css'
import styled from 'styled-components'; 
import { ButtonMinus, ButtonCheck, ButtonPlus, ButtonGen } from './components/buttons';
import genPass from './functions/generatePass';
const App = () => {
    const [config, changeConfig] = useState({
      numeroDeCaracteres: 8,
      simbolos: true,
      numeros: true,
      mayusculas: true
    });

    const [passGen, changePassGen] = useState('')

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
      })};
     
    }
    const onSubmit = (e) => {
      e.preventDefault();
      changePassGen(genPass(config));
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
            <Input type='text' readOnly={true} value={passGen}/>
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
  `
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
`

