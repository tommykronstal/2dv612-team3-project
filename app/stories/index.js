import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';
import backgrounds from "@storybook/addon-backgrounds";

import Button from '../src/components/Button';
import Section from '../src/components/Section';
import Loading from '../src/components/Loading';
import Header from '../src/components/Header';
import CenteredForm from '../src/components/CenteredForm';
import Title from '../src/components/Title';
import Text from '../src/components/Text';

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
          <Text>bla bla</Text>
          <Button primary>Login</Button>
        </CenteredForm>
      </div>
    ));
