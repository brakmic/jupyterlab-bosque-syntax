import { expect, test } from '@jupyterlab/galata';

/**
 * Don't load JupyterLab webpage before running the tests.
 * This is required to ensure we capture all log messages.
 */
test.use({ autoGoto: false });

test('should emit an activation console message', async ({ page }) => {
  const logs: string[] = [];

  page.on('console', message => {
    logs.push(message.text());
  });

  // Navigate to JupyterLab as an example
  await page.goto('/lab');

  expect(
    logs.filter(
      s => s === 'JupyterLab extension jupyterlab_bosque_syntax is activated!'
    )
  ).toHaveLength(59);
});
