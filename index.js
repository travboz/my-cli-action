const core = require("@actions/core");
const { execSync } = require("child_process");
const path = require("path");

async function run() {
    try {
        // Get the version input, defaulting to empty string if not provided
        const inputVersion = core.getInput("version", { required: false }) || "";

        // Install into $GITHUB_WORKSPACE/bin — the -b flag tells the install script
        // exactly where to put the binary, so our core.addPath call always matches
        const installDir = path.join(process.env.GITHUB_WORKSPACE, "bin");
        let command = `curl -sSfL https://golangci-lint.run/install.sh | sh -s -- -b ${installDir}`;

        if (inputVersion.trim().length === 0) {
            console.log("Installing latest golangci-lint version...");
        } else {
            console.log(`Installing golangci-lint v${inputVersion}...`);
            // Normalise version string — accept both '2.1.2' and 'v2.1.2'
            const cleanVersion = inputVersion.startsWith("v") ? inputVersion : `v${inputVersion}`;
            command += ` ${cleanVersion}`;
        }

        // Run the install script, streaming output directly to the runner logs
        execSync(command, { stdio: "inherit" });

        // Add the install directory to PATH for all subsequent steps in this job
        core.addPath(installDir);

        console.log("golangci-lint installed successfully.");
    } catch (error) {
        core.setFailed(`Installation failed: ${error.message}`);
    }
}

run();