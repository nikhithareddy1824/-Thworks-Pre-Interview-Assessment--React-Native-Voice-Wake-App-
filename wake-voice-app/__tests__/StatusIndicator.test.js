import React from 'react';
import renderer, { act } from 'react-test-renderer';
import StatusIndicator from '../components/StatusIndicator';

test('StatusIndicator renders with status prop', () => {
  let tree;
  act(() => {
    tree = renderer.create(<StatusIndicator status="Listening" awakeCountdown={0} />);
  });

  const instance = tree.toJSON();
  expect(instance).toBeTruthy();
  expect(instance.type).toBe('View');
});

test('StatusIndicator displays awake countdown', () => {
  let tree;
  act(() => {
    tree = renderer.create(<StatusIndicator status="Awake" awakeCountdown={5} />);
  });

  const instance = tree.toJSON();
  expect(instance).toBeTruthy();
});

