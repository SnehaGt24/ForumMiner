const test = require('node:test');
const assert = require('node:assert/strict');
const { analyzePost } = require('../services/analytics');

test('flags high intent, competitor mentions, and negative sentiment', () => {
  const result = analyzePost({
    title: 'Looking for an alternative to HubSpot',
    content: 'I hate the pricing and support on HubSpot. Does anyone know a better option for analytics?'
  });

  assert.equal(result.intentScore, 85);
  assert.equal(result.sentiment, 'negative');
  assert.equal(result.competitorMention, true);
  assert.equal(result.highIntent, true);
});

test('keeps neutral posts at a lower intent score', () => {
  const result = analyzePost({
    title: 'Best way to track community engagement',
    content: 'I am exploring a few ways to measure conversations in a subreddit.'
  });

  assert.equal(result.intentScore, 45);
  assert.equal(result.sentiment, 'neutral');
  assert.equal(result.competitorMention, false);
  assert.equal(result.highIntent, false);
});
