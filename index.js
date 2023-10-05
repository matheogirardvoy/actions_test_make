const core = require('@actions/core');
const github = require('@actions/github');

try {
    const pluginSlug = core.getInput('plugin_slug');
    // Get checkout of repository
    const checkout = github.context.payload.checkout;
    console.log(`Checkout: `, checkout);

} catch (error) {
    core.setFailed(error.message);
}
