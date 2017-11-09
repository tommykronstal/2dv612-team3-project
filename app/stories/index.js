import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import backgrounds from "@storybook/addon-backgrounds";
import { injectGlobal } from 'styled-components';

import Button from '../src/components/Button';
import Section from '../src/components/Section';
import Loading from '../src/components/Loading';
import Header from '../src/components/Header';
import CenteredForm from '../src/components/CenteredForm';
import Title from '../src/components/Title';
import Text from '../src/components/Text';
import Input from '../src/components/Input';



injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Nunito');
`

const background = backgrounds([{name: 'standard', value: 'rgb(240, 240, 240)', default: true}])

storiesOf('Button', module)
  .addDecorator(centered)
  .add('Primary', () => (
    <Button primary onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('Secondary', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('Loading', () => (
    <Button primary loading onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('Loading Secondary', () => (
    <Button loading onClick={action('clicked')}>Hello Button</Button>
  ));

storiesOf('Section', module)
  .addDecorator(centered)
  .addDecorator(background)
  .add('Default', () => (
    <div style={{width: 320}}>
      <Section>
        {Array.from(Array(15)).map(() => <br/>)}
        <Button primary>Test</Button>
      </Section>
    </div>
  ));

storiesOf('Loading', module)
  .addDecorator(centered)
  .add('black', () => (
    <Loading />
  ))
  .add('small', () => (
    <Loading small />
  ))
  .add('white', () => (
    <div style={{padding: '1rem', background: 'rgb(60, 60, 60)'}}>
      <Loading white />
    </div>
  ));


storiesOf('Input', module)
  .addDecorator(centered)
  .add('Default', () => (
    <Input name='username' label='Username' onChange={action('changed')} />
  ))
  .add('With value', () => (
    <Input value='testuser' name='username' label='Username' onChange={action('changed')}/>
  ))
  .add('Warning', () => (
    <Input warning='Not found' value='testuser' name='username' label='Username' onChange={action('changed')}/>
  ));

storiesOf('Header', module)
  .addDecorator(background)
  .add('Default', () => (
    <Header />
  ));

storiesOf('Login form', module)
  .addDecorator(background)
  .add('Default', () => (
    <div>
      <Header />
      <CenteredForm>
        <Title>Login</Title>
        <Input name='username' label='Username' onChange={action('changed')} />
        <Input type='password' name='password' label='Password' onChange={action('changed')} />
        <Button primary>Login</Button>
      </CenteredForm>
    </div>
  ))
  .add('Filled', () => (
    <div>
      <Header />
      <CenteredForm>
        <Title>Login</Title>
        <Input name='username' value='test' label='Username' onChange={action('changed')} />
        <Input type='password' value='secret' name='password' label='Password' onChange={action('changed')} />
        <Button primary>Login</Button>
      </CenteredForm>
    </div>
  ))
  .add('Authenticating', () => (
    <div>
      <Header />
      <CenteredForm>
        <Title>Login</Title>
        <Input name='username' value='test' label='Username' onChange={action('changed')} />
        <Input type='password' value='secret' name='password' label='Password' onChange={action('changed')} />
        <Button primary loading>Login</Button>
      </CenteredForm>
    </div>
  ))
  .add('Failed', () => (
    <div>
      <Header />
      <CenteredForm>
        <Title>Login</Title>
        <Input name='username' value='test' label='Username' onChange={action('changed')} />
        <Input warning='Not correct' type='password' value='secret' name='password' label='Password' onChange={action('changed')} />
        <Button primary>Login</Button>
      </CenteredForm>
    </div>
  ));
