const { execFileSync } = require('node:child_process');
const path = require('node:path');

// This host can stall during Playwright teardown after all assertions finish.
// Bound that wait, then terminate only this runner's explicitly owned browser.
// Never enumerate or terminate the user's normal browser processes.
module.exports = async function cleanup(server, browser) {
  const pid = server.process().pid;
  let timer;
  const closed = await Promise.race([
    server.close().then(() => true),
    new Promise(resolve => { timer = setTimeout(() => resolve(false), 4000); })
  ]);
  clearTimeout(timer);
  if (!closed) {
    try {
      execFileSync(path.join(process.env.SystemRoot, 'System32', 'taskkill.exe'), ['/PID', String(pid), '/T', '/F'], { stdio: 'ignore', timeout: 5000 });
    } catch (error) {
      // Exit code 128 also occurs when graceful shutdown won the race.
      if (error.status !== 128) console.log(`Owned-browser cleanup: ${error.message}`);
    }
    console.log(`Browser teardown watchdog used for owned PID ${pid}; assertions were saved first.`);
  }
  await Promise.race([browser.close(), new Promise(resolve => setTimeout(resolve, 1000))]);
  return { graceful: closed, ownedBrowserPid: pid };
};
