import { describe, it, expect } from 'vitest';
import apiClient from './api-client';

describe('API Client', () => {
    it('should be defined', () => {
        expect(apiClient).toBeDefined();
    });
});
