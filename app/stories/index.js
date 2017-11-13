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
import Content from '../src/components/Content';
import Title from '../src/components/Title';
import Input from '../src/components/Input';
import StatusModal from '../src/components/StatusModal';

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Nunito');
`

const background = backgrounds([{name: 'standard', value: 'rgb(240, 240, 240)', default: true}])

// BUTTON STORY
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

// SECTION STORY
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

// LOADING STORY
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

// INPUT STORY
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

// HEADER STORY
storiesOf('Header', module)
  .addDecorator(background)
  .add('Default', () => (
    <Header />
  ));

// STATUS MODAL STORY
storiesOf('Status Modal', module)
  //.addDecorator(background)
  .add('Positive', () => (
    <StatusModal message='Success' active />
  ));

// LOGIN FORM STORY
storiesOf('Login form', module)
  .addDecorator(background)
  .add('Default', () => (
    <div>
      <Header />
      <CenteredForm>
        <Title>Login</Title>
        <Input type='email' name='email' label='E-Mail' onChange={action('changed')} />
        <Input type='password' name='password' label='Password' onChange={action('changed')} />
        <Button primary onClick={action('clicked')}>Login</Button>
      </CenteredForm>
    </div>
  ))
  .add('Filled', () => (
    <div>
      <Header />
      <CenteredForm>
        <Title>Login</Title>
        <Input type='email' value='test@testsson.com' name='email' label='E-Mail' onChange={action('changed')} />
        <Input type='password' value='secret' name='password' label='Password' onChange={action('changed')} />
        <Button primary onClick={action('clicked')}>Login</Button>
      </CenteredForm>
    </div>
  ))
  .add('Authenticating', () => (
    <div>
      <Header />
      <CenteredForm>
        <Title>Login</Title>
        <Input type='email' value='test@testsson.com' name='email' label='E-Mail' onChange={action('changed')} />
        <Input type='password' value='secret' name='password' label='Password' onChange={action('changed')} />
        <Button primary loading onClick={action('clicked')}>Login</Button>
      </CenteredForm>
    </div>
  ))
  .add('Failed', () => (
    <div>
      <Header />
      <CenteredForm>
        <Title>Login</Title>
        <Input type='email' value='test@testsson.com' name='email' label='E-Mail' onChange={action('changed')} />
        <Input warning='Not correct' type='password' value='secret' name='password' label='Password' onChange={action('changed')} />
        <Button primary onClick={action('clicked')}>Login</Button>
      </CenteredForm>
    </div>
  ));

  // COMPANY FORM STORY
  storiesOf('Company form', module)
    .addDecorator(background)
    .add('Default', () => (
      <div>
        <Header />
        <Content>
          <Title>Add a New Company</Title>
          <Input name='company' label='Company name' onChange={action('changed')} />
          <Input type='email' name='email' label='Administrators E-Mail' onChange={action('changed')} />
          <Input type='password' name='password' label='Password' onChange={action('changed')} />
          <Button primary onClick={action('clicked')}>Add</Button>
        </Content>
      </div>
    ))
    .add('Filled', () => (
      <div>
        <Header />
        <Content>
          <Title>Add a New Company</Title>
          <Input name='company' value="My Company" label='Company name' onChange={action('changed')} />
          <Input type='email' value='test@testsson.com' name='email' label='Administrators E-Mail' onChange={action('changed')} />
          <Input type='password' value='secret' name='password' label='Password' onChange={action('changed')} />
          <Button primary onClick={action('clicked')}>Add</Button>
        </Content>
      </div>
    ))
    .add('Creating', () => (
      <div>
        <Header />
        <Content>
          <Title>Add a New Company</Title>
          <Input name='company' value="My Company" label='Company name' onChange={action('changed')} />
          <Input type='email' value='test@testsson.com' name='email' label='Administrators E-Mail' onChange={action('changed')} />
          <Input type='password' value='secret' name='password' label='Password' onChange={action('changed')} />
          <Button primary loading onClick={action('clicked')}>Add</Button>
        </Content>
      </div>
    ))
    .add('Failed', () => (
      <div>
        <Header />
        <Content>
          <Title>Add a New Company</Title>
          <Input warning="Already exists" name='company' value="My Company" label='Company name' onChange={action('changed')} />
          <Input type='email' value='test@testsson.com' name='email' label='Administrators E-Mail' onChange={action('changed')} />
          <Input type='password' value='secret' name='password' label='Password' onChange={action('changed')} />
          <Button primary onClick={action('clicked')}>Add</Button>
        </Content>
      </div>
    ))
    .add('Success', () => (
      <div>
        <Header />
        <Content>
          <Title>Add a New Company</Title>
          <Input name='company' label='Company name' onChange={action('changed')} />
          <Input type='email' name='email' label='Administrators E-Mail' onChange={action('changed')} />
          <Input name='username' label='Username' onChange={action('changed')} />
          <Input type='password' name='password' label='Password' onChange={action('changed')} />
          <Button primary onClick={action('clicked')}>Add</Button>
        </Content>
        <StatusModal active message='My Company created' />
      </div>
    ));
