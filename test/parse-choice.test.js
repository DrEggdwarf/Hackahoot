const { test } = require('node:test');
const assert = require('node:assert/strict');
const { parseChoice, choiceSchema } = require('../electron-app/kahoot-handler');

test('parse un JSON valide', () => {
    assert.equal(parseChoice('{"choice":3}', 4), 3);
    assert.equal(parseChoice('{"choice": 0}', 2), 0);
});

test('rejette une sortie vide ou non JSON', () => {
    assert.equal(parseChoice('', 4), null);
    assert.equal(parseChoice(undefined, 4), null);
    assert.equal(parseChoice('Vrai', 2), null);
});

test('rejette un JSON sans champ choice valide', () => {
    assert.equal(parseChoice('3', 4), null); // nombre JSON nu, pas un objet
    assert.equal(parseChoice('{"choice":"2"}', 4), null); // chaîne, pas entier
    assert.equal(parseChoice('{"choice":1.5}', 4), null);
    assert.equal(parseChoice('{"answer":1}', 4), null);
    assert.equal(parseChoice('{"choice":', 4), null); // JSON tronqué (max_tokens)
});

test('rejette un index hors bornes (vrai/faux = 2 choix)', () => {
    assert.equal(parseChoice('{"choice":2}', 2), null);
    assert.equal(parseChoice('{"choice":-1}', 4), null);
});

test('le schéma restreint choice aux index valides', () => {
    const s = choiceSchema(2);
    assert.deepEqual(s.properties.choice.enum, [0, 1]);
    assert.deepEqual(s.required, ['choice']);
    assert.equal(s.additionalProperties, false);
    assert.deepEqual(choiceSchema(4).properties.choice.enum, [0, 1, 2, 3]);
});
