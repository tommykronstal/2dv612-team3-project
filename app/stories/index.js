import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import Button from '../src/components/Button';
import Section from '../src/components/Section';
import Loading from '../src/components/Loading';

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
