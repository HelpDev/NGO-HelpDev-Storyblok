const { simpleGit, CleanOptions } = require('simple-git');

const TEMPLATE_REPO = 'https://github.com/HelpDev/NGO-HelpDev-Storyblok.git';

(async () => {
  const git = simpleGit();

  // Add origin if is not added
  try {
    await git.init().addRemote('template', TEMPLATE_REPO);
  } catch (error) {
    if (!error.message.includes('already exists')) {
      throw error;
    }
  }

  // Fetch all remote
  await git.raw('fetch', 'origin');
  await git.raw('fetch', 'template');

  // Move to template and update again
  try {
    await git.raw('switch', '-c', 'template', 'template/main');
  } catch (error) {
    if (!error.message.includes('already exists')) {
      throw error;
    }

    await git.raw('switch', 'template');
  }

  await git.raw('pull');

  // Move to origin main
  await git.raw('switch', 'main');

  // Merge to main
  await git.raw('merge', 'template', '--allow-unrelated-histories');
})();
