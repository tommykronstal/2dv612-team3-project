import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import Button from '../src/components/Button';
import Section from '../src/components/Section';

storiesOf('Button', module)
  .addDecorator(centered)
  .add('Primary', () => (
    <div><Button primary onClick={action('clicked')}>Hello Button</Button></div>
  ))
  .add('Secondary', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ));

storiesOf('Section', module)
  .addDecorator(centered)
  .add('', () => (
    <div style={{width: 320}}>
      <Section>
        {Array.from(Array(15)).map(() => <br/>)}
        <Button primary>Test</Button>
      </Section>
    </div>
  ));
