import React from 'react';
import styled, { css } from 'styled-components';

const Input = styled.input`
  box-sizing: border-box;
  font-family: Helvetica, arial, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  width: 100%;
  color: rgb(60, 60, 60);
  padding: 0.2rem 0;
  margin: 1rem 0;
  outline: none;
  border: none;
  border-radius: 0;
  -webkit-appearance: none;
  box-shadow: 0 1px ${props => props.warning ? 'rgb(240, 100, 100)' : 'rgb(100, 100, 100)'};

  :focus {
    box-shadow: 0 2px ${props => props.warning ? 'rgb(240, 100, 100)' : 'rgb(100, 100, 100)'};
  }

  :focus + label {
    transform: translate(0, -1.1rem) scale(0.7);
  }
`;

const Label = styled.label`
  font-family: Helvetica, arial, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: ${props => props.warning ? 'rgb(240, 100, 100)' : 'rgb(100, 100, 100)'};
  position: absolute;
  top: 1.2rem;
  left: 0;
  right: 0;
  pointer-events: none;
  user-select: none;
  transition: transform 0.3s;
  transform-origin: left;
  text-align: left;

  ${props => props.value && css`
    transform: translate(0, -1.1rem) scale(0.7);
  `}
`;

const Div = styled.div`
  box-sizing: border-box;
  margin: 0.5rem auto;
  max-width: 22rem;
  min-width: 8rem;
  width: 100%;
  position: relative;
`;

export default (props) => {
  const value = props.value || '';
  const type = props.type || 'text';
  const warning = props.warning;
  const label = warning ? `${props.label} - ${warning}` : props.label;

  return (
    <Div>
      <Input name={props.name} warning={warning} onChange={(e) => props.onChange(e)} type={type} value={value} />
      <Label for={props.name} warning={warning} value={value}>{label}</Label>
    </Div>
  )
};

export const textStyles = Text;
