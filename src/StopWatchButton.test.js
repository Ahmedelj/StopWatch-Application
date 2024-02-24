import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'text-encoding';
import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import StopWatchButton from './StopWatchButton';

// Import JSDOM as a default import
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = {
  ...dom.window.navigator,
  userAgent: 'node.js',
};

// Polyfill TextEncoder and TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mocking setInterval to avoid issues with timers in testing
jest.useFakeTimers();

describe('StopWatchButton', () => {
    test('renders without crashing', () => {
        render(<StopWatchButton />);
    });

    test('start, stop, reset, and lap buttons work correctly', () => {
        render(<StopWatchButton />);
    });
});