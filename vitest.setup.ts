import '@testing-library/jest-dom/vitest';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import type { Assertion, AsymmetricMatchersContaining } from 'vitest';

declare module 'vitest' {
	interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {}
	interface AsymmetricMatchers extends TestingLibraryMatchers {}
	interface AsymmetricMatchersContaining extends AsymmetricMatchers {}
}
