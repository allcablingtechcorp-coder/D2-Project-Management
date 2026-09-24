import assert from 'node:assert/strict';
import test from 'node:test';
import { preferredCompany, allowedCompany, companyQueryValue } from '../portal-entry.mjs';

test('the Portal link opens the original project app in the selected company', () => {
    assert.equal(preferredCompany('?company=smart', 'HVAC'), 'Smart Home');
    assert.equal(preferredCompany('?company=hvac', 'Smart Home'), 'HVAC');
    assert.equal(companyQueryValue('Smart Home'), 'smart');
    assert.equal(companyQueryValue('HVAC'), 'hvac');
});

test('the project app falls back to an authorized company', () => {
    assert.equal(allowedCompany('HVAC', { smart: true, hvac: false }), 'Smart Home');
    assert.equal(allowedCompany('Ambas', { smart: false, hvac: true }), 'HVAC');
    assert.equal(allowedCompany('Ambas', { smart: true, hvac: true }), 'Ambas');
    assert.equal(allowedCompany('Smart Home', { smart: false, hvac: false }), '');
});

test('only known company values are accepted from a link or saved preference', () => {
    assert.equal(preferredCompany('?company=other', 'HVAC'), 'HVAC');
    assert.equal(preferredCompany('?company=other', 'other'), 'Ambas');
});
